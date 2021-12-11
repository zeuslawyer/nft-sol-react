const hre = require("hardhat");

const main = async () => {
  const factory = await hre.ethers.getContractFactory("EpicNFT");
  const contract = await factory.deploy();
  await contract.deployed();
  console.log(`Contract deployed to : ${contract.address}`);

  // let tx = await contract.makeEpicNFT();
  // await tx.wait();
  // console.log("Minted NFT #1");

  // txn = await contract.makeEpicNFT();
  // // Wait for it to be mined.
  // await txn.wait();
  // console.log("Minted NFT #2");
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
