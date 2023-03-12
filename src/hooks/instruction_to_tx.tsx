import { Instruction, Action, Protocol, LendContext } from '@/utils/interfaces'
import { protocol_addresses, protocol_lend_entry_points } from '@/hooks/protocol_list'
import { Call } from '@/utils/interfaces';

export function InstructionToTX(account_address: string, instructions: Instruction[]): Call[]{
    let calls: Call[] = [];

    instructions.forEach((instruction) => {
        switch(instruction.action){
            case Action.Lend:	
                calls.push({
                    contractAddress: instruction.context.token,
                    entrypoint: protocol_lend_entry_points[instruction.context.protocol],
                    calldata: [protocol_addresses[instruction.context.protocol],instruction.context.amount]
                })
                calls.push(build_lend_transaction(account_address,instruction.context));
            case Action.Unlend:
                console.log("Unlend");
        }
    });
    return calls;
} 

function build_lend_transaction(account_address: string, lendong_context: LendContext): Call{
    switch(lendong_context.protocol){
        case Protocol.Nostra:
            return {
                contractAddress:protocol_addresses[Protocol.Nostra],
                entrypoint:protocol_lend_entry_points[Protocol.Nostra],
                calldata:[account_address,lendong_context.amount]
            }
    }
    return {contractAddress:"",entrypoint:"",calldata:[]}
}