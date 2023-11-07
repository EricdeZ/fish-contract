const hre = require('hardhat');
const {ethers} = hre;

async function main() {
    const contract = await ethers.getContractAt('Fish', '0xde0d75886ae8afe7b695FEfD8a2bB2474B3cD292');

    console.log(await contract.owner())
    await contract.mint(contract.owner(), 50);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});