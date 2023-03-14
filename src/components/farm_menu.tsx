import {useState} from 'react'
import Image from 'next/image'
import styles from '@/styles/components/menu.module.css'
import XButton from './x_button'
import {tokens} from '@/hooks/token_list'
import {protocols, protocol_name, protocol_farm_icon, protocol_farms_values} from '@/hooks/protocol_list'	
import {Protocol, Token} from '@/utils/interfaces'

export default function FarmMenu(props: {show: boolean, toggle_farm_menu: () => void, placing_field: (protocol: Protocol, amount: string, token: Token) => void}) {
    const [selected_token, set_selected_token] = useState<Token>(Token.ETH);
    
    return (
        <div className={styles.menu} hidden={!props.show}>
            <Image className={styles.menu_background} priority={true} alt={"menu_background"} src='/images/menu_background.png' width={1000} height={750}/>
            <XButton margin_left={750} margin_top={-700} close_action={props.toggle_farm_menu}/>
            <div className={styles.seeds_heading}>Seeds</div>
            <table className={styles.seeds_table}>
                <tbody>
                    <br/>
                    <SeedsList selected_token={selected_token} set_selected_token={set_selected_token}/>
                </tbody>
            </table>
            <table className={styles.fields_table}>
                <tbody>
                    <br/>
                    <FieldsList token={selected_token} placing_field={props.placing_field}/>
                </tbody>
            </table>
            <div className={styles.fields_heading}>Fields</div>
        </div>
    )
}

function SeedsList(props:{selected_token: Token, set_selected_token: (token: Token) => void}) {

    let seeds: JSX.Element[] = [];
    tokens.forEach(token => {
        let seed_row_color;
        if (token.token === props.selected_token) {
            seed_row_color = 'rgb(161, 121, 83)';
        } else {
            seed_row_color = 'rgb(122, 89, 58)';
        }
        seeds.push(
            // tr has different color when hovered
            <tr className={styles.seeds_row} style={{backgroundColor: seed_row_color}} onClick={()=>props.set_selected_token(token.token)}>
                <td className={styles.seeds_col}>
                    <Image className={styles.asset_icon} priority={true} alt={token.name} src={token.src} width={80} height={80}/>
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

function FieldsList(props:{token: Token, placing_field: (protocol: Protocol, amount: string, token: Token) => void}){
    let fields: JSX.Element[] = [];
    let valid_protocols: Protocol[] = [];
    if (props.token === undefined){
        return(
            <>
            </>
        )
    }
    protocols.forEach(protocol => {
        if (protocol.token === props.token){
            protocol.protocols.forEach(protocol => {
                valid_protocols.push(protocol);
            })
        }
    });
    valid_protocols.forEach(protocol => {
        protocol_farms_values[protocol][props.token].forEach(token_amount => {
            fields.push(
                <tr className={styles.fields_row} onClick={() => props.placing_field(protocol,token_amount,props.token)}>
                    <td className={styles.fields_col}>
                        <Image className={styles.asset_icon} priority={true} alt={protocol_name[protocol]} src={protocol_farm_icon[protocol]} width={80} height={80}/>
                    </td>
                    <td className={styles.fields_col}>
                        {token_amount}
                    </td>
                    <td className={styles.fields_col}>
                        {"1% APY"}
                    </td>
                </tr>
            ) 
        });
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