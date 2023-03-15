import Image from 'next/image'
import styles from '@/styles/components/buildings.module.css'
import {BuildType} from '@/components/cursor_item'
import {BuildingPlacement} from '@/pages/index'

export default function ConstructedBuildings(props: {buildings: BuildingPlacement[]}) {
    return(
        <>
            {props.buildings.map((building, index) => {
                let z_index = 0;
                let z_index_highlight = 5;
                let highlight_width = 0;
                let highlight_height = 0;
                let highlight_src = "";
                let highlight_top = 0;
                let highlight_left = 0;
                if (building.building == BuildType.Field){
                    z_index = 4;        
                    highlight_top = building.y;
                    highlight_left = building.x - 6;
                    highlight_width = building.width + 12;
                    highlight_height = building.height + 2;
                    highlight_src = "/images/field_highlight.png";
                }
                if (building.building == BuildType.TownHall){
                    z_index = 5;
                    highlight_top = building.y + 96;
                    highlight_left = building.x;
                    highlight_width = building.width;
                    highlight_height = building.height - 32;
                    highlight_src = "/images/town_hall_highlight.png";
                }
                if (building.building == BuildType.Mill){
                    z_index = 7;
                    z_index_highlight = 6;
                    highlight_top = building.y + 55;
                    highlight_left = building.x + 45;
                    highlight_width = building.width - 50;
                    highlight_height = building.height -50;
                    highlight_src = "/images/mill_highlight.png";
                }
                if (building.building == BuildType.Market){
                    z_index = 5;
                    highlight_top = building.y + 10;
                    highlight_left = building.x + 22;
                    highlight_width = building.width;
                    highlight_height = building.height;
                    highlight_src = "/images/market_highlight.png";
                }
                return(
                    <>
                        <Image className={styles.highlight} onClick={()=>building.click_event()} key={index + 1000} alt={building.src} style={{top: highlight_top, left: highlight_left, zIndex: z_index_highlight}} src={highlight_src} width={highlight_width} height={highlight_height}/>
                        <Image className={styles.buildings} key={index} alt={building.src} style={{top: building.y, left: building.x, zIndex: z_index}} src={building.src} width={building.width} height={building.height}/>
                    </>
                );
            })}
        </>
    );
}