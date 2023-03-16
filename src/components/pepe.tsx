import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Pepe() {
    // Image displays a little helper that moves around the screen to random locations
    const [target_location, set_target_location] = useState({x: 0, y: 0});
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            movePepe();
        }, 30);
      }, [x, y]);
    
    const movePepe = () => {
        // move pepe one pixel closer to target location
        if (x < target_location.x){
            setX(x+1);
        }
        if (x > target_location.x){
            setX(x-1);
        }
        if (y < target_location.y){
            setY(y+1);
        }
        if (y > target_location.y){
            setY(y-1);
        }
    }

    const setNewTargetLocation = () => {
        // set a new target location
        let new_x = Math.floor(Math.random() * 1000);
        let new_y = Math.floor(Math.random() * 1000);
        set_target_location({x: new_x, y: new_y});
    }

    
    if (x == target_location.x && y == target_location.y){
        setNewTargetLocation();
    }

    let pepe_orientation = "/images/little_helper.png";
    if( x < target_location.x){
        pepe_orientation = "/images/little_helper_right.png";
    }

    return(
        <>
            <Image onClick={()=>setX(x+1)} style={{top: y, left: x, position: "absolute", zIndex: 4}} src={pepe_orientation} alt={"little_helper"} width={33} height={40}/>
        </>
    ) 
}