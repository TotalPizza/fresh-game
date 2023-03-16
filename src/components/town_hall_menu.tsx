import {useState, useEffect} from 'react'
import Image from 'next/image'
import styles from '@/styles/components/town_hall.module.css'
import XButton from './x_button'
import {tokens, token_name} from '@/hooks/token_list'
import {Protocol, Token} from '@/utils/interfaces'

export default function TownHallMenu(props: {show: boolean, toggle_farm_menu: () => void, token_balances: string[]}) {
    const [selected_token, set_selected_token] = useState<Token>(Token.ETH);

    return (
        <div className={styles.menu} hidden={!props.show}>
            <Image className={styles.menu_background} priority={true} alt={"menu_background"} src='/images/menu_background.png' width={1000} height={750}/>
            <XButton margin_left={750} margin_top={-700} close_action={props.toggle_farm_menu}/>
            <div className={styles.seeds_heading}>Your Seed Stash</div>
            <table className={styles.seeds_table}>
                <tbody>
                    <br/>
                    <SeedsList selected_token={selected_token} set_selected_token={set_selected_token} token_balances={props.token_balances}/>
                </tbody>
            </table>
        </div>
    )
}

function SeedsList(props:{selected_token: Token, set_selected_token: (token: Token) => void, token_balances: string[]}) {

    let seeds: JSX.Element[] = [];
    tokens.forEach(token => {
        seeds.push(
            // tr has different color when hovered
            <tr className={styles.seeds_row}>
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