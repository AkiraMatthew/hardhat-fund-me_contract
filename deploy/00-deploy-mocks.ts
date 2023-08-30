import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { network } from "hardhat";
import {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} from "../helper-hardhat-config";

const deployMocks = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    // if we're in a local development networks, we need to deploy mocks!
    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...");
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        });
        log("Mocks Deployed");
        log("----------------------------------------");
    }
};

export default deployMocks;
deployMocks.tags = ["all", "mocks"];
