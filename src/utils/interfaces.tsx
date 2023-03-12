
export interface Instruction{
    action: Action,
    context: any,
}

export enum Action{
    Lend,
    Unlend,
    Transfer,
}

export enum Protocol{
    Nostra,
    Yagi,
}

export enum Token{
    ETH,
    USDC,
}

export interface LendContext{
    amount: string,
    token: string,
    protocol: Protocol,
}

export interface Call {
    contractAddress: string;
    entrypoint: string;
    calldata: unknown[];
}
