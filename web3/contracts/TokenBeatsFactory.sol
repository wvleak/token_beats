// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TokenBeatsFactory is ERC721 {
    struct Beat {
        uint256 beatId;
        address tokenContract;
        uint256 usdPrice;
        uint256 sales;
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

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function listBeat() external {}

    function buyBeat() external payable {}

    //View functions

    function getEthPrice() public view {}

    function getBeats() external view returns (Beat[] memory) {
        Beat[] memory allBeats = new Beat[](beatsCounter);

        for (uint256 i; i < beatsCounter; ++i) {
            allBeats[i] = beats[i];
        }

        return allBeats;
    }
}
