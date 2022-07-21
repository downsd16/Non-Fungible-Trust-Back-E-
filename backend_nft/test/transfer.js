/* 
*   Minting Test LOCALHOST ONLY
*/

const { expect } = require("chai");

const fs = require('fs');
const HARDHAT_NODE_PK_OWNER = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const HARDHAT_NODE_ADD_USER_1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const HARDHAT_NODE_ADD_USER_2 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

const DEPLOY_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const AccessController = JSON.parse(fs.readFileSync('./artifacts/contracts/controller.sol/accessController.json', 'utf-8'))

describe("Transfer Test", function() {
        
    //Declare LocalHost Provider on port 8545
    const provider = new ethers.getDefaultProvider("http://localhost:8545");
        
    //Declare two signers, one for owner and user
    const signerOwner = new ethers.Wallet(HARDHAT_NODE_PK_OWNER, provider);
    
    //Declare contract for the owner
    const contractOwner = new ethers.Contract(DEPLOY_ADDRESS, AccessController.abi, signerOwner);
    
    //Get the account balances before transfer
    const balanceBefore1 = contractOwner.ticketBalance(HARDHAT_NODE_ADD_USER_1, 1);
    const balanceBefore2 = contractOwner.ticketBalance(HARDHAT_NODE_ADD_USER_2, 1);

    it("Mint for user 1", async function () {
        //Mint NFT to User 1
        const mint = await contractOwner.mintNFT(HARDHAT_NODE_ADD_USER_1, 1, 1);
        await mint.wait();

        expect(await mint).to.exist;
    });

    it("Transfer from user 1 to user 2", async function() {
        //Transfers NFT from User 1 to User 2
        const transfer = contractOwner.marketTransfer(
            HARDHAT_NODE_ADD_USER_1, 
            HARDHAT_NODE_ADD_USER_2, 
            1);
        expect(await transfer).to.exist;
    });

    it("Validate Transfer", async function() {
        //Get new balances
        const balanceAfter1 = await contractOwner.ticketBalance(HARDHAT_NODE_ADD_USER_1, 1);
        const balanceAfter2 = await contractOwner.ticketBalance(HARDHAT_NODE_ADD_USER_2, 1);

        //Evaluate transfer success based on old and new balances
        expect(await balanceAfter1 == (balanceBefore1 - 1) && await balanceAfter2 == (balanceBefore2 + 1));
    });
});