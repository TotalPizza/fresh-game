import Image from 'next/image'
import styles from '@/styles/components/build_button.module.css'

export default function BuildButton(props:{toggle_logic: () => void}) {
    return (
        <div className={styles.button} onClick={props.toggle_logic}>
            <Image className={styles.icon} alt={"build_icon"} src={"/images/build_icon.png"} width={92} height={92}/>
            <Image className={styles.icon_highlight} alt={"build_highlight"} src={"/images/build_icon_hover.png"} width={92} height={92}/>
        </div>
    )
}