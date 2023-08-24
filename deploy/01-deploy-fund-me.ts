import "hardhat";
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

export default async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
};
