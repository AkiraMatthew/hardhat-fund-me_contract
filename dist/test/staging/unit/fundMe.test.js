"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
describe("FundMe", async () => {
    let fundMe;
    let deployer;
    let mockV3Aggregator;
    const sendValue = hardhat_1.ethers.utils.parseEther("2"); //1eth
    beforeEach(async () => {
        // deploy our fundme contract
        // using hardhat deploy
        // const accounts = await ethers.getSigners();
        // const accountZero = accounts[0];
        deployer = (await (0, hardhat_1.getNamedAccounts)()).deployer;
        // fixture let we run our deployments folder
        // with as many tags we want
        await hardhat_1.deployments.fixture(["all"]);
        fundMe = await hardhat_1.ethers.getContract("FundMe", deployer);
        mockV3Aggregator = await hardhat_1.ethers.getContract("MockV3Aggregator", deployer);
    });
    describe("constructor", async () => {
        it("set the aggegator addresses correctly", async () => {
            const response = await fundMe.priceFeed();
            chai_1.assert.equal(response, mockV3Aggregator.address);
        });
    });
    describe("fund", async () => {
        it("Fails if you don't send enough ETH", async () => {
            await (0, chai_1.expect)(fundMe.fund()).to.be.revertedWith("You need to spend more ETH");
        });
        it("updated the amount funded data structure", async () => {
            await fundMe.fund({ value: sendValue });
            const response = await fundMe.addressToAmountFunded(deployer);
            chai_1.assert.equal(response.toString(), sendValue.toString());
        });
        it("Adds funder to array of funders", async () => {
            await fundMe.fund({ value: sendValue });
            const funder = await fundMe.funders(0);
            chai_1.assert.equal(funder, deployer);
        });
    });
    describe("withdraw", async () => {
        // before we can even withdraw, we first want that the contract
        // have some money in
        beforeEach(async () => {
            await fundMe.fund({ value: sendValue });
        });
        it("Withdraw ETH from a single founder", async () => {
            //This is a way to think about writing test
            // Arrange
            /// Checking if it's really withdrawing ETH from
            /// a single founder/
            // Starting after being funded with some ETH
            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer);
            // Act
            const transactionResponse = await fundMe.withdraw();
            const transactionReceipt = await transactionResponse.wait(1);
            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            //the deployer will spend a little bit of gas
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer);
            // Assert
            chai_1.assert.equal(endingFundMeBalance, 0);
            chai_1.assert.equal(startingFundMeBalance.add + startingDeployerBalance, endingDeployerBalance.add(gasCost).toString());
        });
    });
});
