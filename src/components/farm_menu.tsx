import Image from 'next/image'
import styles from '@/styles/components/menu.module.css'
import XButton from './x_button'

export default function FarmMenu(props: {show: boolean, toggle_farm_menu: () => void}) {
    return (
        <div className={styles.menu} hidden={!props.show}>
            <Image className={styles.menu_background} alt={"menu_background"} src='/images/menu_background.png' width={1000} height={750}/>
            <XButton margin_left={890} margin_top={10} close_action={props.toggle_farm_menu}/>
            <table className={styles.asset_table}>
                <thead className={styles.asset_table_head}>Seeds</thead>
                <tbody>
                    <tr>
                        <td>
                            <Image className={styles.asset_icon} alt={"eth"} src='/seeds/eth.png' width={80} height={80}/>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>
                            <Image className={styles.asset_icon} alt={"eth"} src='/seeds/eth.png' width={80} height={80}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}