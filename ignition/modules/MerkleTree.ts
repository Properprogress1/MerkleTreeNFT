import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0xB56c16A3ad6259755FB27Fe74D1C1527108a9455";
const merkleRoot = '0xYourMerkleRoot';
const totalAirdropSupply = 1000;

const MerkleTreeModule = buildModule("MerkleTreeModule", (m) => {

    const merkle = m.contract("MerkleTreeModule", [tokenAddress], [merkleRoot], [totalAirdropSupply]);

    return { merkle };
});

export default MerkleTreeModule;