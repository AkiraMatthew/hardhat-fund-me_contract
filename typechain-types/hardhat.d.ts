/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "AggregatorInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AggregatorInterface__factory>;
    getContractFactory(
      name: "AggregatorV2V3Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AggregatorV2V3Interface__factory>;
    getContractFactory(
      name: "AggregatorV3Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AggregatorV3Interface__factory>;
    getContractFactory(
      name: "MockV3Aggregator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockV3Aggregator__factory>;
    getContractFactory(
      name: "AggregatorV3Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AggregatorV3Interface__factory>;
    getContractFactory(
      name: "FundMe",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FundMe__factory>;

    getContractAt(
      name: "AggregatorInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AggregatorInterface>;
    getContractAt(
      name: "AggregatorV2V3Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AggregatorV2V3Interface>;
    getContractAt(
      name: "AggregatorV3Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AggregatorV3Interface>;
    getContractAt(
      name: "MockV3Aggregator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockV3Aggregator>;
    getContractAt(
      name: "AggregatorV3Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AggregatorV3Interface>;
    getContractAt(
      name: "FundMe",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FundMe>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
