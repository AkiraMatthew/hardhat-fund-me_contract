// import
//main
//calling for the main function

// hre -> hardhat runtime environment
// export default async (hre) => {
//     // hre.getNamedAccounts()
//     // hrs.deployments
//     // same as
//     const { getNamedAccounts, deployments } = hre;
// };
// or

import { network } from "hardhat";
import { developmentChains, networkConfig } from "../helper-hardhat-config";

const deployFundMe = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = <number>network.config.chainId;

    // if chainId is X use address Y
    // if chainId is Z use address A

    // const ethUsdPriceFeedAddress: string = networkConfig[chainId]["ethUsdPricefeed"];
    let ethUsdPriceFeedAddress: string;
    if (developmentChains.includes(network.name)) {
        // getting the most recent deployment
        const ethUsdAggregator = await get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        // if not on a development chain
        const ethUsdPriceFeedAddress: string =
            networkConfig[chainId]["ethUsdPricefeed"];
    }
    // if the contract doesn't exist, we deploy a minimal version of
    // for our local testing

    // what happens when we want to change chains?
    // when going for localhost or hardhat network we want to use a mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [
            /* address? */
        ], // put price feed address
        log: true,
    });
    log(`FundMe deployed at ${fundMe.address}`);
    log("-----------------------------------------------");
};

export default deployFundMe;
deployFundMe.tags = ["all", "fundme"];
