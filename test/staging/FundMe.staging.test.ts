import { ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains } from "../../helper-hardhat-config";
import { FundMe } from "../../typechain-types";
import { assert } from "console";

/**
 * @notice We do not deploy it here, because in staging test we assume
 * that the code is already deployed.
 * @notice We also don't need a mock because our staging is assuming
 * that we're on a testnet.
 */

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async () => {
          beforeEach(async () => {
              let fundMe: FundMe;
              let deployer;
              const sendValue = ethers.utils.parseEther("");
              beforeEach(async () => {
                  deployer = (await getNamedAccounts()).deployer;
                  fundMe = await ethers.getContract("FundMe", deployer);
              });

              it("Allows people to fund and withdraw", async () => {
                  await fundMe.fund({ value: sendValue });
                  await fundMe.withdraw();
                  const endingBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  );
                  assert.equal(endingBalance.toString(), "0");
              });
          });
      });
