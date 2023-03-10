import { useState } from 'react'
import Background from '@/components/background'
import LeftMenuBar from '@/components/left_menu_bar'
import FarmValueDisplay from '@/components/farm_value_display'
import FarmMenu from '@/components/farm_menu'
import TownHall from '@/components/town_hall'

export default function Home() {
  const [show_farmer_menu, set_show_farmer_menu] = useState(false)
  const [show_build_menu, set_show_build_menu] = useState(false)

  const toggle_farm_menu = () => {
    set_show_farmer_menu(!show_farmer_menu);
    set_show_build_menu(false);
  }
  const toggle_build_menu = () => {
    set_show_build_menu(!show_build_menu);
    set_show_farmer_menu(false);
  }

  return (
    <>
      <main>
        <Background/>
        <LeftMenuBar toggle_build_menu={toggle_build_menu} toggle_farm_menu={toggle_farm_menu}/>
        <FarmValueDisplay/>
        <FarmMenu show={show_farmer_menu} toggle_farm_menu={toggle_farm_menu}/>
        <TownHall/>
      </main>
    </>
  )
}
