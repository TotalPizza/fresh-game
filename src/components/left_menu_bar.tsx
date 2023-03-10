import IconButton from './icon_button'
import styles from '@/styles/components/left_menu_bar.module.css'

export default function LeftMenuBar(props:{toggle_farm_menu: () => void, toggle_build_menu: () => void}) {
    return (
        <div className={styles.left_menu}>
            <IconButton margin_top='0px' icon_src="/farm_icon.png" toggle_logic={props.toggle_farm_menu}/>
            <IconButton margin_top='100px' icon_src="/town_hall_icon.png" toggle_logic={props.toggle_build_menu}/>
            <IconButton margin_top='200px' icon_src="/build_icon.png" toggle_logic={props.toggle_build_menu}/>
            <IconButton margin_top='300px' icon_src="/trade_icon.png" toggle_logic={props.toggle_build_menu}/>
        </div>
    )
}