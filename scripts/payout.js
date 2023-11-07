const hre = require('hardhat');
const contract_address = require("../constants/contract_address");
const {ethers} = hre;

async function main() {
    const contract = await ethers.getContractAt('Fish', contract_address);
    await contract.payout();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});