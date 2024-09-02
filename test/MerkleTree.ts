// import {
//     time,
//     loadFixture,
//   } from "@nomicfoundation/hardhat-toolbox/network-helpers";
//   import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
//   import { MerkleTree } from "merkletreejs";
//   import keccak256 from "keccak256";
//   import { Contract } from "ethers";
//   import { expect } from "chai";
//   import hre, { ethers } from "hardhat";

// // import { ethers } from "hardhat";
// // import { expect } from "chai";
// // import { MerkleTree } from "merkletreejs";
// // import keccak256 from "keccak256";
// // import { Contract } from "ethers";

// describe("MaerkleTree Airdrop", function () {
//   let token: Contract;
//   let airdrop: Contract;
//   let merkleTree: MerkleTree;
//   let merkleRoot: string;
//   let owner: any;
//   let addr1: any;
//   let addr2: any;
//   let addr3: any;

//   const airdropAmount1 = 100;
//   const airdropAmount2 = 200;

//   const addresses = [
//     { address: "0x123...abc", amount: airdropAmount1 },
//     { address: "0x456...def", amount: airdropAmount2 }
//   ];

//   before(async function () {
//     const [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();

//     const hashedLeaves = addresses.map((x) =>
//       keccak256(hre.ethers.utils.solidityPack(["address", "uint256"], [x.address, x.amount]))
//     );

//     merkleTree = new MerkleTree(hashedLeaves, keccak256, { sortPairs: true });
//     merkleRoot = merkleTree.getRoot().toString("hex");

//     const Token = await hre.ethers.getContractFactory("MerkleTreeAirdropToken");
//     const token = await Token.deploy();
//     // await token.deployed();
//     return { token };

//     const Airdrop = await ethers.getContractFactory("MaerkleTree");
//     airdrop = await Airdrop.deploy(token.address, merkleRoot, 300);
//     await airdrop.deployed();

//     await token.transfer(airdrop.address, 300);
//   });

//   it("should allow a valid claim", async function () {
//     const leaf = keccak256(ethers.utils.solidityPack(["address", "uint256"], [addr1.address, airdropAmount1]));
//     const proof = merkleTree.getHexProof(leaf);

//     await expect(airdrop.connect(addr1).claim(airdropAmount1, proof))
//       .to.emit(airdrop, "Claimed")
//       .withArgs(addr1.address, airdropAmount1);

//     expect(await token.balanceOf(addr1.address)).to.equal(airdropAmount1);
//   });

//   it("should reject an invalid claim", async function () {
//     const invalidAmount = 300;
//     const leaf = keccak256(ethers.utils.solidityPack(["address", "uint256"], [addr2.address, invalidAmount]));
//     const proof = merkleTree.getHexProof(leaf);

//     await expect(airdrop.connect(addr2).claim(invalidAmount, proof)).to.be.revertedWith("Invalid proof!");
//   });

//   it("should reject double claims", async function () {
//     const leaf = keccak256(ethers.utils.solidityPack(["address", "uint256"], [addr1.address, airdropAmount1]));
//     const proof = merkleTree.getHexProof(leaf);

//     await expect(airdrop.connect(addr1).claim(airdropAmount1, proof)).to.be.revertedWith("Token already claimed!");
//   });

//   it("should allow the owner to withdraw remaining tokens", async function () {
//     const remainingTokensBefore = await token.balanceOf(owner.address);

//     // Complete the airdrop
//     const leaf = keccak256(ethers.utils.solidityPack(["address", "uint256"], [addr2.address, airdropAmount2]));
//     const proof = merkleTree.getHexProof(leaf);
//     await airdrop.connect(addr2).claim(airdropAmount2, proof);

//     // Withdraw remaining tokens
//     await airdrop.withdrawToken(owner.address);
    
//     const remainingTokensAfter = await token.balanceOf(owner.address);
//     expect(remainingTokensAfter.sub(remainingTokensBefore)).to.equal(100);  // Assuming 100 tokens left after the airdrop
//   });
// });
