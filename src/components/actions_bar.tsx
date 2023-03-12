import Image from 'next/image'
import styles from '@/styles/components/actions_bar.module.css'
import {ExecuteTransactions} from '@/components/execute_button'
import { Call } from '@/utils/interfaces';
import { Instruction, Action } from '@/utils/interfaces'
import { protocol_lend_action } from '@/hooks/action_list'

export function ActionsBar(props:{instructions: Instruction[]}){

    let calls: Call = {
        contractAddress: "",
        entrypoint: "",
        calldata: [],
    }

    let actions: JSX.Element[] = [];
    props.instructions.forEach((instruction) => {
        let action_name = "";
        let lend_amount = "";
        let token = "";
        switch(instruction.action){
            case Action.Lend:
                action_name = (protocol_lend_action[instruction.context.protocol]);
                lend_amount = instruction.context.amount;
                token = instruction.context.token;
                break;
            case Action.Transfer:
                action_name = "IMPLEMENT THIS";
                break;
        }
        actions.push(
            <tr>
                <tr className={styles.action_row_one}>
                    <td className={styles.action_column}>
                        <div>{action_name}</div>
                    </td>
                </tr>
            <tr className={styles.action_row_two}>
                <td className={styles.action_column}>
                    <div>{lend_amount + ' ' + token}</div>
                </td>
            </tr>
        </tr>
            
        )
    });


    return (
        <>
            <div className={styles.actions_bar_heading}>Actions</div>
            {actions.map((data) => {
                return(
                    <table className={styles.action_table}>
                        {data}
                    </table>
                )
            })}
            <Image className={styles.actions_bar_banner} alt={"actions_bar"} src={'/images/actions_bar_banner.png'} width={238} height={900}/>   
            <ExecuteTransactions calls={[calls]}/>  
        </>
    )
}