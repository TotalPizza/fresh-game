import Image from 'next/image'
import {useEffect, useState} from 'react'
import styles from '@/styles/components/cursor_item.module.css'

export enum BuildType{
    None,
    Mill,
    Field,
    Market,
}

export interface BuildItem{
    building: BuildType,
    src: string;
    width: number;
    height: number;
}

export default function CursorItem(props: {item_image: BuildItem, place_building: (y: number, x: number) => void}) {
    const [mousePos, setMousePos] = useState({x: 0, y: 0});

    useEffect(() => {
        const handleMouseMove = (event:any) => {
          setMousePos({ x: event.clientX, y: event.clientY });
        };
    
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
          window.removeEventListener(
            'mousemove',
            handleMouseMove
          );
        };
    }, []);

    if (props.item_image.src == ''){
        return(
            <></>
        );
    }else{
        return(
            <>
                <Image className={styles.curso_image} onClick={() => props.place_building(mousePos.y - props.item_image.height/2,mousePos.x - props.item_image.width/2)} alt={'cursor_image'} style={{top: mousePos.y - props.item_image.height/2, left: mousePos.x - props.item_image.width/2}} src={props.item_image.src} width={props.item_image.width} height={props.item_image.height}/>
            </>
        );
    }     
}