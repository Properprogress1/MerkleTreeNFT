import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MerkleTreeAirdropTokenModule = buildModule("MerkleTreeAirdropToken", (m) => {

    const erc20 = m.contract("MerkleTreeAirdropToken");

    return { erc20 };
});

export default MerkleTreeAirdropTokenModule;