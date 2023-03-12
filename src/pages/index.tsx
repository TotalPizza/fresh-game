import { useState } from 'react'
import { useAccount } from '@starknet-react/core'
import Background from '@/components/background'
import LeftMenuBar from '@/components/left_menu_bar'
import FarmValueDisplay from '@/components/farm_value_display'
import FarmMenu from '@/components/farm_menu'
import BuildMenu from '@/components/build_menu'
import TownHall from '@/components/town_hall'
import WalletButton from '@/components/wallet'
import DarkMode from '@/components/dark_mode'
import CursorItem from '@/components/cursor_item'
import { BuildItem, BuildType } from '@/components/cursor_item'
import ConstructedBuildings from '@/components/buildings'
import { Instruction, Action, LendContext, Protocol, Token} from '@/utils/interfaces'
import { ActionsBar } from '@/components/actions_bar'

export interface BuildingPlacement {
    x: number,
    y: number,
    src: string,
    width: number,
    height: number,
    click_event: () => void,
}

export default function Home() {
  const [selected_building, set_selected_building] = useState<BuildItem>({building: BuildType.None, src: '', width: 0, height: 0})
  const [temp_instruction_info, set_temp_instruction_info] = useState<any>({})
  const [instructions, set_instructions] = useState<Instruction[]>([])
  const [show_farmer_menu, set_show_farmer_menu] = useState(false)
  const [dark_mode, set_dark_mode] = useState(false)
  const [show_build_menu, set_show_build_menu] = useState(false)
  const [buildings, set_buildings] = useState<BuildingPlacement[]>([]);
  const {account, address, status} = useAccount();

  const pop_instructions = () => {
    // remove last entry of instructions
    let new_instructions = [...instructions];
    new_instructions.pop();
    set_instructions(new_instructions);
  }
  const clear_instructions = () => {
    set_instructions([]);
  }
  const toggle_farm_menu = () => {
    set_show_farmer_menu(!show_farmer_menu);
    set_show_build_menu(false);
  }
  const toggle_build_menu = () => {
    set_show_build_menu(!show_build_menu);
    set_show_farmer_menu(false);
  }
  const toggle_dark_mode = () => {
    set_dark_mode(!dark_mode);
  }
  function placing_building(item: BuildItem) {
    toggle_build_menu();
    set_selected_building(item);
  }
  function placing_field(protocol: Protocol, amount: string, token: Token) {
    toggle_farm_menu();
    set_selected_building({building: BuildType.Field,src:"/images/field.png",width:250,height:250});
    set_temp_instruction_info({protocol: protocol, amount: amount, token: token});
  }
  function place_building(x: number, y: number) {
    let click_event = () => {};
    if (selected_building.building == BuildType.Mill){
      click_event = toggle_farm_menu;
    }
    if (selected_building.building == BuildType.Field){
      set_instructions([...instructions, {action: Action.Lend, context: temp_instruction_info}]);
      set_temp_instruction_info({});
      click_event = ()=>{};
    }
    set_buildings([...buildings, {x: x, y: y, src: selected_building.src, width: selected_building.width, height: selected_building.height, click_event: click_event}]);
    set_selected_building({building: BuildType.None, src: '', width: 300, height: 300});
  }

  return (
    <>
      <body>
        <Background dark_mode={dark_mode}/>
        <ActionsBar account_address={address} instructions={instructions} clear_instructions={clear_instructions}/>
        <ConstructedBuildings buildings={buildings}/>
        <LeftMenuBar toggle_build_menu={toggle_build_menu} toggle_farm_menu={toggle_farm_menu}/>
        <FarmValueDisplay/>
        <FarmMenu show={show_farmer_menu} toggle_farm_menu={toggle_farm_menu} placing_field={placing_field}/>
        <BuildMenu show={show_build_menu} toggle_build_menu={toggle_build_menu} placing_building={placing_building}/>
        <DarkMode dark_mode={dark_mode} toggle_dark_mode={toggle_dark_mode}/>
        <TownHall/>
        <WalletButton account={account}/>
        <CursorItem item_image={selected_building} place_building={place_building}/>
      </body>
    </>
  )
}
