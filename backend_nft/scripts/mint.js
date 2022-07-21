/* 
*   Simple Minting Script
*   
*
*/
const fs = require('fs');
const HARDHAT_NODE_PK_0 = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const HARDHAT_NODE_ADD_1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const DEPLOY_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const AccessController = JSON.parse(fs.readFileSync('.artifacts/contracts/controller.sol/accessController.json', 'utf-8'))


async function main() {
    const provider = new ethers.getDefaultProvider("http://localhost:8545");
    const signer = new ethers.Wallet(HARDHAT_NODE_PK_0);
    const contract = new ethers.Contract(DEPLOY_ADDRESS, AccessController.abi, signer);
    const transaction = await contract.mintNFT(HARDHAT_NODE_ADD_1, 1, 1);
    await transaction.wait().then(
        console.log("Minted 1 NFT to address: " + HARDHAT_NODE_ADD_1)
    );

}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});