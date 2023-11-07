const hre = require('hardhat');
const {ethers} = hre;

async function main() {
    const contract = await ethers.getContractAt('Fish', '0xde0d75886ae8afe7b695FEfD8a2bB2474B3cD292');
    await contract.payout();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});