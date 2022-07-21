/*
 *   Minting for Testnet Tests
 */

const fs = require("fs");

const API_URL = "https://eth-rinkeby.alchemyapi.io/v2/k6YWwXNqqI4RjKRe--6p9D4sPQiZJySK";
const TEST1_PK = "e424694ae5236c16496783e5e8fc7183899bf7f5fad654b1b1c1d62d5d325cbf";
const TEST1_ADDRESS = "0xDeD8a8dADdf33F6F11dA36Ec155EfFD3D43fa99E";                       
const DEPLOY_ADDRESS = "0x20e73B4023bBcaBeA040aC529b14A3f807D3d912";                      
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

  const transactionMint = await contractOwner.mintNFT(TEST1_ADDRESS, 1, 1);
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
