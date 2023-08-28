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
import { networkConfig } from "../helper-hardhat-config";

export default async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId: number = network.config.chainId;

    // if chainId is X use address Y
    // if chainId is Z use address A

    const ethUsdPriceFeedAddress: string =
        networkConfig[chainId]["ethUsdPricefeed"];

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
};
