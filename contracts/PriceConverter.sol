// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Commit from 0.8.0 version:
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// All the functions in a library are internal
library PriceConverter {
    function getPrice(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        // ETH / USD rate in 18 digit
        return uint256(price * 1e10); // 1* 10**10 = 10000000000
    }

    /*function getVersion() internal view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        return priceFeed.version();
    }*/

    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        // always multiply before dividing
        // 3000_000000000000000000 = ETH/USD price
        // 1_000000000000000000 ETH
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18; // if we don't divide, it will return 3 * 1e36

        return ethAmountInUsd;
    }
}
