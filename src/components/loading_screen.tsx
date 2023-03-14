import Image from 'next/image'
import styles from '@/styles/components/loading_screen.module.css'

export default function LoadingScreen(){
    return(        
        <body style={{backgroundColor: "black"}}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>
                <h1 className={styles.text}>Loading Your Base</h1>
                <Image priority={true} src="/images/pog_pepe.png" alt='pog_loading' width={100} height={100}/>
            </div>
        </body>
    )

}
