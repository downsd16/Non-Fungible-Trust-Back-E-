/*
*   Simple Deployment Function
*       Change contents of ethers.getContractFactory('') to current contract name
*       @dev check that hardhat is a network option in hardhat.config.js
*/

async function main() {
    const Controller = await ethers.getContractFactory("accessController");
    const controller = await Controller.deploy();

    //Wait for contract to be deployed, then print to console
    await controller.deployed().then(
      console.log("Contoller deployed to: ", controller.address)
    );
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
