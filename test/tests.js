const { expect } = require("chai");
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");
const {deploy} = require("../scripts/deploy");
const { ethers} = hre;

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
        expect(balance).to.equal(800);
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
    it('Buy 🐟', async function () {
        const [_, addr1] = await ethers.getSigners();

        const {contract} = await loadFixture(deploy)

        const tx = await contract.connect(addr1).buy({ value: ethers.utils.parseEther("1.0") });
        const receipt = await tx.wait()
        receipt.events?.filter(event => {return event.event === "Bought" })
            .forEach(bought_event => {bought_event && console.log('EVENT Bought by: ', bought_event.args['from'])})
        expect(await contract.balanceOf(addr1.address)).to.equal(1);
    });
    it('Payout', async function () {
        const [_, addr1] = await ethers.getSigners();

        const {contract} = await loadFixture(deploy)

        const tx_buy = await contract.connect(addr1).buy({ value: ethers.utils.parseEther("1.0") });
        await tx_buy.wait()

        let balance_contract = await ethers.provider.getBalance(contract.address)
        expect(hre.ethers.utils.formatEther(balance_contract)).to.equal("1.0");

        const tx = await contract.payout(ethers.utils.parseEther("1.0") );
        await tx.wait()

        balance_contract = await ethers.provider.getBalance(contract.address)
        expect(hre.ethers.utils.formatEther(balance_contract)).to.equal("0.0");
    });
    it('Donate 🐟', async function () {
        const [_, addr1] = await ethers.getSigners();

        const {contract} = await loadFixture(deploy)

        let tx = await contract.connect(addr1).donate({ value: ethers.utils.parseEther("1.0") });
        const receipt = await tx.wait()
        receipt.events?.filter(event => {return event.event === "Donation" })
            .forEach(donation_event => {donation_event && console.log('EVENT Donation by: ',
                donation_event.args['from'], hre.ethers.utils.formatEther(donation_event.args['amount']))})

        let balance_contract = await ethers.provider.getBalance(contract.address)
        expect(hre.ethers.utils.formatEther(balance_contract)).to.equal("1.0");
        expect(hre.ethers.utils.formatEther(await contract.donators(addr1.address))).to.equal("1.0");

        tx = await contract.connect(addr1).donate({ value: ethers.utils.parseEther("3.0") });
        await tx.wait()
        balance_contract = await ethers.provider.getBalance(contract.address)
        expect(hre.ethers.utils.formatEther(balance_contract)).to.equal("4.0");
        expect(hre.ethers.utils.formatEther(await contract.donators(addr1.address))).to.equal("4.0");
    });
})