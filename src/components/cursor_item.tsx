import Image from 'next/image'
import {useEffect, useState} from 'react'
import { BuildingPlacement } from '@/pages/index'
import styles from '@/styles/components/cursor_item.module.css'

export enum BuildType{
    None,
    Mill,
    Field,
    TownHall,
    Market,
}

export interface BuildItem{
    building: BuildType,
    src: string;
    width: number;
    height: number;
}

export default function CursorItem(props: {item_image: BuildItem, place_building: (y: number, x: number) => void, buildings: BuildingPlacement[], cancel_building_placement:()=>void}) {
    const [mousePos, setMousePos] = useState({x: 0, y: 0});

    // Track cursor cooridinates and prevent left click menu from popping up
    useEffect(() => {
        const handleMouseMove = (event:any) => {
          setMousePos({ x: event.clientX, y: event.clientY });
        };
        const handleContextMenu = (event:any) => {
            event.preventDefault()
        }
        
        document.addEventListener("contextmenu", handleContextMenu)
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
        document.removeEventListener("contextmenu", handleContextMenu)
          window.removeEventListener(
            'mousemove',
            handleMouseMove
          );
        };
    }, []);

    // Check if the cursor is over any of the buildings
    const is_overlapping_buildings = IsOverlappingWithExistingBuilding(mousePos.y, mousePos.x, props.buildings);
    if (props.item_image.src == ''){
        return(
            <></>
        );
    }else{
        // the top and left placement of the image should always snap to 25 pixel increments
        let y = (mousePos.y - props.item_image.height/2);
        let x = (mousePos.x - props.item_image.width/2);
        if (y % 25 > 12){
            y = y - y % 25 + 25;
        }else{
            y = y - y % 25;
        }
        if (x % 25 > 12){
            x = x - x % 25 + 25;
        }else{
            x = x - x % 25;
        }


        // TODO: We are doing a lot of string manipulation here....probably want to change this
        return(
            <>
                <Image className={styles.curso_image} priority={true} alt={'cursor_image'} style={{top: y, left: x, opacity: 0.7}} src={props.item_image.src} width={props.item_image.width} height={props.item_image.height}/>
                <Image className={styles.curso_image} priority={true} onClick={() => {
                    if(is_overlapping_buildings){
                        return;
                    };
                    props.place_building(y,x);
                }} onContextMenu={() => {
                    props.cancel_building_placement();
                }} alt={'cursor_image_red'} style={{top: y, left: x, opacity:(+is_overlapping_buildings-0.3)}} src={props.item_image.src.substring(0, props.item_image.src.length-9)+'red.png'} width={props.item_image.width} height={props.item_image.height}/>
            </>
        );
    }     
}

function IsOverlappingWithExistingBuilding(y: number, x: number, building: BuildingPlacement[]):boolean{
    for(let i = 0; i < building.length; i++){
        if(x >= building[i].x && x <= building[i].x + building[i].width && y >= building[i].y && y <= building[i].y + building[i].height){
            return true;
        }
    }
    return false;
}