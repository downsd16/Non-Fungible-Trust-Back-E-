/*
 *   Minting/CheckID Test LOCALHOST ONLY
 */

const { expect } = require("chai");

const fs = require("fs");

const HARDHAT_NODE_PK_OWNER =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const HARDHAT_NODE_ADD_USER_1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

const DEPLOY_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const AccessController = JSON.parse(
  fs.readFileSync(
    "./artifacts/contracts/controller.sol/accessController.json",
    "utf-8"
  )
);

//Declare LocalHost Provider on port 8545
const provider = new ethers.getDefaultProvider("http://localhost:8545");

//Declare three signers, one for owner and user
const signerOwner = new ethers.Wallet(HARDHAT_NODE_PK_OWNER, provider);

//Declare three contracts, one of the owner, one for the signer
const contractOwner = new ethers.Contract(
  DEPLOY_ADDRESS,
  AccessController.abi,
  signerOwner
);

describe("Burn Test", function () {

    //Get balance before mint and burn
    const balanceBefore1 = contractOwner.ticketBalance(HARDHAT_NODE_ADD_USER_1, 1);

  it("Mint NFT to User 1", async function () {
    //Mint NFT to User1
    const transaction = await contractOwner.mintNFT(
      HARDHAT_NODE_ADD_USER_1,
      1,
      1
    );
    expect(await transaction.wait()).to.exist;
  });

  it("Burn NFT from User 1", async function () {
    const burn = await contractOwner.burnNFT(HARDHAT_NODE_ADD_USER_1, 1, 1);
    expect(await burn).to.exist;
  });

  it("Validate Balance", async function () {
    const balanceAfter1 = contractOwner.ticketBalance(HARDHAT_NODE_ADD_USER_1, 1);
    expect((await balanceAfter1) == balanceBefore1);
  });
});
