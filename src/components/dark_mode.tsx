import Image from 'next/image'
import styles from '@/styles/components/dark_mode.module.css'

export default function DarkMode(props:{dark_mode: boolean, toggle_dark_mode: () => void}) {
    let icon_src;
    let icon_src_hover;
    if (props.dark_mode) {
        icon_src = '/light_mode.png';
        icon_src_hover = '/light_mode_hover.png';
    } else{
        icon_src = '/dark_mode.png'
        icon_src_hover = '/dark_mode_hover.png';
    }
    return (
        <>
            <Image className={styles.icon} alt={"darm_mode"} src={icon_src} width={45} height={45}/>
            <Image className={styles.icon_hover} alt={"darm_mode"} src={icon_src_hover} onClick={props.toggle_dark_mode} width={45} height={45}/>
        </>
    )
}