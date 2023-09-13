export interface networkConfigItem {
    name?: string;
    ethUsdPriceFeed?: string;
}
export interface networkConfigInfo {
    [key: number | string]: networkConfigItem;
}
declare const networkConfig: networkConfigInfo;
declare const developmentChains: string[];
declare const DECIMALS = 8;
declare const INITIAL_ANSWER = 200000000;
export { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER };
