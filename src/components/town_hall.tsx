import Image from 'next/image'
import styles from '@/styles/components/town_hall.module.css'

export default function TownHall() {
    return (
        <div className={styles.building}>
            <Image className={styles.town_hall} alt={"town_hall"} src='/images/town_hall.png' width={417} height={249}/>
        </div>
    )
}