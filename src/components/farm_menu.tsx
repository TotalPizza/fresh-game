import Image from 'next/image'
import styles from '@/styles/components/menu.module.css'
import XButton from './x_button'
import {tokens} from '@/hooks/token_list'	

export default function FarmMenu(props: {show: boolean, toggle_farm_menu: () => void}) {
    
    return (
        <div className={styles.menu} hidden={!props.show}>
            <Image className={styles.menu_background} alt={"menu_background"} src='/images/menu_background.png' width={1000} height={750}/>
            <XButton margin_left={890} margin_top={10} close_action={props.toggle_farm_menu}/>
            <div className={styles.seeds_heading}>Seeds</div>
            <table className={styles.seeds_table}>
                <tbody>
                    <br/>
                    <SeedsList/>
                </tbody>
            </table>
            <table className={styles.fields_table}>
                <tbody>
                    <br/>
                    <FieldsList/>
                </tbody>
            </table>
            <div className={styles.fields_heading}>Fields</div>
        </div>
    )
}

function SeedsList(){
    let seeds: JSX.Element[] = [];
    tokens.forEach(token => {
        seeds.push(
            <tr className={styles.seeds_row}>
                <td className={styles.seeds_col}>
                    <Image className={styles.asset_icon} alt={token.name} src={token.src} width={80} height={80}/>
                </td>
                <td className={styles.seeds_col}>
                    {token.name}
                </td>
                <td className={styles.seeds_col}>
                    {'0.00'}
                </td>
            </tr>
        ) 
    });
    return(
        <>
            {seeds.map((data) => {
                return(
                    data
                )
            })}
        </>
    )
}

function FieldsList(){
    let fields: JSX.Element[] = [];
    tokens.forEach(token => {
        fields.push(
            <tr className={styles.fields_row}>
                <td className={styles.fields_col}>
                    <Image className={styles.asset_icon} alt={token.name} src={token.src} width={80} height={80}/>
                </td>
                <td className={styles.fields_col}>
                    {"Nostra"}
                </td>
            </tr>
        ) 
    });
    return(
        <>
            {fields.map((data) => {
                return(
                    data
                )
            })}
        </>
    )
}