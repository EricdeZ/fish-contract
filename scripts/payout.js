const hre = require('hardhat');
const {ethers} = hre;

async function main() {
    const contract = await ethers.getContractAt('Fish', '0xb38809246fe6c3e0C086E3db8dB9744c9375204d');
    await contract.payout(await ethers.provider.getBalance(contract.address));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});