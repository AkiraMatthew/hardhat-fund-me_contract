import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface AggregatorInterfaceInterface extends utils.Interface {
    contractName: "AggregatorInterface";
    functions: {
        "getAnswer(uint256)": FunctionFragment;
        "getTimestamp(uint256)": FunctionFragment;
        "latestAnswer()": FunctionFragment;
        "latestRound()": FunctionFragment;
        "latestTimestamp()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getAnswer", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getTimestamp", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "latestAnswer", values?: undefined): string;
    encodeFunctionData(functionFragment: "latestRound", values?: undefined): string;
    encodeFunctionData(functionFragment: "latestTimestamp", values?: undefined): string;
    decodeFunctionResult(functionFragment: "getAnswer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTimestamp", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "latestAnswer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "latestRound", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "latestTimestamp", data: BytesLike): Result;
    events: {
        "AnswerUpdated(int256,uint256,uint256)": EventFragment;
        "NewRound(uint256,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AnswerUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewRound"): EventFragment;
}
export declare type AnswerUpdatedEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber
], {
    current: BigNumber;
    roundId: BigNumber;
    updatedAt: BigNumber;
}>;
export declare type AnswerUpdatedEventFilter = TypedEventFilter<AnswerUpdatedEvent>;
export declare type NewRoundEvent = TypedEvent<[
    BigNumber,
    string,
    BigNumber
], {
    roundId: BigNumber;
    startedBy: string;
    startedAt: BigNumber;
}>;
export declare type NewRoundEventFilter = TypedEventFilter<NewRoundEvent>;
export interface AggregatorInterface extends BaseContract {
    contractName: "AggregatorInterface";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AggregatorInterfaceInterface;
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
        getAnswer(roundId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        getTimestamp(roundId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        latestAnswer(overrides?: CallOverrides): Promise<[BigNumber]>;
        latestRound(overrides?: CallOverrides): Promise<[BigNumber]>;
        latestTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;
    };
    getAnswer(roundId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    getTimestamp(roundId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;
    latestRound(overrides?: CallOverrides): Promise<BigNumber>;
    latestTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        getAnswer(roundId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getTimestamp(roundId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;
        latestRound(overrides?: CallOverrides): Promise<BigNumber>;
        latestTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {
        "AnswerUpdated(int256,uint256,uint256)"(current?: BigNumberish | null, roundId?: BigNumberish | null, updatedAt?: null): AnswerUpdatedEventFilter;
        AnswerUpdated(current?: BigNumberish | null, roundId?: BigNumberish | null, updatedAt?: null): AnswerUpdatedEventFilter;
        "NewRound(uint256,address,uint256)"(roundId?: BigNumberish | null, startedBy?: string | null, startedAt?: null): NewRoundEventFilter;
        NewRound(roundId?: BigNumberish | null, startedBy?: string | null, startedAt?: null): NewRoundEventFilter;
    };
    estimateGas: {
        getAnswer(roundId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getTimestamp(roundId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;
        latestRound(overrides?: CallOverrides): Promise<BigNumber>;
        latestTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getAnswer(roundId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTimestamp(roundId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        latestAnswer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        latestRound(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        latestTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
