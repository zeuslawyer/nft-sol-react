const hre = require("hardhat");

const main = async () => {
  const contractFactory = await hre.ethers.getContractFactory("EpicNFT"); // Compiles contract
  const contract = await contractFactory.deploy(); // Deploys
  await contract.deployed();

  console.log(`Contract deployed to : ${contract.address}`);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

runMain();
