import { useConnectors, useNetwork } from '@starknet-react/core'
import { useState } from 'react'
import { AccountInterface } from 'starknet';
import Modal from "react-bootstrap/Modal";
import { WalletSelection } from '@/components/wallet_selection'
import Image from 'next/image'
import styles from '@/styles/components/wallet_button.module.css'

enum WalletType {
    ArgentX,
    Braavos,
    None,
}

export default function WalletButton(props: {account: AccountInterface | undefined}) {
    const [modalShow, setModalShow] = useState(false)
    const [activeWallet, setActiveWallet] = useState(WalletType.None)
    const { available, connect, connectors, disconnect } = useConnectors()
    const { chain } = useNetwork()
  
    function handleClose() {
      setModalShow(false) 
    } 

    function setWalletType(wallet_name: string) {
        if (wallet_name === "Argent X") {
            setActiveWallet(WalletType.ArgentX);
        } else if (wallet_name === "Braavos") {
            setActiveWallet(WalletType.Braavos);
        }else{
            setActiveWallet(WalletType.None);
        }
    } 

    let walletLogoPath = ""; 
    let walletLogoHoverPath = ""; 
    if (activeWallet === WalletType.ArgentX) {
        walletLogoPath = '/logos/argent_icon.png'
        walletLogoHoverPath = '/logos/argent_icon_hover.png'
    } else if (activeWallet === WalletType.Braavos) {
        walletLogoPath = '/logos/braavos_icon.png'
        walletLogoHoverPath = '/logos/braavos_icon_hover.png'
    } else {
        walletLogoPath = '/connect_wallet.png'
        walletLogoHoverPath = '/connect_wallet_hover.png'
    }
  
    return (
        <>
            <div className={styles.button} onClick={() => {setModalShow(true)}}>
                <Image className={styles.frame} alt={"wallet_frame"} src='/wallet_frame.png' width={150} height={150}/>
                <Image className={styles.glas} alt={"wallet_glas"} src='/wallet_glas.png' width={145} height={145}/>
                <Image className={styles.edge} alt={"wallet_edge"} src='/wallet_edge.png' width={145} height={145}/>
                <Image className={styles.logo} alt={"wallet_logo"} src={walletLogoPath} width={145} height={145}/>
                <Image className={styles.logo_hover} alt={"wallet_logo_hover"} src={walletLogoHoverPath} width={145} height={145}/>
            </div>
            <Modal show={modalShow} onHide={handleClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Select A Wallet Provider</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <WalletSelection handleClose={handleClose} setWalletType={setWalletType}/>
                </Modal.Body>
            </Modal> 
        </> 
    )
}