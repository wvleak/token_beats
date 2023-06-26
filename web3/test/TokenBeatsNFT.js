const { expect } = require("chai");
const exp = require("constants");
const hre = require("hardhat");

describe("TokenBeatsNFT", async () => {
  let contract, user1;
  const name = "test";
  const maxSupply = 1;
  const beatId = 1;
  const uri = "test_uri";
  before(async () => {
    [admin, user1] = await ethers.getSigners();
    contract = await (
      await ethers.getContractFactory("TokenBeatsNFT")
    ).deploy(name, maxSupply, beatId, uri);
  });
  describe("Deployment", () => {
    it("Should set right owner", async () => {
      expect(await contract.owner()).to.equal(await admin.getAddress());
    });
    it("Should set the right initial values", async () => {
      expect(await contract.beatId()).to.equal(beatId);
      expect(await contract.maxSupply()).to.equal(maxSupply);
      expect(await contract.uri()).to.equal(uri);
    });
  });
  describe("Minting", () => {
    it("Should fail if sender is not the owner", async () => {
      await expect(
        contract.connect(user1).mint(await user1.getAddress())
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("Should mint to correct address", async () => {
      const tokenId = await contract.tokenIds();
      await contract.mint(await user1.getAddress());
      expect(await contract.ownerOf(tokenId)).to.equal(
        await user1.getAddress()
      );
    });
    it("Should fail if beat out of supply", async () => {
      await expect(contract.mint(await user1.getAddress())).to.be.revertedWith(
        "Out of supply"
      );
    });
  });
});
