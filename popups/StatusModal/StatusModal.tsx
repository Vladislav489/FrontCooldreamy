import { Modal, ModalFuncProps, Row, Col } from "antd";
import {FC} from 'react';
import styles from './StatusModal.module.scss';
import Button from "@/components/Button/Button";
import Image from "next/image";

import errorImg from '@/public/assets/images/limit-img.png'
import successImg from '@/public/assets/images/logo-animate.svg';

interface I extends ModalFuncProps {
    text?: string,
    status: 'error' | 'success'
}



const StatusModal:FC<I> = (props) => {
    const {text, status} = props

    const switchStatusImg = () => {
        switch(status) {
            case 'error':
                return (
                    <Image src={errorImg} alt=""/>
                )
            case 'success':
                return (
                    <Image src={successImg} alt=""/>
                )
        }
    }

    return (
        <Modal
            {...props}
            className={`${styles.wrapper} modal`}
            >
             <Row gutter={[40,30]}>
                <Col span={24}>
                    <div className={styles.img}>
                        {switchStatusImg()}
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.text}>{text}</div>
                </Col>
                <Col span={24}>
                    <Button
                        text="Закрыть"
                        middle
                        style={{width: '100%'}}
                        />
                </Col>
            </Row>
        </Modal>
    )
}

export default StatusModal;