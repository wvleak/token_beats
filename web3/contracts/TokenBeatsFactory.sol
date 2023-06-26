// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./TokenBeatsNFT.sol";

/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
contract TokenBeatsFactory is ERC721, Ownable {
    AggregatorV3Interface internal priceFeed;

    struct Beat {
        uint256 beatId;
        string name;
        address producer;
        uint256 maxSupply; //maxSupply of 0 is an infinite supply
        uint256 usdPrice;
        uint256 sales;
        TokenBeatsNFT tokenContract;
    }

    mapping(uint256 => Beat) private beats;

    uint256 public beatsCounter;

    //EVENTS
    event beatListed(address indexed producer, uint256 beatId);
    event beatBought(
        address indexed producer,
        address indexed buyer,
        uint256 beatId
    );

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    function listBeat(
        string calldata _name,
        uint256 _maxSupply,
        uint256 _usdPrice,
        string calldata _uri
    ) external returns (uint256) {
        Beat storage beat = beats[beatsCounter];
        uint256 _beatId = beatsCounter;
        beat.beatId = _beatId;
        beat.name = _name;
        beat.producer = msg.sender;
        beat.maxSupply = _maxSupply;
        beat.usdPrice = _usdPrice;
        beat.tokenContract = new TokenBeatsNFT(
            _name,
            _maxSupply,
            _beatId,
            _uri
        );

        emit beatListed(msg.sender, _beatId);
        return beatsCounter++;
    }

    function buyBeat(uint256 _beatId) external payable {
        require(_beatId < beatsCounter, "Beat does not exist"); //check if the beat has been inserted

        Beat storage beat = beats[_beatId];
        uint256 ethPrice = getEthPrice(beat.usdPrice);
        require(msg.value >= ethPrice, "Insufficient funds");

        // if(beat.maxSupply != 0){
        //     require(beat.sales < beat.maxSupply, "Beat out of supply");
        // }

        beat.sales++;

        beat.tokenContract.mint(msg.sender);
    }

    //View functions

    function getEthPrice(uint256 _usdPrice) public view returns (uint256) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        return (_usdPrice * 10 ** 18) / convertIntToUint(price / 1e8);
    }

    function getBeats() external view returns (Beat[] memory) {
        Beat[] memory allBeats = new Beat[](beatsCounter);

        for (uint256 i; i < beatsCounter; ++i) {
            allBeats[i] = beats[i];
        }

        return allBeats;
    }

    function convertIntToUint(int256 number) internal pure returns (uint256) {
        require(number >= 0, "Cannot convert negative value to uint");

        return uint256(number);
    }
}
