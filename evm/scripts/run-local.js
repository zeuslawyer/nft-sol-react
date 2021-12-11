const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

const main = async () => {
  const contractFactory = await hre.ethers.getContractFactory("EpicNFT"); // Compiles contract
  const contract = await contractFactory.deploy(); // Deploys
  await contract.deployed();

  console.log(`Contract deployed to : ${contract.address}`);

  // Call the contract's function to mint a NFT
  let tx = await contract.makeEpicNFT();

  // Wait for it to be mined.
  await tx.wait();
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
