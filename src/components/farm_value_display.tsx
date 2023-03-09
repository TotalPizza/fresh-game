import Image from 'next/image'
import styles from '@/styles/components/farm_value_display.module.css'

export default function FarmValueDisplay() {
    return (
        <div className={styles.usd_value_display}>
            <Image className={styles.usd_frame} alt={"frame"} src='/usd_frame.png' width={35} height={35}/>
            <Image className={styles.usd_icon} alt={"usd_icon"} src='/usd_icon.png' width={30} height={30}/>
            <Image className={styles.value_frame} alt={"value_frame"} src='/value_frame.png' width={160} height={40}/>
            <Image className={styles.value_frame_filler} alt={"value_frame_filler"} src='/value_frame_filler.png' width={160} height={40}/>
            <div className={styles.value_text}>100.00</div>
        </div>
    )
}