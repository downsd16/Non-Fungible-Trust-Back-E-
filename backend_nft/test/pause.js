/* 
*   Pause Test LOCALHOST ONLY
*/

const { expect } = require("chai");

const fs = require('fs');
const HARDHAT_NODE_PK_OWNER = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const HARDHAT_NODE_PK_USER_1 = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const HARDHAT_NODE_PK_USER_2 = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";

const HARDHAT_NODE_ADD_USER_1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const HARDHAT_NODE_ADD_USER_2 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

const DEPLOY_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const AccessController = JSON.parse(fs.readFileSync('./artifacts/contracts/controller.sol/accessController.json', 'utf-8'))

describe("Pause Test", function() {

    //Declare LocalHost Provider on port 8545
    const provider = new ethers.getDefaultProvider("http://localhost:8545");
        
    //Declare three signers, one for owner and user
    const signerOwner = new ethers.Wallet(HARDHAT_NODE_PK_OWNER, provider);

    //Declare three contracts, one of the owner, one for the signer
    const contractOwner = new ethers.Contract(DEPLOY_ADDRESS, AccessController.abi, signerOwner);

    //Get the account balances before transfer
    const balanceBefore1 = contractOwner.ticketBalance(HARDHAT_NODE_ADD_USER_1, 1);
    const balanceBefore2 = contractOwner.ticketBalance(HARDHAT_NODE_ADD_USER_2, 1);

    it("PAUSED Mint Test", async function () {
        await contractOwner.pause();
        await contractOwner.mintNFT(HARDHAT_NODE_ADD_USER_1, 1, 2)
        const tempBalance = await contractOwner.ticketBalance;
        expect(tempBalance == balanceBefore1)
    });

    it("PAUSED Transfer Test", async function() {
        await expect(contractOwner.marketTransfer(HARDHAT_NODE_ADD_USER_1, HARDHAT_NODE_ADD_USER_2, 1))
            .to.be.revertedWith("");
    });

    it("PAUSED Burn Test", async function() {
        await expect(contractOwner.burnNFT(HARDHAT_NODE_ADD_USER_1, 1, 1))
            .to.be.reverted;
    });

    it("UNPAUSED Validate Functions", async function() {
        //Unpause Contract
        await contractOwner.unpause();

        //Call functions again 
        await contractOwner.mintNFT(HARDHAT_NODE_ADD_USER_1, 1, 2);
        await contractOwner.marketTransfer(HARDHAT_NODE_ADD_USER_1, HARDHAT_NODE_ADD_USER_2, 1);
        await contractOwner.burnNFT(HARDHAT_NODE_ADD_USER_1, 1, 1);

        //Get new balances
        const balanceAfter1 = await contractOwner.ticketBalance(HARDHAT_NODE_ADD_USER_1, 1);
        const balanceAfter2 = await contractOwner.ticketBalance(HARDHAT_NODE_ADD_USER_2, 1);

        expect(await balanceAfter1 == await balanceBefore1 && await balanceAfter2 == (await balanceBefore2 + 1));
    });

});