const { expect } = require("chai");
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");
const {deploy} = require("../scripts/deploy");
const {ethers} = hre;

describe("🐟🐟🐟🐟🐟🐟🐟🐟🐟", async function () {

    it('Should deploy the contract', async function () {
        const {contractAddress} = await loadFixture(deploy)
        expect(contractAddress).not.null;
    });

    it('Get Owner', async function () {
        const {contractAddress} = await loadFixture(deploy)
        const contract = await ethers.getContractAt('Fish', contractAddress);
        console.log('Owner: ', await contract.owner())
    });
    it('Owner balance', async function () {
        const {contractAddress} = await loadFixture(deploy)
        const contract = await ethers.getContractAt('Fish', contractAddress);
        const balance = await contract.balanceOf(await contract.owner());
        expect(balance).to.equal(2000);
    });
    it('Owner sends tokens', async function () {
        const [_, addr1] = await ethers.getSigners();

        const {contract} = await loadFixture(deploy)

        // Transfer 50 tokens from owner to addr1
        await contract.transfer(addr1.address, 50);
        expect(await contract.balanceOf(addr1.address)).to.equal(50);

    });
    it('Tokenholder cannot send tokens', async function () {
        const [_, addr1, addr2] = await ethers.getSigners();

        const {contract} = await loadFixture(deploy)

        // Transfer 50 tokens from owner to addr1
        await contract.transfer(addr1.address, 50);
        expect(await contract.balanceOf(addr1.address)).to.equal(50);
        // Transfer 50 tokens from addr1 to addr2
        await contract.connect(addr1)
        expect(contract.transfer(addr2.address, 50)).to.be.reverted;

    });
})