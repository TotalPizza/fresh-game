import Image from 'next/image'
import styles from '@/styles/components/buildings.module.css'
import {BuildType} from '@/components/cursor_item'
import {BuildingPlacement} from '@/pages/index'

export default function ConstructedBuildings(props: {buildings: BuildingPlacement[]}) {
    return(
        <>
            {props.buildings.map((building) => {
                let z_index = 5;
                if (building.building == BuildType.Field){
                    z_index = 4;        
                }
                return(
                    <Image className={styles.buildings} onClick={()=>building.click_event()} key={building.x + building.y} alt={building.src} style={{top: building.y, left: building.x, zIndex: z_index}} src={building.src} width={building.width} height={building.height}/>
                );
            })}
        </>
    );
}