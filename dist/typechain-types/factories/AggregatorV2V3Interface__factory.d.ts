import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { AggregatorV2V3Interface, AggregatorV2V3InterfaceInterface } from "../AggregatorV2V3Interface";
export declare class AggregatorV2V3Interface__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): AggregatorV2V3InterfaceInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AggregatorV2V3Interface;
}
