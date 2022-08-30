/*
 *   Minting for Testnet Tests
 */

const fs = require("fs");

const API_URL = "";
const TEST1_PK = "";
const TEST1_ADDRESS = "";                       
const DEPLOY_ADDRESS = "";                      
const AccessController = JSON.parse(
  fs.readFileSync(
    "./artifacts/contracts/controller.sol/accessController.json",
    "utf-8"
  )
);

async function main() {
  const provider = new ethers.getDefaultProvider(API_URL);
  const signerOwner = new ethers.Wallet(TEST1_PK, provider);
  const contractOwner = new ethers.Contract(
    DEPLOY_ADDRESS,
    AccessController.abi,
    signerOwner
  );
  
  await contractOwner.mintNFT(TEST1_ADDRESS, 3, 1);
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
