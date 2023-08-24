// Get funds from users
// Withdraw funds
// Set a minimum value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PriceConverter.sol";

// 1º 820, 652; 2º 799, 610; gas to deploy
// Constant and Immutable keyword helps to bring gas down

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    //constant variables have different variable names
    uint256 public constant MINIMUM_USD = 50 * 1e18;
    // constant - 351 * 13000000000 = 4.563.000.000.000 = 0,00844155 usd
    // non-constant 2451 * 13000000000 = 34314000000000 = 0,06 usd

    address[] public funders;
    // we map the addresses to know how much each address has send to the contract;
    mapping(address => uint256) public addressToAmountFunded;

    // to make only the contract owner able to call the withdrwa function, we need to create teh following:
    // variables that are set 1 time but outside of the line where they're declared
    // we can mark as immutable
    address public immutable i_owner; // instead of calling owner, a good convention is using 'i_'

    // 444 gas immutable
    // 2,500 gas non-immutable
    constructor() {
        //whoever who deploys the contract
        i_owner = msg.sender;
    }

    // Limit tinkering / triaging to 20 minutes to 20 min
    // Take at least 15min or be 100% sure
    function fund() public payable {
        // Want to be able to set a minimum fund amount
        // 1. How do we send ETH to this contract?
        // to get  how much someone is sending:
        //msg.value;
        // or if a specific amount is required:
        // require(msg.value >= 1e18, "Didn't send enough");// ETH must be representend in WEI, so 1 ETH == 1e18 == 1 * ((10)**18)
        // msg.value is the first parameter to be considered by a library
        // so when using a library, insted of using getConversionRate(msg.value) we use msg.value.getConversionRate();
        require(
            msg.value.getConversionRate() >= MINIMUM_USD,
            "Didn't send enough"
        );
        funders.push(msg.sender); // -> sender is the address of however calls the function
        //here we can see
        addressToAmountFunded[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        // When we withdraw the funds we also want to reset the funders array
        // for(starting index, ending index, step amount)
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            //code
            address funder = funders[funderIndex];
            // Here we reset the counter of the amount funded by the funder
            addressToAmountFunded[funder] = 0;
        }
        // we need to reset the funders array
        // instead of looping through the array and deleting objects, we can just do:
        funders = new address[](0); // that means we will start a new array with 0 elements inside of it.
        // we need to actually withdraw the funds

        // There are 3 different ways to send ETH from a contract to somewhere else

        /*// transfer:
        // msg.sender = is of type address
        // payable(msg.sender) = in of type payable address
        // https://solidity-by-example.org/sending-ether/
        // in solidity in order to send the native token, like ETH, you can only work with payable addresses 
        // transfer (2300 gas, throws error)
        payable(msg.sender).transfer(address(this).balance); // this keyword refers to all this contract
        // but there are some issues with 'transfer'
        
        // send (2300 gas, returns bool)
        // payable(msg.sender).send(address(this).balance) //but we don't want to finish the call here, so:
        bool sendSuccess = payable(msg.sender).send(address(this).balance);
        require(sendSuccess, "Send failed"); //if it fails, still, using the require the trx will revert in case of error*/

        // RECOMMENDED - call (forward all gas or set gas, returns bool)(using low-level code commands)
        (bool callSuccess /*bytes memory dataReturned*/, ) = payable(msg.sender)
            .call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    modifier onlyOwner() {
        // With custom error, it makes gas efficient:
        if (msg.sender != i_owner) {
            revert NotOwner();
        } // the revert keyword make the same as 'require()' but without the conditional beforehand
        _;

        // Another way to do, but without custom error:

        // // To make only the contract owner to be able to withdraw:
        // require(msg.sender == i_owner, "Sender is not the owner!");
        // _; // the underscore represents doing the rest of the code.
        // //if the underscore comes above the require, it would mean to do the code and after went through the entire code
    }

    // What happens if someone send this contract ETH without calling the fund function

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
