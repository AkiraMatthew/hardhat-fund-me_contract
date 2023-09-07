import { assert } from "chai";
import { deployments, getNamedAccounts, ethers, network } from "hardhat";
import { developmentChains } from "../../../helper-hardhat-config";
import { FundMe, MockV3Aggregator } from "../../../typechain-types";

describe("FundMe", async () => {
    let fundMe: FundMe;
    let deployer;
    let mockV3Aggregator: MockV3Aggregator;
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

    describe("fund", async () => {
        it("Fails if you don't send enough ETH", async () => {
            await fundMe.fund();
        });
    });
});
