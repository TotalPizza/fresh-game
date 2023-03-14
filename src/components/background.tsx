import Image from 'next/image'
import styles from '@/styles/components/background.module.css'
import {useEffect, useState} from 'react'
import { JsxElement } from 'typescript';

export default function Background(props: {dark_mode: boolean}) {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
      });
    
      useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
    
        // Add event listener
        window.addEventListener("resize", handleResize);
    
        // Call handler right away so state gets updated with initial window size
        handleResize();
    
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }, []); // Empty array ensures that effect is only run on mount
    
    let gras_texture;
    if (props.dark_mode){
      gras_texture ='/images/grass_dark.png';
    }else{
      gras_texture ='/images/grass.png';
    }
    let number_of_row_tiles = Math.ceil(windowSize.width/50);
    let number_of_cols = Math.ceil(windowSize.height/50);
    let tiles: JSX.Element[] = [];
    const tile_amount = number_of_row_tiles*number_of_cols;
    for (let i = 0; i < tile_amount; i++) {
        tiles.push(
          <div className={styles.tile_container}>
            <Image key={i} className={styles.tile} alt={'p'+i} src={gras_texture} width={50} height={50}/>
          </div>
        )
    }
    return (
        <>
            {tiles.map((data) => {
                return(
                    data
                )
            })}
        </>
    )
}