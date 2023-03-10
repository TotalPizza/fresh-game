import Image from 'next/image'
import styles from '@/styles/components/x_button.module.css'

export default function XButton(props: {margin_left: number, margin_top: number, close_action: () => void}) {
    return (
        <div className={styles.x_button} style={{ marginTop: props.margin_top+'px', marginLeft: props.margin_left+'px'}} onClick={props.close_action}>
            <Image className={styles.x_button_filler} alt={"x_button"} src='/images/x_button.png' width={97} height={97}/>
            <Image className={styles.x_button_filler_hovered} alt={"x_button_hover"} src='/images/x_button_hover.png' width={97} height={97}/>
            <Image className={styles.x_symbol} alt={"x_symbol"} src='/images/x_symbol.png' width={70} height={70}/>
            <Image className={styles.x_button_frame} alt={"x_button_frame"} src='/images/x_button_frame.png' width={100} height={100}/>
        </div>
    )
}