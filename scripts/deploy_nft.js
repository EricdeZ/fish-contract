const hre = require("hardhat");

const deploy = async () => {
    const Fish = await hre.ethers.getContractFactory("FishNFT");
    const Fish_ = await Fish.deploy();

    await Fish_.deployed();

    console.log(
        `Contract Address: ${Fish_.address}`
    );
    return {
        contractAddress: Fish_.address,
        contract: Fish_
    }
}

if(require.main === module) {
    deploy().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}

module.exports = {
    deploy
}