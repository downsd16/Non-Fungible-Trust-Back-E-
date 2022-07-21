/*
*   Check ID on Testnet
*/
const fs = require('fs');

const API_URL = "https://eth-rinkeby.alchemyapi.io/v2/k6YWwXNqqI4RjKRe--6p9D4sPQiZJySK";   //Alchemy API Key
const TEST1_PK = "e424694ae5236c16496783e5e8fc7183899bf7f5fad654b1b1c1d62d5d325cbf";   //Private key for personal account
const TEST1_ADDRESS = "0xDeD8a8dADdf33F6F11dA36Ec155EfFD3D43fa99E";
const DEPLOY_ADDRESS = "0xf940bC86Dd844FB43BE8F5D8E00AfB87675876C1";
const AccessController = JSON.parse(
  fs.readFileSync(
    './artifacts/contracts/controller.sol/accessController.json', 
    'utf-8'
    ));

async function main() {
  
    const provider = new ethers.getDefaultProvider(API_URL);
    const signer = new ethers.Wallet(TEST1_PK, provider);
    const contract = new ethers.Contract(
      DEPLOY_ADDRESS, 
      AccessController.abi, 
      signer);
    const transactionMint = await contractOwner.mintNFT(TEST1_ADDRESS, 1, 1);
    const pass = await contract.checkId(1);
    
    console.log("Check ID Result: " + await pass);
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
