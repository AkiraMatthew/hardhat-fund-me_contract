// Get funds from users
// Withdraw funds
// Set a minimum value in USD

// SPDX-License-Identifier: MIT
// Pragma
pragma solidity ^0.8.0;

// Imports
import "./PriceConverter.sol";

// 1º 820, 652; 2º 799, 610; gas to deploy
// Constant and Immutable keyword helps to bring gas down

// Errors Codes
error FundMe__NotOwner();

// Interfaces, Libraries, contracts

/**
 * @title A contract for crowdfunding
 * @author Mateus Akira
 * @notice This contract is to demo a simple funding contract
 * @notice "s_" means that it's a storage variable, which consumes
 * a lot of gas.
 * @notice "i_" is a good practice for immutable variables
 * @notice for constant variables, we use CAPSLOCK
 * @dev This implements priceFeeds as libraries
 */
contract FundMe {
    // Type Declarations
    using PriceConverter for uint256;

    //State variables
    //constant variables have different variable names
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;
    // constant - 351 * 13000000000 = 4.563.000.000.000 = 0,00844155 usd
    // non-constant 2451 * 13000000000 = 34314000000000 = 0,06 usd

    address[] private s_funders;
    // we map the addresses to know how much each address has send to the contract;
    mapping(address => uint256) public s_addressToAmountFunded;

    // to make only the contract owner able to call the withdrwa function, we need to create teh following:
    // variables that are set 1 time but outside of the line where they're declared
    // we can mark as immutable
    address private immutable i_owner; // instead of calling owner, a good convention is using 'i_'

    // 444 gas immutable
    // 2,500 gas non-immutable
    AggregatorV3Interface public s_priceFeed;
    modifier onlyOwner() {
        // With custom error, it makes gas efficient:
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner();
        } // the revert keyword make the same as 'require()' but without the conditional beforehand
        _;

        // Another way to do, but without custom error:

        // // To make only the contract owner to be able to withdraw:
        // require(msg.sender == i_owner, "Sender is not the owner!");
        // _; // the underscore represents doing the rest of the code.
        // //if the underscore comes above the require, it would mean to do the code and after went through the entire code
    }

    // Functions Order:
    //// constructor
    //// receive
    //// fallback
    //// external
    //// public
    //// internal
    //// private
    //// view/pure

    constructor(address priceFeedAddress) {
        //whoever who deploys the contract
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    /*receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }*/

    /**
     * @notice This function funds this contract
     * @dev This implements priceFeeds as libraries
     */
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
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "You need to spend more ETH"
        );
        s_funders.push(msg.sender); // -> sender is the address of however calls the function
        //here we can see
        s_addressToAmountFunded[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        // When we withdraw the funds we also want to reset the s_funders array
        // for(starting index, ending index, step amount)
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            //code
            address funder = s_funders[funderIndex];
            // Here we reset the counter of the amount funded by the funder
            s_addressToAmountFunded[funder] = 0;
        }
        // we need to reset the s_funders array
        // instead of looping through the array and deleting objects, we can just do:
        s_funders = new address[](0); // that means we will start a new array with 0 elements inside of it.
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

    /**
     * @notice instead of always keep reading from storage, what
     * we gonna do is read the entire array into memore, 1 time.
     * And then read from memory instead from constantly read from
     * storage.
     */
    function cheaperWithdraw() public payable onlyOwner {
        address[] memory funders = s_funders;
        // mapping can't be in memory
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            // reseting the funders mapping
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    // What happens if someone send this contract ETH without calling the fund function

    /**
     * @notice We will make some getter functions in order to make
     * easier to anyone that interacts with our API to read the variables
     * because calling 'i_' ir 's_' is a bit strange for using the variables
     */
    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getAddressToAmountFunded(
        address funder
    ) public view returns (uint256) {
        return s_addressToAmountFunded[funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
