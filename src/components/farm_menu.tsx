import Image from 'next/image'
import styles from '@/styles/components/menu.module.css'
import XButton from './x_button'

export default function FarmMenu(props: {show: boolean, toggle_farm_menu: () => void}) {
    return (
        <div className={styles.menu} hidden={!props.show}>
            <Image className={styles.menu_background} alt={"menu_background"} src='/images/menu_background.png' width={1000} height={750}/>
            <XButton margin_left={890} margin_top={10} close_action={props.toggle_farm_menu}/>
        </div>
    )
}