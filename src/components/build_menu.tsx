import Image from 'next/image'
import styles from '@/styles/components/build_menu.module.css'
import XButton from './x_button'
import { BuildItem, BuildType } from '@/components/cursor_item'

export default function BuildMenu(props: {building_status: boolean[],show: boolean, toggle_build_menu: () => void, placing_building: (item: BuildItem) => void}) {    
    return (
        <div className={styles.menu} hidden={!props.show}>
            <Image className={styles.menu_background} alt={"menu_background"} src='/images/menu_background.png' width={700} height={750}/>
            <XButton margin_left={590} margin_top={10} close_action={props.toggle_build_menu}/>
            <div className={styles.building_heading}>Buildings</div>
            <Image className={styles.building_icon_frame} alt={"mill_icon_frame"} src='/images/frame.png' width={100} height={100}/>
            <Image className={styles.building_icon_frame_hover} onClick={()=>{
                    // Do Nothing if Mill is already placed
                    if(props.building_status[0]){
                        return;
                    }else{
                        props.placing_building({building: BuildType.Mill, src:'/images/mill_white.png', width: 300, height: 300})
                    };
                }}  alt={"mill_icon_frame_hover"} src='/images/frame_hovered.png' width={109} height={109}/>
            <Image className={styles.building_icon} alt={"mill_icon"} src='/images/nostra_mill_icon.png' width={100} height={100}/>
            <Image className={styles.building_icon_disabled} style={{opacity: +props.building_status[0]}} alt={"mill_icon_disabled"} src='/images/nostra_mill_icon_disabled.png' width={100} height={100}/>
        </div>
    )
}