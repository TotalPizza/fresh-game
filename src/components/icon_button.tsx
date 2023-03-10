import Image from 'next/image'
import styles from '@/styles/components/icon_button.module.css'

export default function IconButton(props:{ icon_src: string, margin_top: string,toggle_logic: () => void}) {
    return (
        <div className={styles.button} style={{marginTop: props.margin_top}} onClick={props.toggle_logic}>
            <Image className={styles.frame} alt={"frame1"} src='/frame.png' width={100} height={100}/>
            <Image className={styles.frame_hovered} alt={"frame2"} src='/frame_hovered.png' width={110} height={110}/>
            <Image className={styles.icon} alt={"frame3"} src={props.icon_src} width={92} height={92}/>
        </div>
    )
}