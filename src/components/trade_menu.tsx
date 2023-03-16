import Image from 'next/image'
import { useContract } from '@starknet-react/core'
import {useEffect, useState} from 'react'
import styles from '@/styles/components/trade_menu.module.css'
import XButton from './x_button'
import {Token} from '@/utils/interfaces'
import {token_addresses, token_decimals} from '@/hooks/token_list'
import {SwapButton} from '@/components/swap_button'
import {contracts} from '@/hooks/constants'
import { ethers } from 'ethers'


export default function BuildMenu(props: {address: string|undefined, show: boolean, toggle_trade_menu: () => void, add_transfer_instruction: (token_in: Token, token_out: Token, amount: string) => void}) { 
    const [tokens, setTokens] = useState([Token.ETH, Token.USDC])
    const [token_src, setTokenSrc] = useState(["/seeds/eth.png", "/seeds/usdc.png"])
    const [tradeValue, setTradeValue] = useState("0.001")
    const [outputAmount, setOutputAmount] = useState("0")
    const [loading, setLoading] = useState(true)

    const {contract} = useContract({
        address: contracts[0].address,
        abi: contracts[0].abi
    })
    
    useEffect(() => {
        let result: any;
        contract?.call('get_amount_out', [{low:ethers.parseUnits(tradeValue,token_decimals[tokens[0]]).toString(),high:"0"},token_addresses[tokens[0]],token_addresses[tokens[1]]]).then((res) => {
            result = res;
            setOutputAmount(ethers.formatUnits(result.amount.low.toString(),token_decimals[tokens[1]]))
            setLoading(false);
        })
    }, [tradeValue])

    return (
        <div className={styles.menu} hidden={!props.show} style={{alignContent:"right"}}>
            <Image className={styles.menu_background} priority={true} alt={"menu_background"} src='/images/menu_background.png' width={1000} height={750}/>
            <XButton margin_left={750} margin_top={-700} close_action={props.toggle_trade_menu}/>
            <div className={styles.building_heading}>Market Place</div>
            <Image className={styles.asset_icon_1} priority={true} alt={"eth_Seed"} src={token_src[0]} width={80} height={80}/>
            <Image className={styles.asset_icon_2} priority={true} alt={"usdc_Seed"} src={token_src[1]} width={80} height={80}/>
            
            <Image className={styles.value_filler_1} priority={true} alt={"eth_value_Seed"} src={"/images/value_frame_filler.png"} width={300} height={70}/>
            <Image className={styles.value_filler_2} priority={true} alt={"usdc_value_Seed"} src={"/images/value_frame_filler.png"} width={300} height={70}/>
            <Image className={styles.value_filler_frame_1} priority={true} alt={"eth_value_frame"} src={"/images/value_frame.png"} width={300} height={70}/>
            <Image className={styles.value_filler_frame_2} priority={true} alt={"usdc_value_frame"} src={"/images/value_frame.png"} width={300} height={70}/>
            <input className={styles.in_text_box} style={{paddingInline: "10px"}} type="number" placeholder="0.001" value={tradeValue} onChange={e => {
                setTradeValue(e.target.value);
                setLoading(true);
            }}></input>
            <input className={styles.out_text_box} style={{paddingInline: "10px"}} type="text" disabled placeholder="0.0" value={outputAmount}></input>
            <div className={styles.spinner}>
                <Image className={styles.wololo} hidden={!loading} alt={"wololo"} src={"/images/wololo.gif"} width={70} height={100}/>
                <div className={styles.convertingText} hidden={!loading}>Converting Prices...</div>
            </div>    
            <SwapButton add_transfer_instruction={props.add_transfer_instruction} trade_info={[tokens[0],tokens[1],tradeValue]} toggle_trade_menu={props.toggle_trade_menu}/>
            
            <Image className={styles.switch_arrows} priority={true} alt={"switch_arrows"} src={"/images/switch_arrows.png"} onClick={() => {
                setTokens([tokens[1], tokens[0]]);
                setTokenSrc([token_src[1], token_src[0]]);
                setLoading(true);
                setTradeValue(outputAmount);
            }} width={51} height={95}/>
        </div>
    )
}