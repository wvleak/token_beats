// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenBeatsNFT is ERC721, Ownable {
    uint256 public immutable beatId;
    uint256 public immutable maxSupply;
    uint256 public tokenIds;
    string public uri;

    constructor(
        string memory name,
        uint256 _maxSupply,
        uint256 _beatId,
        string memory _uri
    ) ERC721(name, "TBT") {
        maxSupply = _maxSupply;
        beatId = _beatId;
        uri = _uri;
    }

    function mint(address _to) external onlyOwner {
        if (maxSupply != 0) {
            require(tokenIds < maxSupply, "Out of supply");
        }
        require(_to != address(0), "Recipient address error: address(0)");

        _safeMint(_to, tokenIds++);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireMinted(tokenId);

        return uri;
    }
}
