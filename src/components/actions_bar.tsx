import Image from 'next/image'
import styles from '@/styles/components/actions_bar.module.css'
import {ExecuteTransactions} from '@/components/execute_button'
import { Call } from '@/utils/interfaces';
import { Instruction, Action } from '@/utils/interfaces'
import { protocol_lend_action } from '@/hooks/action_list'
import { token_name } from '@/hooks/token_list'
import { InstructionToTX } from '@/hooks/instruction_to_tx'

interface ActionDisplay{
    action_info: string,
    border: number,
}

export function ActionsBar(props:{account_address: string|undefined, instructions: Instruction[]}){

    let actions: ActionDisplay[] = [];
    props.instructions.forEach((instruction) => {
        switch(instruction.action){
            case Action.Lend:
                actions.push({
                    action_info: protocol_lend_action[instruction.context.protocol], border: 0
                }, 
                {
                    action_info: instruction.context.amount + ' ' + token_name[instruction.context.token], border: 4
                })
                break;
            case Action.Transfer:
                actions.push({
                    action_info: "Implement Transfer!!!", border: 0
                }, 
                {
                    action_info: instruction.context.amount + ' ' + instruction.context.token, border: 4
                })
                break;
        }
    });

    let calls: Call[] = [];
    if (props.account_address != undefined){
        calls = InstructionToTX(props.account_address, props.instructions);
    }else{
        calls = [];
    }
    return (
        <>
            <div className={styles.actions_bar_heading}>Actions</div>
            <table className={styles.action_table}>
                <tbody className={styles.action_tbody}>
                    {actions.map((data, index) => {
                        return(
                            <tr key={index} style={{borderBottomStyle: 'solid', borderBottomWidth: data.border+'px', borderBottomColor: 'rgba(224, 197, 139, 0.555)'}}>          
                                <td className={styles.action_column}>
                                    <div>{data.action_info}</div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Image className={styles.actions_bar_banner} alt={"actions_bar"} src={'/images/actions_bar_banner.png'} width={238} height={900}/>   
            <ExecuteTransactions calls={calls}/>  
        </>
    )
}