/*
 *   Minting/CheckID Test LOCALHOST ONLY
 */

const { expect } = require("chai");

const fs = require("fs");
const HARDHAT_NODE_PK_OWNER =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const HARDHAT_NODE_PK_USER_1 =
  "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const HARDHAT_NODE_PK_USER_2 =
  "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";

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
const signerUser1 = new ethers.Wallet(HARDHAT_NODE_PK_USER_1, provider);
const signerUser2 = new ethers.Wallet(HARDHAT_NODE_PK_USER_2, provider);

//Declare three contracts, one of the owner, one for the signer
const contractOwner = new ethers.Contract(
  DEPLOY_ADDRESS,
  AccessController.abi,
  signerOwner
);
const contractUser1 = new ethers.Contract(
  DEPLOY_ADDRESS,
  AccessController.abi,
  signerUser1
);
const contractUser2 = new ethers.Contract(
  DEPLOY_ADDRESS,
  AccessController.abi,
  signerUser2
);

describe("Minting/CheckID Test", function () {
  it("Minting", async function () {
    //Mint NFT to User1
    const transaction = await contractOwner.mintNFT(
      HARDHAT_NODE_ADD_USER_1,
      1,
      1
    );
    expect(await transaction.wait()).to.exist;
  });

  it("User 1 Allowed", async function () {
    const pass1 = await contractUser1.checkId(1);
    expect((await pass1) == true);
  });

  it("User 2 Rejected", async function () {
    const pass2 = await contractUser2.checkId(1);
    expect((await pass2) == false);
  });
});
