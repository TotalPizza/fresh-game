import Image from 'next/image'
import styles from '@/styles/components/left_menu_bar.module.css'

export default function LeftMenuBar() {
    return (
        <div className={styles.left_menu}>
            <Image className={styles.farm_frame} alt={"frame1"} src='/frame.png' width={100} height={100}/>
            <Image className={styles.farm_frame_hovered} alt={"frame2"} src='/frame_hovered.png' width={110} height={110}/>
            <Image className={styles.farm_icon} alt={"frame3"} src='/farm_icon.png' width={92} height={92}/>

            <Image className={styles.build_frame} alt={"frame1"} src='/frame.png' width={100} height={100}/>
            <Image className={styles.build_frame_hovered} alt={"frame4"} src='/frame_hovered.png' width={110} height={110}/>
            <Image className={styles.build_icon} alt={"frame5"} src='/build_icon.png' width={92} height={92}/>
        </div>
    )
}