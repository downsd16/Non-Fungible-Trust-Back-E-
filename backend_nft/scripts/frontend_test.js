/*
 *   Minting/CheckID Test LOCALHOST ONLY
 */

const { expect } = require("chai");
const fs = require("fs");

const HARDHAT_NODE_PK_OWNER = "";
const MM_TEST1_ADDRESS = "";
const DEPLOY_ADDRESS = "";
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
