"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@typechain/hardhat");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
require("dotenv/config");
require("solidity-coverage");
require("hardhat-deploy");
require("solidity-coverage");
// interface MyNetworksConfig extends NetworksUserConfig{
//     blockConfirmations: string | number
// }
// interface MyConfig extends HardhatUserConfig {
//     networks: MyNetworksConfig
// }
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const config = {
    //solidity: "0.8.8",
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            //blockConfirmations: 6,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            //accounts: hardhat has already placed it
            chainId: 31337,
        },
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
};
exports.default = config;
