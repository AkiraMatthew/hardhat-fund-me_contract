import { assert } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";

describe("FundMe", async () => {
    let fundMe: any;
    let deployer;
    let mockV3Aggregator: any;
    beforeEach(async () => {
        // deploy our fundme contract
        // using hardhat deploy
        // const accounts = await ethers.getSigners();
        // const accountZero = accounts[0];
        deployer = (await getNamedAccounts()).deployer;
        // fixture let we run our deployments folder
        // with as many tags we want
        await deployments.fixture(["all"]);
        fundMe = await ethers.getContract("FundMe", deployer);
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer
        );
    });

    describe("constructor", async () => {
        it("set the aggegator addresses correctly", async () => {
            const response = await fundMe.priceFeed();
            assert.equal(response, mockV3Aggregator.address);
        });
    });
});
