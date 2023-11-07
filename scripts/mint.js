const hre = require('hardhat');
const contract_address = require("../constants/contract_address");
const {ethers} = hre;

async function main() {
    const contract = await ethers.getContractAt('Fish', contract_address);

    console.log(await contract.owner())
    await contract.mint(contract.owner(), 50);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});