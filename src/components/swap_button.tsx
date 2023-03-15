import Image from 'next/image'
import { Token } from '@/utils/interfaces'
import styles from '@/styles/components/swap_button.module.css'

export function SwapButton(props: {add_transfer_instruction: (token_in: Token, token_out: Token, amount: string) => void, trade_info: [Token, Token, string], toggle_trade_menu: () => void}){
    if (0){
        return (
            <>
                <Image className={styles.swap_actions_disabled} alt={"swap"} src={'/images/execute_actions_disabled.png'} width={160} height={70}/>    
                <Image className={styles.swap_button_frame} alt={"swap_frame"} src={'/images/execute_actions_frame.png'} width={160} height={76}/>
                <div className={styles.swap_button_text}>Exchange</div>      
            </>
        )
    }else{
        return (
            <>
                <Image className={styles.swap_button} alt={"swap"} src={'/images/execute_actions.png'} width={180} height={70}/> 
                <Image className={styles.swap_button_hover} alt={"swap_hover"} src={'/images/execute_actions_hover.png'} onClick={() => {
                    props.add_transfer_instruction(props.trade_info[0], props.trade_info[1], props.trade_info[2]);
                    props.toggle_trade_menu();
                }} width={180} height={70}/>   
                <Image className={styles.swap_button_frame} alt={"swap_frame"} src={'/images/execute_actions_frame.png'} width={180} height={76}/>
                <div className={styles.swap_button_text}>Exchange</div>    
            </>
        )
    }
}