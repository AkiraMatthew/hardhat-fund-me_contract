"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INITIAL_ANSWER = exports.DECIMALS = exports.developmentChains = exports.networkConfig = void 0;
const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
    137: {
        name: "polygon",
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    },
    // 31337
};
exports.networkConfig = networkConfig;
// defining the chains for testing/mocking
const developmentChains = ["hardhat", "localhost"];
exports.developmentChains = developmentChains;
const DECIMALS = 8;
exports.DECIMALS = DECIMALS;
const INITIAL_ANSWER = 200000000;
exports.INITIAL_ANSWER = INITIAL_ANSWER;
