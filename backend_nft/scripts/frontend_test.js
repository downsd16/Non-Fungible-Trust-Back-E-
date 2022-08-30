/*
 *   Minting/CheckID Test LOCALHOST ONLY
 */

const { expect } = require("chai");
const fs = require("fs");

const HARDHAT_NODE_PK_OWNER = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const MM_TEST1_ADDRESS = "0xDeD8a8dADdf33F6F11dA36Ec155EfFD3D43fa99E";
const DEPLOY_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const AccessController = JSON.parse(
  fs.readFileSync(
    "./artifacts/contracts/controller.sol/accessController.json",
    "utf-8"
  )
);



async function main() {

  //  Get Provider, Signer, and Contract
  const provider = new ethers.getDefaultProvider("http://localhost:8545");
  const signerOwner = new ethers.Wallet(HARDHAT_NODE_PK_OWNER, provider);
  const contractOwner = new ethers.Contract(
    DEPLOY_ADDRESS,
    AccessController.abi,
    signerOwner
  );

  const transactionMint = await contractOwner.mintNFT(MM_TEST1_ADDRESS, 1, 1);
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
