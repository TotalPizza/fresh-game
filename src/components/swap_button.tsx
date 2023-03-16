import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Token } from '@/utils/interfaces'
import styles from '@/styles/components/swap_button.module.css'
import Modal from 'react-bootstrap/Modal'

export function SwapButton(props: {add_transfer_instruction: (token_in: Token, token_out: Token, amount: string) => void, trade_info: [Token, Token, string], toggle_trade_menu: () => void}){
    const [is_swap_disabled, set_is_swap_disabled] = useState(false);
    const [modalShow, setModalShow] = useState(false)
    
    useEffect(() => {
        if ((props.trade_info[0] == Token.USDC && parseFloat(props.trade_info[2]) > 10) || (props.trade_info[0] == Token.ETH && parseFloat(props.trade_info[2]) >= 0.01)){
            if (!is_swap_disabled){
                set_is_swap_disabled(true);
            }
        }else{
            if (is_swap_disabled){
                set_is_swap_disabled(false);
            }
        }
    }, [props.trade_info])

    return (
        <>
            <Image className={styles.swap_button} alt={"swap"} src={'/images/execute_actions.png'} width={180} height={70}/> 
            <Image className={styles.swap_button_hover} alt={"swap_hover"} src={'/images/execute_actions_hover.png'} onClick={() => {
                if (!is_swap_disabled){
                    props.add_transfer_instruction(props.trade_info[0], props.trade_info[1], props.trade_info[2]);
                    props.toggle_trade_menu();
                }else{
                    setModalShow(true);
                }
            }} width={180} height={70}/>   
            <Image className={styles.swap_button_frame} alt={"swap_frame"} src={'/images/execute_actions_frame.png'} width={180} height={76}/>
            <div className={styles.swap_button_text}>Exchange</div>
            <Modal show={modalShow} onHide={()=>setModalShow(false)}>
                <Modal.Body>
                    Bro... this a playground. Why would you trade that much?
                </Modal.Body>
            </Modal>
        </>
    )
    
}