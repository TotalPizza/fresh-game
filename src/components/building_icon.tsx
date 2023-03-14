import Image from 'next/image'
import styles from '@/styles/components/build_menu.module.css'
import { BuildItem } from '@/components/cursor_item'

export default function BuildIcons(props: {position: {top: number, left: number}, icon_src: string, building: BuildItem, building_status: boolean, placing_building: (item: BuildItem) => void}) {    
    return (
            <div style={{position: "relative", top: props.position.top, left: props.position.left}}>
                <Image className={styles.building_icon_frame} priority={true} alt={"town_hall_icon_frame"} src='/images/frame.png' width={100} height={100}/>
                <Image className={styles.building_icon_frame_hover} priority={true} onClick={()=>{
                        // Do Nothing if Mill is already placed
                        if(props.building_status){
                            return;
                        }else{
                            props.placing_building(props.building)
                        };
                    }}  alt={"town_hall_icon_frame_hover"} src='/images/frame_hovered.png' width={109} height={109}/>
                <Image className={styles.building_icon} priority={true} alt={"mill_icon"} src={props.icon_src+".png"} width={100} height={100}/>
                <Image className={styles.building_icon_disabled} priority={true} style={{opacity: +props.building_status}} alt={"town_hall_icon_disabled"} src={props.icon_src + "_disabled.png"} width={100} height={100}/>
            </div>
    )
}