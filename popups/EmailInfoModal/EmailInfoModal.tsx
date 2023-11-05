import styles from './EmailInfoModal.module.scss';
import {Modal, ModalFuncProps, Col, Row} from 'antd'
import {FC} from 'react';

const EmailInfoModal:FC<ModalFuncProps> = (props) => {
    return (
        <Modal
            {...props}
            className={`${styles.wrapper} modal`}
            >
            <Row gutter={[30,30]}>
                <Col span={24}>
                    <div className={styles.head}>
                        <Row gutter={[10,10]}>
                            <Col span={24}></Col>
                            <Col span={24}></Col>
                            <Col span={24}></Col>
                        </Row>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.body}>
                        <div className={styles.title}>Не пришло письмо</div>
                        <div className={styles.item}>
                            <div className={styles.icon}></div>
                            <div className={styles.descr}>
                                Пров
                            </div>
                        </div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}

export default EmailInfoModal;