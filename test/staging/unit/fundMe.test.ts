import { assert, expect } from "chai";
import { deployments, getNamedAccounts, ethers, network } from "hardhat";
import { developmentChains } from "../../../helper-hardhat-config";
import { FundMe, MockV3Aggregator } from "../../../typechain-types";

describe("FundMe", async () => {
    let fundMe: FundMe;
    let deployer: any;
    let mockV3Aggregator: MockV3Aggregator;
    const sendValue = ethers.utils.parseEther("25"); //1eth
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
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH"
            );
        });
        it("updated the amount funded data structure", async () => {
            await fundMe.fund({ value: sendValue });
            const response = await fundMe.addressToAmountFunded(deployer);
            assert.equal(response.toString(), sendValue.toString());
        });
        it("Adds funder to array of funders", async () => {
            await fundMe.fund({ value: sendValue });
            const funder = await fundMe.funders(0);
            assert.equal(funder, deployer);
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
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            );
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            );
            // Act
            const transactionResponse = await fundMe.withdraw();
            const transactionReceipt = await transactionResponse.wait(1);
            const { gasUsed, effectiveGasPrice } = transactionReceipt;
            // we use .add to add the big numbers
            const gasCost = gasUsed.mul(effectiveGasPrice);

            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            );
            //the deployer will spend a little bit of gas
            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            );
            // Assert
            assert.equal(endingFundMeBalance, 0);
            // we use .add to add the big numbers
            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
            );
        });
        it("allows us to withdraw with multiple funders", async () => {
            // Arrange
            // we need to connect to these different accounts
            // because the default account is the deployer
            const accounts = await ethers.getSigners();
            for (let i = 1; i < 6; i++) {
                const fundMeConnectedContract = await fundMe.connect(
                    accounts[i]
                );
                await fundMeConnectedContract.fund({ value: sendValue });
            }
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            );
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            );

            // Act
            const transactionResponse = await fundMe.withdraw();
            const transactionReceipt = await transactionResponse.wait(1);
            const { gasUsed, effectiveGasPrice } = transactionReceipt;
            const gasCost = gasUsed.mul(effectiveGasPrice);

            //Assert
            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            );
            //the deployer will spend a little bit of gas
            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            );
            // Assert
            assert.equal(endingFundMeBalance, 0);
            // we use .add to add the big numbers
            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
            );

            // Make sure that the funders are reset properly
            await expect(fundMe.funders(0)).to.be.reverted;

            // looping throught all accounts and making sure that all the
            // mapping amounts are 0
            for (let i = 1; i < 6; i++) {
                assert.equal(
                    await fundMe.addressToAmountFunded(accounts[1].address),
                    0
                );
            }
        });

        // Adding modifiers to only allow the owner to withdraw
        it("Only allows the owner to withdraw", async () => {
            const accounts = await ethers.getSigners();
            const attacker = accounts[1];
            const attackerConnectedContract = await fundMe.connect(attacker);
            await expect(
                attackerConnectedContract.withdraw()
            ).to.be.revertedWith("FundMe__NotOwner");
        });
    });
});
