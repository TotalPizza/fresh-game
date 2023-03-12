import Image from 'next/image'
import styles from '@/styles/components/actions_bar.module.css'
import {ExecuteTransactions} from '@/components/execute_button'
import { Call } from '@/utils/interfaces';
import { Instruction, Action } from '@/utils/interfaces'
import { protocol_lend_action } from '@/hooks/action_list'

interface ActionDisplay{
    action_info: string,
    border: number,
}

export function ActionsBar(props:{instructions: Instruction[]}){

    let calls: Call = {
        contractAddress: "",
        entrypoint: "",
        calldata: [],
    }

    let actions: ActionDisplay[] = [];
    props.instructions.forEach((instruction) => {
        switch(instruction.action){
            case Action.Lend:
                actions.push({
                    action_info: protocol_lend_action[instruction.context.protocol], border: 0
                }, 
                {
                    action_info: instruction.context.amount + ' ' + instruction.context.token, border: 4
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
            <ExecuteTransactions calls={[calls]}/>  
        </>
    )
}