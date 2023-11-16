import {FC} from 'react'
import { Modal, ModalFuncProps, Row, Col } from 'antd';
import getClassNames from '@/helpers/getClassNames';
import styles from './styles.module.scss';
import Button from '@/components/Button/Button';
import Router from 'next/router';
import CardAdv from '@/pageModules/premium/CardAdv/CardAdv';

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
                {/* <Col span={24}>
                    <h3 className={styles.title}>Buy Premium</h3>
                </Col> */}
                <Col span={24}>
                    {/* <div className={styles.text}>
                        When the credits are spent, you'll need to buy a paid subscription
                    </div> */}
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                    <CardAdv onClick={() => Router.push(`/deposit-mb?tab=2`)} selected={{ type: 'subscription'}} onSelect={() => {}} load={false} title='Unlimited Communication Subscription' subtitle='Get a subscription and chat freely!' description='With your subscription, you can chat without limits and enjoy free allowances for sending and receiving photo or video content.' submitText='Go to store' />
                    </div>
                </Col>
                {/* <Col span={24}>
                    <Row gutter={[12,12]}>
                        <Col span={12}>
                            <Button
                                text='Buy subscription'
                                middle
                                fill
                                onClick={() => Router.push(`/deposit-mb?tab=3`)}
                                />
                        </Col>
                        <Col span={12}>
                            <Button
                                fill
                                variant={'bordered'}
                                text='Close'
                                onClick={onCancel}
                                middle
                                />
                        </Col>
                    </Row>
                </Col> */}
            </Row>
        </Modal>
    )
}

export default CreditsInfoModal;