import { useStarknetExecute } from '@starknet-react/core'
import { Call } from '@/utils/interfaces';
import Image from 'next/image'
import styles from '@/styles/components/execute_button.module.css'

export function ExecuteTransactions(props: {calls: Call[], clear_instructions: () => void}){
    console.log(props.calls);
    const { data, loading, error, reset, execute } = useStarknetExecute({
        calls: props.calls,
        metadata: [] 
    })
    if (props.calls.length == 0){
        return (
            <>
                <Image className={styles.execute_actions_disabled} alt={"execute"} src={'/images/execute_actions_disabled.png'} width={160} height={70}/>    
                <Image className={styles.execute_button_frame} alt={"execute_frame"} src={'/images/execute_actions_frame.png'} width={160} height={76}/>
                <div className={styles.execute_button_text}>Execute</div>      
            </>
        )
    }else{
        return (
            <>
                <Image className={styles.execute_button} alt={"execute"} src={'/images/execute_actions.png'} width={160} height={70}/> 
                <Image className={styles.execute_button_hover} alt={"execute_hover"} src={'/images/execute_actions_hover.png'} onClick={async() => {await execute(); props.clear_instructions();}} width={160} height={70}/>   
                <Image className={styles.execute_button_frame} alt={"execute_frame"} src={'/images/execute_actions_frame.png'} width={160} height={76}/>
                <div className={styles.execute_button_text}>Execute</div>    
            </>
        )
    }
}