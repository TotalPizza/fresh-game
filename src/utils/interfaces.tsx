
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
    token: Token,
    protocol: Protocol,
}

export interface TransferContext{
    amount: string,
    token_in: Token,
    token_out: Token,
}

export interface Call {
    contractAddress: string;
    entrypoint: string;
    calldata: unknown[];
}
