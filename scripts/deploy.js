const hre = require("hardhat");

async function main() {
  const initBalance = 1;
  const BarnithWallet = await hre.ethers.getContractFactory("BarnithWallet"); // Updated contract name
  const barnithWallet = await BarnithWallet.deploy(initBalance);
  await barnithWallet.deployed();

  console.log(`A contract with balance of ${initBalance} ETH deployed to ${barnithWallet.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
