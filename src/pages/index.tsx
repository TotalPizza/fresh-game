import { useState, useEffect } from 'react'
import { useAccount } from '@starknet-react/core'
import Background from '@/components/background'
import BuildButton from '@/components/building_button'
import QuestionButton from '@/components/question_button'
import UseMobileView  from '@/hooks/mobile_view'
import FarmMenu from '@/components/farm_menu'
import QuestionMenu from '@/components/question_menu'
import TradeMenu from '@/components/trade_menu'
import BuildMenu from '@/components/build_menu'
import TownHallMenu from '@/components/town_hall_menu'
import WalletButton from '@/components/wallet'
import MobileView from '@/components/mobile_view'
import LoadingScreen from '@/components/loading_screen'
import Pepe from '@/components/pepe'
import CursorItem from '@/components/cursor_item'
import { BuildItem, BuildType } from '@/components/cursor_item'
import ConstructedBuildings from '@/components/buildings'
import { Instruction, Action, Protocol, Token, TransferContext} from '@/utils/interfaces'
import { ActionsBar } from '@/components/actions_bar'
import {tokens, token_addresses, token_decimals} from '@/hooks/token_list'
import Image from 'next/image'
import erc20_abi from '@/abis/erc20.json'
import { Abi } from 'starknet'
import { useContract } from '@starknet-react/core'
import { ethers } from 'ethers'

export interface BuildingPlacement {
    x: number,
    y: number,
    src: string,
    width: number,
    height: number,
    building: BuildType,
    click_event: () => void,
}

export default function Home() {
  const [selected_building, set_selected_building] = useState<BuildItem>({building: BuildType.None, src: '', width: 0, height: 0})
  const [temp_instruction_info, set_temp_instruction_info] = useState<any>({})
  const [instructions, set_instructions] = useState<Instruction[]>([])
  const [show_town_hall_menu, set_show_town_hall_menu] = useState(false)
  const [show_question_menu, set_show_question_menu] = useState(false)
  const [show_farmer_menu, set_show_farmer_menu] = useState(false)
  const [show_trade_menu, set_show_trade_menu] = useState(false)
  const [dark_mode, set_dark_mode] = useState(false)
  const [show_build_menu, set_show_build_menu] = useState(false)
  const [buildings, set_buildings] = useState<BuildingPlacement[]>([]);
  const [building_status, set_building_status] = useState<boolean[]>([false,true,true]);
  const {account, address, status} = useAccount();  
  const [isLoading, setIsLoading] = useState(true);
  const [token_balances, set_token_balances] = useState<string[]>(["0.00","0.00"]);

  useEffect(() => {
    // Preload all images ... not finished
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);  
    
  const ETH = useContract({
      address: token_addresses[Token.ETH],
      abi: erc20_abi as Abi
  })

  const USDC = useContract({
      address: token_addresses[Token.USDC],
      abi: erc20_abi as Abi
  })

  useEffect(() => {
      if (address != undefined) {            
        let result: any;  
        ETH.contract?.call('balanceOf', [address]).then((res) => {
            result = res;
            const eth_balance = Number(ethers.formatUnits(result.balance.low.toString(), token_decimals[Token.ETH])).toFixed(4).toString();
            USDC.contract?.call('balanceOf', [address]).then((res) => {
                result = res;
                set_token_balances([eth_balance, Number(ethers.formatUnits(result.balance.low.toString(), token_decimals[Token.USDC])).toFixed(4).toString()]);
            })
        })
      }
  }, [address])

  const pop_instruction = () => {
    // remove last entry of instructions
    let new_instructions = [...instructions];
    let removed_instruction: Instruction|undefined = undefined;
    if (new_instructions.length > 0){
      removed_instruction = new_instructions.pop();
      set_instructions(new_instructions);
    }
    // Also remove latest farm building
    if (removed_instruction?.action == Action.Lend){
      let current_buildings = [...buildings];
      for (let i = current_buildings.length-1; i >= 0; i--){
        if (current_buildings[i].building == BuildType.Field){
          current_buildings.splice(i, 1);
          break;
        }
      }
      set_buildings(current_buildings);
    }
  }
  const clear_instructions = () => {
    set_instructions([]);
  }
  const toggle_town_hall_menu = () => {
    set_show_town_hall_menu(!show_town_hall_menu);
    set_show_build_menu(false);
    set_show_farmer_menu(false);
    set_show_question_menu(false);
    set_show_trade_menu(false);
  }
  const toggle_question_menu = () => {
    set_show_question_menu(!show_question_menu);
    set_show_build_menu(false);
    set_show_town_hall_menu(false);
    set_show_farmer_menu(false);
    set_show_trade_menu(false);
  }
  const toggle_trade_menu = () => {
    set_show_trade_menu(!show_trade_menu);
    set_show_build_menu(false);
    set_show_question_menu(false);
    set_show_farmer_menu(false);
    set_show_town_hall_menu(false);
  }
  const toggle_farm_menu = () => {
    set_show_farmer_menu(!show_farmer_menu);
    set_show_build_menu(false);
    set_show_question_menu(false);
    set_show_trade_menu(false);
    set_show_town_hall_menu(false);
  }
  const toggle_build_menu = () => {
    set_show_build_menu(!show_build_menu);
    set_show_farmer_menu(false);
    set_show_question_menu(false);
    set_show_town_hall_menu(false);
    set_show_trade_menu(false);
  }
  const toggle_dark_mode = () => {
    set_dark_mode(!dark_mode);
  }
  function add_transfer_instruction(token_in: Token, token_out: Token, amount: string) {
    let new_instructions = [...instructions];
    const context: TransferContext = {amount: amount, token_in: token_in, token_out: token_out};
    new_instructions.push({action: Action.Transfer, context: context});
    set_instructions(new_instructions);
  }
  function placing_building(item: BuildItem) {
    toggle_build_menu();
    set_selected_building(item);
  }
  function placing_field(protocol: Protocol, amount: string, token: Token) {
    toggle_farm_menu();
    set_selected_building({building: BuildType.Field,src:"/images/field_white.png",width:350,height:175});
    set_temp_instruction_info({protocol: protocol, amount: amount, token: token});
  }
  function place_building(x: number, y: number) {
    let click_event = () => {};
    if (selected_building.building == BuildType.TownHall){
      click_event = toggle_town_hall_menu;
      // Mark building as being built. Prevents another one from being built
      let new_building_status = [...building_status];
      new_building_status[0] = true;
      new_building_status[2] = false; // Unlock Market
      set_building_status(new_building_status);
    }
    if (selected_building.building == BuildType.Mill){
      click_event = toggle_farm_menu;
      // Mark building as being built. Prevents another one from being built
      let new_building_status = [...building_status];
      new_building_status[1] = true;
      set_building_status(new_building_status);
    }
    if (selected_building.building == BuildType.Market){
      click_event = toggle_trade_menu;
      // Mark building as being built. Prevents another one from being built
      let new_building_status = [...building_status];
      new_building_status[2] = true; 
      new_building_status[1] = false; // Unlock Mill
      set_building_status(new_building_status);
    }
    if (selected_building.building == BuildType.Field){
      set_instructions([...instructions, {action: Action.Lend, context: temp_instruction_info}]);
      set_temp_instruction_info({});
      click_event = ()=>{};
    }
    // We always remove the last 5 characters which are _white.png
    set_buildings([...buildings, {x: y, y: x, src: selected_building.src.substring(0, selected_building.src.length-10)+'.png', width: selected_building.width, height: selected_building.height, click_event: click_event, building: selected_building.building}]);
    set_selected_building({building: BuildType.None, src: '', width: 300, height: 300});
  }
  const cancel_building_placement = () => {
    set_selected_building({building: BuildType.None, src: '', width: 300, height: 300});
  }
  
  if (UseMobileView()) {
    return(
      <MobileView/>
    )
  }
  if(isLoading){
    return (
      <>
        <LoadingScreen/>
      </>
    )
  }else{
    return (
      <>
        <body>
          <Background dark_mode={dark_mode}/>
          <ActionsBar account_address={address} instructions={instructions} clear_instructions={clear_instructions} pop_instruction={pop_instruction}/>
          <ConstructedBuildings buildings={buildings}/>
          <BuildButton toggle_logic={toggle_build_menu}/>
          <QuestionButton toggle_logic={toggle_question_menu}/>
          <FarmMenu token_balances={token_balances} show={show_farmer_menu} toggle_farm_menu={toggle_farm_menu} placing_field={placing_field}/>
          <TownHallMenu token_balances={token_balances} show={show_town_hall_menu} toggle_farm_menu={toggle_town_hall_menu}/>
          <TradeMenu show={show_trade_menu} address={address} toggle_trade_menu={toggle_trade_menu} add_transfer_instruction={add_transfer_instruction}/>
          <BuildMenu building_status={building_status} show={show_build_menu} toggle_build_menu={toggle_build_menu} placing_building={placing_building}/>
          <QuestionMenu show={show_question_menu} toggle_question_menu={toggle_question_menu}/>
          <Pepe/>
          <WalletButton account={account}/>
          <CursorItem item_image={selected_building} cancel_building_placement={cancel_building_placement} place_building={place_building} buildings={buildings}/>
        </body>

        <div hidden>
          <Image src="/images/field_white.png" key={0} priority={true} alt={"field_white"} width={350} height={175} />,
          <Image src="/images/field_red.png" key={1} priority={true} alt={"field_red"} width={350} height={175} />,
          <Image src="/images/field.png" key={2} priority={true} alt={"field"} width={350} height={175} />,
          <Image src="/images/mill.png" key={3} priority={true} alt={"mill"} width={300} height={270} />,
          <Image src="/images/mill_white.png" key={4} priority={true} alt={"mill_white"} width={300} height={270} />,
          <Image src="/images/mill_red.png" key={5} priority={true} alt={"mill_red"} width={300} height={270} />,
          <Image src="/images/market.png" key={6} priority={true} alt={"mill"} width={409} height={309} />,
          <Image src="/images/market_white.png" key={7} priority={true} alt={"mill_white"} width={409} height={309} />,
          <Image src="/images/market_red.png" key={8} priority={true} alt={"mill_red"} width={409} height={309} />,
          <Image src="/images/town_hall.png" key={9} priority={true} alt={"town_hall"} width={400} height={250} />,
          <Image src="/images/town_hall_white.png" key={10} priority={true} alt={"town_hall_white"} width={400} height={250} />,
          <Image src="/images/town_hall_red.png" key={11} priority={true} alt={"town_hall_red"} width={400} height={250} />,
          <Image src="/images/town_hall_icon.png" key={12} priority={true} alt={"town_hall_icon"} width={100} height={100} />,
          <Image src="/images/town_hall_icon_disabled.png" key={13} priority={true} alt={"town_hall_icon_disabled"} width={100} height={100} />,
          <Image src="/images/nostra_mill_icon.png" key={14} priority={true} alt={"nostra_mill_icon"} width={100} height={100} />,
          <Image src="/images/nostra_mill_icon_disabled.png" key={15} priority={true} alt={"nostra_mill_icon_disabled"} width={100} height={100} />,
          <Image src="/fields/nostra.png" key={16} priority={true} alt={"field_icon"} width={100} height={100} />,
          <Image src={"/images/wololo.gif"} priority={true} alt={"wololo"} width={70} height={100}/>
        </div>
      </>
    )
  }
}
