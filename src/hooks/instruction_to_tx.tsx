import { Instruction, Action, Protocol, LendContext } from '@/utils/interfaces'
import { protocol_lend_entry_points, protocols } from '@/hooks/protocol_list'
import { token_addresses, token_decimals } from '@/hooks/token_list'
import { Call } from '@/utils/interfaces';
import { ethers } from 'ethers';
import {contracts} from '@/hooks/constants'

export function InstructionToTX(account_address: string, instructions: Instruction[]): Call[]{
    let calls: Call[] = [];

    instructions.forEach((instruction) => {
        if (instruction.action == Action.Lend){
            calls.push({
                contractAddress: token_addresses[instruction.context.token],
                entrypoint: "approve",
                calldata: [protocols[instruction.context.token].addresses[instruction.context.protocol],ethers.parseUnits(instruction.context.amount,token_decimals[instruction.context.token]).toString(),"0"]
            })
            calls.push(build_lend_transaction(account_address,instruction.context));
        }else{
            calls.push({
                contractAddress: token_addresses[instruction.context.token_in],
                entrypoint: "approve",
                calldata: [contracts[0].address,ethers.parseUnits(instruction.context.amount,token_decimals[instruction.context.token_in]).toString(),"0"]
            }),
            calls.push({
                contractAddress: contracts[0].address,
                entrypoint: "swap_exact_tokens_for_tokens",
                calldata: [ethers.parseUnits(instruction.context.amount,token_decimals[instruction.context.token_in]).toString(),"0", "0","0", token_addresses[instruction.context.token_in], token_addresses[instruction.context.token_out], account_address]
            });
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