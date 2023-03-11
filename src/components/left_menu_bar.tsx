import IconButton from './icon_button'
import styles from '@/styles/components/left_menu_bar.module.css'

export default function LeftMenuBar(props:{toggle_farm_menu: () => void, toggle_build_menu: () => void}) {
    return (
        <div className={styles.left_menu}>
            <IconButton margin_top='200px' icon_src="/images/build_icon.png" toggle_logic={props.toggle_build_menu}/>
        </div>
    )
}