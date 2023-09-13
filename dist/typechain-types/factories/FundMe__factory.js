"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundMe__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "priceFeedAddress",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "FundMe__NotOwner",
        type: "error",
    },
    {
        inputs: [],
        name: "MINIMUM_USD",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "addressToAmountFunded",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "fund",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "funders",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "i_owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "priceFeed",
        outputs: [
            {
                internalType: "contract AggregatorV3Interface",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60a060405234801561001057600080fd5b5060405162000fd038038062000fd083398181016040528101906100349190610115565b3373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b8152505080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610142565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100e2826100b7565b9050919050565b6100f2816100d7565b81146100fd57600080fd5b50565b60008151905061010f816100e9565b92915050565b60006020828403121561012b5761012a6100b2565b5b600061013984828501610100565b91505092915050565b60805160601c610e68620001686000396000818161019301526105590152610e686000f3fe6080604052600436106100705760003560e01c8063741bef1a1161004e578063741bef1a146100f4578063b60d42881461011f578063dba6335f14610129578063dc0d3dff1461015457610070565b80633ccfd60b146100755780633e47d6f31461008c5780636b69a592146100c9575b600080fd5b34801561008157600080fd5b5061008a610191565b005b34801561009857600080fd5b506100b360048036038101906100ae91906107a0565b6103d1565b6040516100c091906107e6565b60405180910390f35b3480156100d557600080fd5b506100de6103e9565b6040516100eb91906107e6565b60405180910390f35b34801561010057600080fd5b506101096103f6565b6040516101169190610860565b60405180910390f35b61012761041c565b005b34801561013557600080fd5b5061013e610557565b60405161014b919061088a565b60405180910390f35b34801561016057600080fd5b5061017b600480360381019061017691906108d1565b61057b565b604051610188919061088a565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610216576040517f579610db00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b6000805490508110156102c157600080828154811061023b5761023a6108fe565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505080806102b99061095c565b915050610219565b50600067ffffffffffffffff8111156102dd576102dc6109a5565b5b60405190808252806020026020018201604052801561030b5781602001602082028036833780820191505090505b5060009080519060200190610321929190610696565b5060003373ffffffffffffffffffffffffffffffffffffffff164760405161034890610a05565b60006040518083038185875af1925050503d8060008114610385576040519150601f19603f3d011682016040523d82523d6000602084013e61038a565b606091505b50509050806103ce576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103c590610a77565b60405180910390fd5b50565b60016020528060005260406000206000915090505481565b6802b5e3af16b188000081565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6802b5e3af16b188000061045b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16346105ba90919063ffffffff16565b101561049c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049390610ae3565b60405180910390fd5b6000339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461054e9190610b03565b92505081905550565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000818154811061058b57600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806105c6836105f6565b90506000670de0b6b3a764000085836105df9190610b59565b6105e99190610be2565b9050809250505092915050565b6000808273ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b15801561063f57600080fd5b505afa158015610653573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106779190610ca0565b5050509150506402540be4008161068e9190610d1b565b915050919050565b82805482825590600052602060002090810192821561070f579160200282015b8281111561070e5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906106b6565b5b50905061071c9190610720565b5090565b5b80821115610739576000816000905550600101610721565b5090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061076d82610742565b9050919050565b61077d81610762565b811461078857600080fd5b50565b60008135905061079a81610774565b92915050565b6000602082840312156107b6576107b561073d565b5b60006107c48482850161078b565b91505092915050565b6000819050919050565b6107e0816107cd565b82525050565b60006020820190506107fb60008301846107d7565b92915050565b6000819050919050565b600061082661082161081c84610742565b610801565b610742565b9050919050565b60006108388261080b565b9050919050565b600061084a8261082d565b9050919050565b61085a8161083f565b82525050565b60006020820190506108756000830184610851565b92915050565b61088481610762565b82525050565b600060208201905061089f600083018461087b565b92915050565b6108ae816107cd565b81146108b957600080fd5b50565b6000813590506108cb816108a5565b92915050565b6000602082840312156108e7576108e661073d565b5b60006108f5848285016108bc565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610967826107cd565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561099a5761099961092d565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600081905092915050565b50565b60006109ef6000836109d4565b91506109fa826109df565b600082019050919050565b6000610a10826109e2565b9150819050919050565b600082825260208201905092915050565b7f43616c6c206661696c6564000000000000000000000000000000000000000000600082015250565b6000610a61600b83610a1a565b9150610a6c82610a2b565b602082019050919050565b60006020820190508181036000830152610a9081610a54565b9050919050565b7f596f75206e65656420746f207370656e64206d6f726520455448000000000000600082015250565b6000610acd601a83610a1a565b9150610ad882610a97565b602082019050919050565b60006020820190508181036000830152610afc81610ac0565b9050919050565b6000610b0e826107cd565b9150610b19836107cd565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610b4e57610b4d61092d565b5b828201905092915050565b6000610b64826107cd565b9150610b6f836107cd565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610ba857610ba761092d565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610bed826107cd565b9150610bf8836107cd565b925082610c0857610c07610bb3565b5b828204905092915050565b600069ffffffffffffffffffff82169050919050565b610c3281610c13565b8114610c3d57600080fd5b50565b600081519050610c4f81610c29565b92915050565b6000819050919050565b610c6881610c55565b8114610c7357600080fd5b50565b600081519050610c8581610c5f565b92915050565b600081519050610c9a816108a5565b92915050565b600080600080600060a08688031215610cbc57610cbb61073d565b5b6000610cca88828901610c40565b9550506020610cdb88828901610c76565b9450506040610cec88828901610c8b565b9350506060610cfd88828901610c8b565b9250506080610d0e88828901610c40565b9150509295509295909350565b6000610d2682610c55565b9150610d3183610c55565b9250827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0482116000841360008413161615610d7057610d6f61092d565b5b817f80000000000000000000000000000000000000000000000000000000000000000583126000841260008413161615610dad57610dac61092d565b5b827f80000000000000000000000000000000000000000000000000000000000000000582126000841360008412161615610dea57610de961092d565b5b827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0582126000841260008412161615610e2757610e2661092d565b5b82820290509291505056fea2646970667358221220129985a19ff4d89742af84207560eef4b2701b1a3812343a23e68f2f4bb00dc764736f6c63430008080033";
const isSuperArgs = (xs) => xs.length > 1;
class FundMe__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
        this.contractName = "FundMe";
    }
    deploy(priceFeedAddress, overrides) {
        return super.deploy(priceFeedAddress, overrides || {});
    }
    getDeployTransaction(priceFeedAddress, overrides) {
        return super.getDeployTransaction(priceFeedAddress, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.FundMe__factory = FundMe__factory;
FundMe__factory.bytecode = _bytecode;
FundMe__factory.abi = _abi;
