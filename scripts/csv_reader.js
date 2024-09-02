const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const fs = require('fs');
const csv = require('csv-parser');

async function generateMerkleRoot() {
    const entries = [];

    const filename = "generated_files/airdrop.csv";
    fs.createReadStream(filename)
        .pipe(csv())
        .on('data', (row) => {
            const hash = keccak256(row.address + row.amount).toString('hex');
            entries.push(hash);
        })
        .on('end', () => {
            const leaves = entries.map(x => Buffer.from(x, 'hex'));
            const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
            const root = merkleTree.getRoot().toString('hex');
            console.log("Merkle Root:", root);
        });
}

generateMerkleRoot();
