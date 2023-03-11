import {useState} from 'react'
import Image from 'next/image'
import styles from '@/styles/components/menu.module.css'
import XButton from './x_button'
import {tokens} from '@/hooks/token_list'
import {protocols, Protocol} from '@/hooks/protocol_list'	

export default function FarmMenu(props: {show: boolean, toggle_farm_menu: () => void, select_farm: (farm: Protocol) => void}) {
    let [selected_token, set_selected_token] = useState("");
    
    return (
        <div className={styles.menu} hidden={!props.show}>
            <Image className={styles.menu_background} alt={"menu_background"} src='/images/menu_background.png' width={1000} height={750}/>
            <XButton margin_left={890} margin_top={10} close_action={props.toggle_farm_menu}/>
            <div className={styles.seeds_heading}>Seeds</div>
            <table className={styles.seeds_table}>
                <tbody>
                    <br/>
                    <SeedsList set_selected_token={set_selected_token}/>
                </tbody>
            </table>
            <table className={styles.fields_table}>
                <tbody>
                    <br/>
                    <FieldsList token_name={selected_token} select_farm={props.select_farm}/>
                </tbody>
            </table>
            <div className={styles.fields_heading}>Fields</div>
        </div>
    )
}

function SeedsList(props:{set_selected_token: (token_name: string) => void}) {
    let seeds: JSX.Element[] = [];
    tokens.forEach(token => {
        seeds.push(
            <tr className={styles.seeds_row} onClick={()=>props.set_selected_token(token.name)}>
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

function FieldsList(props:{token_name: string, select_farm: (farm: Protocol) => void}){
    let fields: JSX.Element[] = [];
    let valid_protocols: Protocol[] = [];
    if (props.token_name === ""){
        return(
            <>
            </>
        )
    }
    protocols.forEach(token => {
        if (token.name === props.token_name){
            token.protocols.forEach(protocol => {
                valid_protocols.push(protocol);
            })
        }
    });
    valid_protocols.forEach(protocol => {
        fields.push(
            <tr className={styles.fields_row} onClick={()=>props.select_farm(protocol)}>
                <td className={styles.fields_col}>
                    <Image className={styles.asset_icon} alt={protocol.name} src={protocol.src} width={80} height={80}/>
                </td>
                <td className={styles.fields_col}>
                    {protocol.name}
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