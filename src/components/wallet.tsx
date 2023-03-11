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
        walletLogoPath = '/images/connect_wallet.png'
        walletLogoHoverPath = '/images/connect_wallet_hover.png'
    }
  
    return (
        <>
            <div className={styles.button} onClick={() => {setModalShow(true)}}>
                <Image className={styles.frame} alt={"wallet_frame"} src='/images/wallet_frame.png' width={210} height={210}/>
                <Image className={styles.glas} alt={"wallet_glas"} src='/images/wallet_glas.png' width={205} height={205}/>
                <Image className={styles.edge} alt={"wallet_edge"} src='/images/wallet_edge.png' width={205} height={205}/>
                <Image className={styles.logo} alt={"wallet_logo"} src={walletLogoPath} width={210} height={210}/>
                <Image className={styles.logo_hover} alt={"wallet_logo_hover"} src={walletLogoHoverPath} width={210} height={210}/>
            </div>
            <Modal show={modalShow} onHide={handleClose}>
                <Modal.Header className={styles.modal_header} closeButton>
                    <Modal.Title>Select A Wallet Provider</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modal_body}>
                    <WalletSelection handleClose={handleClose} setWalletType={setWalletType}/>
                </Modal.Body>
            </Modal> 
        </> 
    )
}