import Background from '@/components/background'
import LeftMenuBar from '@/components/left_menu_bar'
import FarmValueDisplay from '@/components/farm_value_display'

export default function Home() {
  return (
    <>
      <main>
        <Background/>
        <LeftMenuBar/>
        <FarmValueDisplay/>
      </main>
    </>
  )
}
