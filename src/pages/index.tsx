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
import { Protocol } from '@/hooks/protocol_list'
import { BuildItem } from '@/components/cursor_item'

export default function Home() {
  const [selected_building, set_selected_building] = useState<BuildItem>({src: '', width: 0, height: 0})
  const [show_farmer_menu, set_show_farmer_menu] = useState(false)
  const [dark_mode, set_dark_mode] = useState(false)
  const [show_build_menu, set_show_build_menu] = useState(false)
  const {account, address, status} = useAccount();

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
  function select_farm(farm: Protocol) {
    toggle_farm_menu();
    set_selected_building({src: farm.src, width: 50, height: 50});
  }
  function placing_building(item: BuildItem) {
    toggle_build_menu();
    set_selected_building(item);
  }
  function place_building(x: number, y: number) {
    set_selected_building({src: '', width: 300, height: 300});
  }

  return (
    <>
      <body>
        <Background dark_mode={dark_mode}/>
        <LeftMenuBar toggle_build_menu={toggle_build_menu} toggle_farm_menu={toggle_farm_menu}/>
        <FarmValueDisplay/>
        <FarmMenu show={show_farmer_menu} toggle_farm_menu={toggle_farm_menu} select_farm={select_farm}/>
        <BuildMenu show={show_build_menu} toggle_build_menu={toggle_build_menu} placing_building={placing_building}/>
        <DarkMode dark_mode={dark_mode} toggle_dark_mode={toggle_dark_mode}/>
        <TownHall/>
        <WalletButton account={account}/>
        <CursorItem item_image={selected_building} place_building={place_building}/>
      </body>
    </>
  )
}
