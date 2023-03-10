import Image from 'next/image'
import styles from '@/styles/components/wallet_button.module.css'

export default function WalletButton() {
    return (
        <div className={styles.button}>
            <Image className={styles.frame} alt={"wallet_frame"} src='/wallet_frame.png' width={150} height={150}/>
            <Image className={styles.glas} alt={"wallet_glas"} src='/wallet_glas.png' width={145} height={145}/>
            <Image className={styles.edge} alt={"wallet_edge"} src='/wallet_edge.png' width={145} height={145}/>
            <Image className={styles.logo} alt={"wallet_logo"} src='/logos/argent_icon.png' width={145} height={145}/>
            <Image className={styles.logo_hover} alt={"wallet_logo_hover"} src='/logos/argent_icon_hover.png' width={145} height={145}/>
        </div>
    )
}