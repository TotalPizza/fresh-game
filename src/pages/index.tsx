import { useState } from 'react'
import { useAccount } from '@starknet-react/core'
import Background from '@/components/background'
import LeftMenuBar from '@/components/left_menu_bar'
import FarmValueDisplay from '@/components/farm_value_display'
import FarmMenu from '@/components/farm_menu'
import TownHall from '@/components/town_hall'
import WalletButton from '@/components/wallet'
import DarkMode from '@/components/dark_mode'

export default function Home() {
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

  return (
    <>
      <body>
        <Background dark_mode={dark_mode}/>
        <LeftMenuBar toggle_build_menu={toggle_build_menu} toggle_farm_menu={toggle_farm_menu}/>
        <FarmValueDisplay/>
        <FarmMenu show={show_farmer_menu} toggle_farm_menu={toggle_farm_menu}/>
        <DarkMode dark_mode={dark_mode} toggle_dark_mode={toggle_dark_mode}/>
        <TownHall/>
        <WalletButton account={account}/>
      </body>
    </>
  )
}
