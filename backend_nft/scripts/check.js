/*
*   Check ID Script
*/
const fs = require('fs');
const HARDHAT_NODE_PK_1 = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const HARDHAT_NODE_ADD_1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const DEPLOY_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const AccessController = JSON.parse(fs.readFileSync('./artifacts/contracts/controller.sol/accessController.json', 'utf-8'))


async function main() {
    const provider = new ethers.getDefaultProvider("http://localhost:8545");
    const signer = new ethers.Wallet(HARDHAT_NODE_PK_1, provider);
    const contract = new ethers.Contract(DEPLOY_ADDRESS, AccessController.abi, signer);
    const pass = await contract.checkId(1);

    console.log("Check ID Result: " + await pass);
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
