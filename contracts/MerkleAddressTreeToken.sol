// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MerkleTreeAirdropToken is ERC20 {
    constructor() ERC20("MerkleTreeAirdropToken", "MTA") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}