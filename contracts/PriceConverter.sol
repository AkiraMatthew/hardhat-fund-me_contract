// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Commit from 0.8.0 version:
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// All the functions in a library are internal
library PriceConverter {
    function getPrice() internal view returns (uint256) {
        // Since this is an instance of us interacting with a contract outside of the project, we need 2 things:
        // ABI
        // Contract Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        /*uint80 roundID*/
        /*uint startedAt*/
        /*uint timeStamp*/
        /*uint80 answeredInRound*/
        (, int256 price, , , ) = priceFeed.latestRoundData();
        // Price of ETH in termos of USD
        // Solidity reads the amount in WEI, 1 eth = 1e18 == 1 * 10**10
        // this contract has 8 decimals, so if 1 ETH = 3000 usd it means that solidity reads it as 3000.00000000 = 300000000000
        // to make the function amount matches with solidity amount, we need to combine both, that means that the
        //function with 8 decimals need more 10 decimals to complete 18 decimals and become the same unit(wei)
        // 3000 usd
        return uint256(price * 1e10); // 1* 10**10 = 10000000000
    }

    function getVersion() internal view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        return priceFeed.version();
    }

    function getConversionRate(
        uint256 ethAmount
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice();
        // always multiply before dividing
        // 3000_000000000000000000 = ETH/USD price
        // 1_000000000000000000 ETH
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18; // if we don't divide, it will return 3 * 1e36

        return ethAmountInUsd;
    }
}
