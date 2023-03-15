import Image from 'next/image'
import styles from '@/styles/components/trade_menu.module.css'
import XButton from './x_button'

export default function BuildMenu(props: {show: boolean, toggle_trade_menu: () => void}) {    
    return (
        <div className={styles.menu} hidden={!props.show}>
            <Image className={styles.menu_background} priority={true} alt={"menu_background"} src='/images/menu_background.png' width={1000} height={750}/>
            <XButton margin_left={750} margin_top={-700} close_action={props.toggle_trade_menu}/>
            <div className={styles.building_heading}>Market Place</div>
            <Image className={styles.asset_icon_1} priority={true} alt={"eth_Seed"} src={"/seeds/eth.png"} width={80} height={80}/>
            <Image className={styles.asset_icon_2} priority={true} alt={"usdc_Seed"} src={"/seeds/usdc.png"} width={80} height={80}/>
            <Image className={styles.value_filler_1} priority={true} alt={"eth_value_Seed"} src={"/images/value_frame_filler.png"} width={300} height={70}/>
            <Image className={styles.value_filler_2} priority={true} alt={"usdc_value_Seed"} src={"/images/value_frame_filler.png"} width={300} height={70}/>
            <Image className={styles.value_filler_frame_1} priority={true} alt={"eth_value_frame"} src={"/images/value_frame.png"} width={300} height={70}/>
            <Image className={styles.value_filler_frame_2} priority={true} alt={"usdc_value_frame"} src={"/images/value_frame.png"} width={300} height={70}/>
            <Image className={styles.switch_arrows} priority={true} alt={"switch_arrows"} src={"/images/switch_arrows.png"} width={51} height={95}/>
        </div>
    )
}