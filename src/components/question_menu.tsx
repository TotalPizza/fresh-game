import Image from 'next/image'
import styles from '@/styles/components/question_menu.module.css'
import XButton from './x_button'

export default function QuestionMenu(props: {show: boolean, toggle_question_menu: () => void}) {    
    return (
        <div className={styles.menu} hidden={!props.show}>
            <Image className={styles.menu_background} priority={true} alt={"menu_background"} src='/images/menu_background.png' width={1000} height={750}/>
            <XButton margin_left={750} margin_top={-700} close_action={props.toggle_question_menu}/>
            <div className={styles.heading}>How To Do Stuff</div>

            <div className={styles.connect}>Make sure you have your wallet connected</div>
            <div className={styles.network}>Make sure you have the mainnet network selected (not testnet)</div>

            <Image className={styles.town_hall_icon_frame} priority={true} alt={"town_hall_icon_frame"} src='/images/frame.png' width={100} height={100}/>
            <Image className={styles.town_hall_icon} priority={true} alt={"mill_icon"} src={"/images/town_hall_icon.png"} width={100} height={100}/>
            <div className={styles.town_hall_text}>Displays your token balances (Seeds)</div>
            
            <Image className={styles.mill_icon_frame} priority={true} alt={"town_hall_icon_frame"} src='/images/frame.png' width={100} height={100}/>
            <Image className={styles.mill_icon} priority={true} alt={"mill_icon"} src={"/images/nostra_mill_icon.png"} width={100} height={100}/>
            <div className={styles.mill_text}>Allows you to deposit assets into Nostra lending</div>
            <div className={styles.mill_text_2}>by placing fields</div>
            
            <Image className={styles.trade_icon_frame} priority={true} alt={"town_hall_icon_frame"} src='/images/frame.png' width={100} height={100}/>
            <Image className={styles.trade_icon} priority={true} alt={"mill_icon"} src={"/images/trade_icon.png"} width={100} height={100}/>
            <div className={styles.trade_text}>Enables the exchange between assets (Seeds)</div>
                
        </div>
    )
}