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
import verify from "../utils/verify";

const deployFundMe = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = <number>network.config.chainId;

    // if chainId is X use address Y
    // if chainId is Z use address A

    let ethUsdPriceFeedAddress!: string;
    // const ethUsdPriceFeedAddress: string = networkConfig[chainId]["ethUsdPricefeed"];
    if (developmentChains.includes(network.name)) {
        // For development chains, use a mock aggregator address
        const ethUsdAggregator = await get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
        console.log("Using MockV3Aggregator address:", ethUsdPriceFeedAddress);
    } else {
        // For other chains, use the configured price feed address
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPricefeed"];
        console.log("Using networkConfig address:", ethUsdPriceFeedAddress);
    }
    // if the contract doesn't exist, we deploy a minimal version of
    // for our local testing

    // what happens when we want to change chains?
    // when going for localhost or hardhat network we want to use a mock
    const args = [ethUsdPriceFeedAddress];
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put price feed address
        log: true,
        //waitConfirmations: network.config.blockConfirmations || 1,
    });
    log(`FundMe deployed at ${fundMe.address}`);
    log("-----------------------------------------------");
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args);
    }
};

export default deployFundMe;
deployFundMe.tags = ["all", "fundme"];
