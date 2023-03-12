import { Instruction, Action, Protocol, LendContext } from '@/utils/interfaces'
import { protocol_lend_entry_points, protocols } from '@/hooks/protocol_list'
import { token_addresses, token_decimals } from '@/hooks/token_list'
import { Call } from '@/utils/interfaces';
import { ethers } from 'ethers';

export function InstructionToTX(account_address: string, instructions: Instruction[]): Call[]{
    let calls: Call[] = [];

    instructions.forEach((instruction) => {
        switch(instruction.action){
            case Action.Lend:	
                console.log(ethers.parseUnits(instruction.context.amount,token_decimals[instruction.context.token]).toString());
                calls.push({
                    contractAddress: token_addresses[instruction.context.token],
                    entrypoint: "approve",
                    calldata: [protocols[instruction.context.token].addresses[instruction.context.protocol],ethers.parseUnits(instruction.context.amount,token_decimals[instruction.context.token]).toString(),"0"]
                })
                calls.push(build_lend_transaction(account_address,instruction.context));
            case Action.Unlend:
                console.log("Unlend");
        }
    });
    return calls;
} 

function build_lend_transaction(account_address: string, lending_context: LendContext): Call{
    switch(lending_context.protocol){
        case Protocol.Nostra:
            return {
                contractAddress:protocols[lending_context.token].addresses[Protocol.Nostra],
                entrypoint:protocol_lend_entry_points[Protocol.Nostra],
                calldata:[account_address,ethers.parseUnits(lending_context.amount,token_decimals[lending_context.token]).toString(),"0"]
            }
    }
    return {contractAddress:"",entrypoint:"",calldata:[]}
}