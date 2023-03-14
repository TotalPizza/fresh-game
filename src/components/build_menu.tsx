import Image from 'next/image'
import styles from '@/styles/components/build_menu.module.css'
import XButton from './x_button'
import { BuildItem, BuildType } from '@/components/cursor_item'
import BuildingIcon from '@/components/building_icon'

export default function BuildMenu(props: {building_status: boolean[],show: boolean, toggle_build_menu: () => void, placing_building: (item: BuildItem) => void}) {    
    return (
        <div className={styles.menu} hidden={!props.show}>
            <Image className={styles.menu_background} priority={true} alt={"menu_background"} src='/images/menu_background.png' width={1000} height={750}/>
            <XButton margin_left={750} margin_top={-700} close_action={props.toggle_build_menu}/>
            <div className={styles.building_heading}>Buildings</div>

            <BuildingIcon position={{top: -150, left: -320}} icon_src={"/images/town_hall_icon"} building={{src: '/images/town_hall_white.png', width: 400, height: 250, building: BuildType.TownHall}} building_status={props.building_status[0]} placing_building={props.placing_building}/>
            <BuildingIcon position={{top: -150, left: -100}} icon_src={"/images/nostra_mill_icon"} building={{src: '/images/mill_white.png', width: 300, height: 270, building: BuildType.Mill}} building_status={props.building_status[1]} placing_building={props.placing_building}/>
        </div>
    )
}