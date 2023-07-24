// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./TokenBeatsNFT.sol";

/**
 * @title
 * @author
 * @notice
 */
contract TokenBeatsFactory is ReentrancyGuard {
    AggregatorV3Interface internal priceFeed;

    struct Beat {
        uint256 beatId;
        string name; //TODO rename title
        address producer;
        uint256 maxSupply; //maxSupply of 0 is an infinite supply
        uint256 usdPrice;
        uint256 sales;
        string uri;
        TokenBeatsNFT tokenContract;
        //TODO add tags
    }

    mapping(uint256 => Beat) private beats;

    uint256 public beatsCounter;

    //EVENTS
    event beatListed(
        address indexed producer,
        uint256 beatId,
        address tokenContract
    );
    event beatBought(
        address indexed producer,
        address indexed buyer,
        uint256 beatId
    );

    constructor() {
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    /**
     * @notice Deploy a TokenBeatsNFT contract
     * @dev A supply of zero references to an unlimited supply
     * @param _name The name of the TokenBeat
     * @param _maxSupply The supply of the TokenBeat
     * @param _usdPrice The price in usd of the TokenBeat
     * @param _uri The uri of the TokenBeat contract
     * @return The id of the
     */
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
        beat.uri = _uri;
        beat.tokenContract = new TokenBeatsNFT(
            _name,
            _maxSupply,
            _beatId,
            _uri
        );

        emit beatListed(msg.sender, _beatId, address(beat.tokenContract));
        return beatsCounter++;
    }

    /**
     * @notice mint a TokenBeat
     * @dev the beats are paid in ether
     * @param _beatId The id of the TokenBeat to mint
     */
    function buyBeat(uint256 _beatId) external payable nonReentrant {
        require(_beatId < beatsCounter, "Beat does not exist"); //check if the beat has been inserted

        Beat storage beat = beats[_beatId];
        uint256 ethPrice = getEthPrice(beat.usdPrice);
        require(msg.value >= ethPrice, "Insufficient funds");

        // if(beat.maxSupply != 0){
        //     require(beat.sales < beat.maxSupply, "Beat out of supply");
        // }

        beat.sales++;

        beat.tokenContract.mint(msg.sender);
        //TODO transfer funds to producer
        address producer = beat.producer;
        (bool sent, ) = payable(producer).call{value: msg.value}("");
        require(sent, "Funds not sent");
    }

    /**
     * @notice Convert the price from usd to eth
     * @param _usdPrice The price in usd to convert
     * @return the price in wei
     */
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

    /**
     * @notice fetch all the TokenBeats deployed from this contract
     * @return an array of Beats
     */
    function getAllBeats() external view returns (Beat[] memory) {
        Beat[] memory allBeats = new Beat[](beatsCounter);

        for (uint256 i; i < beatsCounter; ++i) {
            allBeats[i] = beats[i];
        }

        return allBeats;
    }

    /**
     * @notice fetch the 10 latest Beats deployed from this contract
     * @return an array of the latest Beats
     */
    function getLastBeats() external view returns (Beat[] memory) {
        //require(beatsCounter != 0, "No beats added");
        if (beatsCounter == 0) {
            return new Beat[](0);
        }
        uint256 lastBeatId = beatsCounter - 1;
        uint256 j = 0;
        if (lastBeatId < 10) {
            Beat[] memory lastBeats = new Beat[](beatsCounter);
            for (uint256 i = beatsCounter; i > 0; i--) {
                lastBeats[j] = beats[i - 1];
                j++;
            }
            return lastBeats;
        } else {
            Beat[] memory lastBeats = new Beat[](10);
            for (uint256 i = lastBeatId; i > lastBeatId - 10; i--) {
                lastBeats[j] = beats[i];
                j++;
            }
            return lastBeats;
        }
    }

    /**
     * @notice Helper function to convert int256 to uint256 safely
     * @param number The int256 to convert
     * @return the number casted to uint256
     */
    function convertIntToUint(int256 number) internal pure returns (uint256) {
        require(number >= 0, "Cannot convert negative value to uint");

        return uint256(number);
    }
}
