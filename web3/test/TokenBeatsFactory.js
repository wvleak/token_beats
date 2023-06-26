// const { expect } = require("chai");
// const hre = require("hardhat");

// describe("TokenBeatsFactory", async () => {
//   let contract, user1, user2;
//   before(async () => {
//     [user1, user2] = await ethers.getSigners();
//     contract = await (
//       await ethers.getContractFactory("TokenBeatsFactory")
//     ).deploy();
//   });
//   describe("Deployment", () => {
//     it("Should set right initial values", async () => {
//       expect(await contract.beatsCounter()).to.equal(0);
//     });
//   });

//   describe("Beat listing", () => {
//     it("Should list beat with correct id and sender", async () => {
//       const name = "Gunna Type Beat";
//       const maxSupply = 10;
//       const usdPrice = 50;
//       const uri = "randomUri";
//       const tx = await contract
//         .connect(user1)
//         .listBeat(name, maxSupply, usdPrice, uri);
//     });
//     it("Should update beatsCounter", async () => {
//       expect(await contract.beatsCounter()).to.equal(1);
//     });
//   });

//   describe("Beat buying", () => {
//     it("Should mint to sender if has sufficient funds", async () => {
//       await contract.connect(user1).buyBeat(0, { value: 7906388361796331 });
//     });
//     it("Should fail if sender doesn't have enough funds", async () => {});
//     it("Should fail if beat id doesn't exist", async () => {});
//     it("Should fail if beat is out of supply", async () => {});
//   });
// });
