import {useState, useEffect} from 'react'
import Image from 'next/image'
import styles from '@/styles/components/menu.module.css'
import XButton from './x_button'
import {tokens, token_name,token_addresses, token_decimals} from '@/hooks/token_list'
import {protocols, protocol_name, protocol_farm_icon, protocol_farms_values} from '@/hooks/protocol_list'	
import {Protocol, Token} from '@/utils/interfaces'
import erc20_abi from '@/abis/erc20.json'
import { Abi } from 'starknet'
import { useContract } from '@starknet-react/core'
import { ethers } from 'ethers'

export default function FarmMenu(props: {show: boolean, toggle_farm_menu: () => void, placing_field: (protocol: Protocol, amount: string, token: Token) => void, account_address: string|undefined}) {
    const [selected_token, set_selected_token] = useState<Token>(Token.ETH);
    const [token_balances, set_token_balances] = useState<string[]>(["0.00","0.00"]);
    
    const ETH = useContract({
        address: token_addresses[Token.ETH],
        abi: erc20_abi as Abi
    })

    const USDC = useContract({
        address: token_addresses[Token.USDC],
        abi: erc20_abi as Abi
    })

    useEffect(() => {
        if (props.account_address != undefined) {            
            let result: any;  
            ETH.contract?.call('balanceOf', [props.account_address]).then((res) => {
                result = res;
                const eth_balance = Number(ethers.formatUnits(result.balance.low.toString(), token_decimals[Token.ETH])).toFixed(4).toString();
                USDC.contract?.call('balanceOf', [props.account_address]).then((res) => {
                    result = res;
                    set_token_balances([eth_balance, Number(ethers.formatUnits(result.balance.low.toString(), token_decimals[Token.USDC])).toFixed(4).toString()]);
                })
            })
        }
    }, [selected_token, props.account_address])

    return (
        <div className={styles.menu} hidden={!props.show}>
            <Image className={styles.menu_background} priority={true} alt={"menu_background"} src='/images/menu_background.png' width={1000} height={750}/>
            <XButton margin_left={750} margin_top={-700} close_action={props.toggle_farm_menu}/>
            <div className={styles.seeds_heading}>Seeds</div>
            <table className={styles.seeds_table}>
                <tbody>
                    <br/>
                    <SeedsList selected_token={selected_token} set_selected_token={set_selected_token} token_balances={token_balances}/>
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

function SeedsList(props:{selected_token: Token, set_selected_token: (token: Token) => void, token_balances: string[]}) {

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
                    {props.token_balances[token.token]}
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
                        {token_name[props.token]}
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