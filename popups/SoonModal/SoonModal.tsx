import styles from './SoonModal.module.scss';
import { Modal, ModalFuncProps, Row, Col } from 'antd';
import {FC} from 'react'
import img from '@/public/assets/images/logo-animate.svg'
import Image from 'next/image';


const SoonModal:FC<ModalFuncProps> = (props) => {

    return (
        <Modal
            {...props}
            footer={false}
            className={`${styles.wrapper} modal`}
            >
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <div className={styles.img}>
                        <Image
                            src={img}
                            width={150}
                            height={150}
                            alt=''
                            />
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.title}>
                        Coming soon
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}


export default SoonModal;