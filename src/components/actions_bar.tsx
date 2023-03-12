import Image from 'next/image'
import styles from '@/styles/components/actions_bar.module.css'
import {ExecuteTransactions} from '@/components/execute_button'
import { Call } from '@/utils/interfaces';

export function ActionsBar(){

    let calls: Call = {
        contractAddress: "",
        entrypoint: "",
        calldata: [],
    }

    return (
        <>
            <div className={styles.actions_bar_heading}>Actions</div>
            <Image className={styles.actions_bar_banner} alt={"actions_bar"} src={'/images/actions_bar_banner.png'} width={238} height={900}/>   
            <ExecuteTransactions calls={[calls]}/>  
        </>
    )
}