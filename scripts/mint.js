const hre = require('hardhat');
const {ethers} = hre;

async function main() {
    const contract = await ethers.getContractAt('Fish', '0xb38809246fe6c3e0C086E3db8dB9744c9375204d');

    console.log(await contract.owner())
    await contract.mint(contract.owner(), 50);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});