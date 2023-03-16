import {Token} from "@/utils/interfaces"
import {token_addresses, token_decimals} from '@/hooks/token_list'
import erc20_abi from '@/abis/erc20.json'
import { Abi } from 'starknet'
import { useContract } from '@starknet-react/core'

const {contract} = useContract({
    address: token_addresses[Token.ETH],
    abi: erc20_abi as Abi
})

export async function fetch_token_balance(token: Token, account_address: string){
  
    
    let result: any;
    contract?.call('balanceOf', [account_address]).then((res) => {
        result = res;
    })

}