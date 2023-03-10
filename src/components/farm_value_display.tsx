import { useConnectors, useNetwork } from '@starknet-react/core'
import { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Image from 'next/image'
import styles from '@/styles/components/farm_value_display.module.css'

export default function FarmValueDisplay() {
    const [modalShow, setModalShow] = useState(false)
    const { available, connect, connectors, disconnect } = useConnectors()
    const { chain } = useNetwork()
    var buttonText = ""

    function handleClose() {
        setModalShow(false) 
    } 
    return (
        <div className={styles.usd_value_display}>
            <Image className={styles.usd_frame} alt={"frame"} src='/images/usd_frame.png' width={35} height={35}/>
            <Image className={styles.usd_icon} alt={"usd_icon"} src='/logos/usd_icon.png' width={30} height={30}/>
            <Image className={styles.value_frame} alt={"value_frame"} src='/images/value_frame.png' width={160} height={40}/>
            <Image className={styles.value_frame_filler} alt={"value_frame_filler"} src='/images/value_frame_filler.png' width={160} height={40}/>
            <div className={styles.value_text}>100.00</div>
        
            <Modal show={modalShow} onHide={handleClose}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Select A Wallet Provider</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    
                </Modal.Body>
            </Modal>
        </div>
    )
}