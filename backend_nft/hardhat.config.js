/**
* @type import('hardhat/config').HardhatUserConfig
*/

/*
*   Simplified Config File for Hardhat Environment
*       dotenv:             allows use to read environment variables in ./.env
*       hardhat-ethers:     ethers library for web app interaction
*/

require("@nomiclabs/hardhat-ethers");

const TEST1_PK = "e424694ae5236c16496783e5e8fc7183899bf7f5fad654b1b1c1d62d5d325cbf"
const API_URL = "https://eth-rinkeby.alchemyapi.io/v2/k6YWwXNqqI4RjKRe--6p9D4sPQiZJySK"

module.exports = {
  solidity: "0.8.4",                      //sol version should match contract pragma exactly
  defaultNetwork: "hardhat",
  networks: {
          hardhat: {},
          rinkeby: {
                  url: API_URL,
                  accounts: [ TEST1_PK ]
          }
  },
}