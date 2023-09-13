import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface FundMeInterface extends utils.Interface {
    contractName: "FundMe";
    functions: {
        "MINIMUM_USD()": FunctionFragment;
        "addressToAmountFunded(address)": FunctionFragment;
        "fund()": FunctionFragment;
        "funders(uint256)": FunctionFragment;
        "i_owner()": FunctionFragment;
        "priceFeed()": FunctionFragment;
        "withdraw()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "MINIMUM_USD", values?: undefined): string;
    encodeFunctionData(functionFragment: "addressToAmountFunded", values: [string]): string;
    encodeFunctionData(functionFragment: "fund", values?: undefined): string;
    encodeFunctionData(functionFragment: "funders", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "i_owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "priceFeed", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
    decodeFunctionResult(functionFragment: "MINIMUM_USD", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addressToAmountFunded", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fund", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "funders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "i_owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "priceFeed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    events: {};
}
export interface FundMe extends BaseContract {
    contractName: "FundMe";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: FundMeInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        MINIMUM_USD(overrides?: CallOverrides): Promise<[BigNumber]>;
        addressToAmountFunded(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        fund(overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        funders(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        i_owner(overrides?: CallOverrides): Promise<[string]>;
        priceFeed(overrides?: CallOverrides): Promise<[string]>;
        withdraw(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    MINIMUM_USD(overrides?: CallOverrides): Promise<BigNumber>;
    addressToAmountFunded(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    fund(overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    funders(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    i_owner(overrides?: CallOverrides): Promise<string>;
    priceFeed(overrides?: CallOverrides): Promise<string>;
    withdraw(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        MINIMUM_USD(overrides?: CallOverrides): Promise<BigNumber>;
        addressToAmountFunded(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        fund(overrides?: CallOverrides): Promise<void>;
        funders(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        i_owner(overrides?: CallOverrides): Promise<string>;
        priceFeed(overrides?: CallOverrides): Promise<string>;
        withdraw(overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        MINIMUM_USD(overrides?: CallOverrides): Promise<BigNumber>;
        addressToAmountFunded(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        fund(overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        funders(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        i_owner(overrides?: CallOverrides): Promise<BigNumber>;
        priceFeed(overrides?: CallOverrides): Promise<BigNumber>;
        withdraw(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        MINIMUM_USD(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addressToAmountFunded(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        fund(overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        funders(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        i_owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        priceFeed(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        withdraw(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
