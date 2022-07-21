/*
    NFT PoC Ethers Script
    @Author:    Devin Downs
    @Date:      May-Aug 2022
    @Dev:       This JS document allows our application to interact with the deployed contract
*/

//Import Ethers library
const { ethers } = require("ethers");

//  Creates a new Provider (read only)
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

//Prompts user for connection
await provider.send("eth_requestAccounts", []);

//Gets a signer for signing contracts
const signer = provider.getSigner();

//Testing log
console.log("Account: ", await signer.getAddress());

//Confirms if there are any addresses connected
var accountPromise = ethers.getAccount();

accountPromise.then(function(address) {
    if(!address) { console.log('No accounts found'); }
    else { console.log('Current Account: ' + address); }
});

//Returns what network the current address is connected to
var networkPromise = ethers.getNetwork();

networkPromise.then(function(network) {
    console.log('Current Network: ' + network);
});