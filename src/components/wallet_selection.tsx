import { useConnectors } from '@starknet-react/core'
import styles from '@/styles/components/wallet_selection.module.css'

export function WalletSelection(props: {handleClose: () => void, setWalletType: (wallet_name: string) => void}) {

  const { available, connect, connectors, disconnect } = useConnectors()
  
  // Display sad message if no wallet extension is installed
  if (available.length === 0) {
    return (
      <div className={styles.bodyText}>
        <p>You do not have a wallet extension installed.</p>
        <img className={styles.sad_image} src='./sad_pepe.png'/>
      </div>
    )
  }
  
  return (
      <div>
        {available.map((connector, index) => (
            <button className={styles.individualWalletButton} key={index} onClick={() => {connect(connector); props.handleClose(); props.setWalletType(connector.name())}}>
              {connector.name()}
            </button>
        ))}
      </div>
  )
}