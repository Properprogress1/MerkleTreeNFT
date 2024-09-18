// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MerkleAirdropBAYC {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;
    bytes32 public immutable merkleRoot;
    IERC721 public immutable baycContract;
    address public owner;
    uint256 public totalAirdropSupply;
    uint256 public totalClaimed;
    mapping(address => bool) public claimed;

    event Claimed(address indexed claimant, uint256 amount);
    event MerkleRootUpdated(bytes32 merkleRoot);

    modifier onlyOwner() {
        require(owner == msg.sender, "You are not the owner");
        _;
    }

    constructor(
        address _token,
        bytes32 _merkleRoot,
        address _baycContract,
        uint256 _totalAirdropSupply
    ) 
    {
        token = IERC20(_token);
        merkleRoot = _merkleRoot;
        baycContract = IERC721(_baycContract);
        owner = msg.sender;
        totalAirdropSupply = _totalAirdropSupply;
    }

    function canClaim(
        address claimer,
        uint256 _amount,
        bytes32[] calldata merkleProof
    ) public view returns (bool) {
        require(!claimed[claimer], "Token already claimed!");

       
        require(baycContract.ownerOf(0) == claimer, "You must own a BAYC NFT to claim.");   // To Check if the claimer owns a BAYC NFT

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, _amount));

        require(MerkleProof.verify(merkleProof, merkleRoot, leaf), "Invalid proof!");
        require(totalClaimed + _amount <= totalAirdropSupply, "Exceeds total airdrop supply!");

        return true;
    }

    function claim(uint256 _amount, bytes32[] calldata merkleProof) external {
        require(canClaim(msg.sender, _amount, merkleProof), "Sorry, Your address is not eligible to claim token!");

        claimed[msg.sender] = true;
        totalClaimed += _amount;

        token.safeTransfer(msg.sender, _amount);

        emit Claimed(msg.sender, _amount);
    }
}