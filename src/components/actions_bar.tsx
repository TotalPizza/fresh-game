import Image from 'next/image'
import styles from '@/styles/components/actions_bar.module.css'
import {ExecuteTransactions} from '@/components/execute_button'
import { Call } from '@/utils/interfaces';
import { Instruction, Action } from '@/utils/interfaces'
import { protocol_lend_action } from '@/hooks/action_list'

interface ActionDisplay{
    action_name: string,
    amount: string,
    token: string,
}

export function ActionsBar(props:{instructions: Instruction[]}){

    let calls: Call = {
        contractAddress: "",
        entrypoint: "",
        calldata: [],
    }

    let actions: string[] = [];
    props.instructions.forEach((instruction) => {
        console.log("INSTRUCTION");
        switch(instruction.action){
            case Action.Lend:
                actions.push(
                    protocol_lend_action[instruction.context.protocol], 
                    instruction.context.amount + ' ' + instruction.context.token
                )
                break;
            case Action.Transfer:
                actions.push(
                    "IMPLEMENT TRANSFER", 
                    instruction.context.amount + ' ' + instruction.context.token
                )
                break;
        }
    });

    return (
        <>
            <div className={styles.actions_bar_heading}>Actions</div>
            <table className={styles.action_table}>
                <tbody className={styles.action_tbody}>
                    {actions.map((data, index) => {
                        return(
                            <tr className={styles.action_row_two}>          
                                <td className={styles.action_column}>
                                    <div>{data}</div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Image className={styles.actions_bar_banner} alt={"actions_bar"} src={'/images/actions_bar_banner.png'} width={238} height={900}/>   
            <ExecuteTransactions calls={[calls]}/>  
        </>
    )
}