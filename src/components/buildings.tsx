import Image from 'next/image'
import styles from '@/styles/components/buildings.module.css'
import {BuildingPlacement} from '@/pages/index'

export default function ConstructedBuildings(props: {buildings: BuildingPlacement[]}) {
    return(
        <>
            {props.buildings.map((building) => {
                return(
                    <Image className={styles.buildings} onClick={()=>building.click_event()} key={building.x + building.y} alt={building.src} style={{top: building.y, left: building.x}} src={building.src} width={building.width} height={building.height}/>
                );
            })}
        </>
    );
}