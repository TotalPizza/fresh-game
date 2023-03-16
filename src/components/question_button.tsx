import Image from 'next/image'
import styles from '@/styles/components/question_button.module.css'

export default function QuestionButton(props:{toggle_logic: () => void}) {
    return (
        <div className={styles.button} onClick={props.toggle_logic}>
            <Image className={styles.icon} alt={"question_icon"} src={"/images/question_icon.png"} width={92} height={92}/>
            <Image className={styles.icon_highlight} alt={"question_highlight"} src={"/images/question_icon_hover.png"} width={92} height={92}/>
        </div>
    )
}