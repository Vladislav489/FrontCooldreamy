import {FC} from 'react'
import { Modal, ModalFuncProps, Row, Col } from 'antd';
import getClassNames from '@/helpers/getClassNames';
import styles from './styles.module.scss';
import Button from '@/components/Button/Button';
import Router from 'next/router';

const CreditsInfoModal:FC<ModalFuncProps> = (props) => {
    const {onCancel} = props || {}
    return (
        <Modal
            {...props}
            width={485}
            footer={null}
            className={getClassNames([styles.wrapper, 'modal'])}
            >
            <Row gutter={[25,25]}>
                <Col span={24}>
                    <h3 className={styles.title}>Кредиты</h3>
                </Col>
                <Col span={24}>
                    <div className={styles.text}>
                        When the credits are spent, you'll need to buy a paid subscription
                    </div>
                </Col>
                <Col span={24}>
                    <Row gutter={[12,12]}>
                        <Col span={12}>
                            <Button
                                text='Пополнить сейчас'
                                middle
                                fill
                                onClick={() => Router.push(`/deposit-mb?tab=3`)}
                                />
                        </Col>
                        <Col span={12}>
                            <Button
                                fill
                                variant={'bordered'}
                                text='Закрыть'
                                onClick={onCancel}
                                middle
                                />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Modal>
    )
}

export default CreditsInfoModal;