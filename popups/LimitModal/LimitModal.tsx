import {Modal, ModalFuncProps, Row, Col} from 'antd';
import {FC, useState, useEffect} from 'react';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import Router from 'next/router';
import styles from './LimitModal.module.scss';
import img from '@/public/assets/images/limit-img.png';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import PromoCard from './components/PromoCard/PromoCard';
import { useWindowSize } from 'usehooks-ts';



interface I extends ModalFuncProps {
    head?: string,
    text?: string,
    action?: {
        link?: string,
        label?: string
    }
}

const service = new ApiService()

const LimitModal:FC<I> = (props) => {
    const {
        head = 'Recharge Needed', 
        text = "You're low on credits. Top up to keep chatting!", 
        action, 
        onCancel, 
        open
    } = props;
    const {token, locale} = useAppSelector(s => s)
    const [promoData, setPromoData] = useState<any>(null)
    const [timerStart, setTimerStart] = useState<any>(null)
    const {width} = useWindowSize()

    const onClose = () => {
        setPromoData(null)
        onCancel && onCancel()
    }

    useEffect(() => {
        if(token && open) {
            service.getPromo(token).then(res => {
                
                if(res?.data?.length > 0) {
                    setPromoData(res?.data[0]?.promotion)
                    setTimerStart(res?.data[0])
                } else setPromoData(null)
            })
        } else {
            setPromoData(null)
        }
    }, [token, open])


    return (
        <Modal
            {...props}
            footer={false}
            onCancel={onClose}
            width={385}
            
            className={`modal ${styles.wrapper} purp`}
            >
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <h4 className={styles.title}>{head}</h4>
                </Col>
                <Col span={24}>
                    <div className={styles.icon}></div>
                </Col>
                <Col span={24}>
                    <div className={styles.text}>{text}</div>
                </Col>
                {
                    action?.label && (
                        <Col span={24}>
                            <div className={styles.action}>
                                <Button
                                    text={action.label}
                                    middle={width !== 0 && width <= 768}
                                    onClick={() => {
                                        if(action?.link) {
                                            Router.push(action.link)
                                            onClose()
                                        } else {
                                            onClose()
                                        }
                                    }}
                                    />
                            </div>
                        </Col>
                    )
                }
                {
                    promoData && (
                        <>
                            <Col span={24}>
                                <PromoCard {...promoData} onClose={onClose}/>
                            </Col>
                            <Col span={24}>
                                <div className={styles.market}>
                                    <Button
                                        text={locale?.popups?.promo?.open_market}
                                        onClick={() => {
                                            Router.push('/deposit-mb?tab=3')
                                            onClose()
                                        }}
                                        />
                                </div>
                            </Col>
                        </>
                    )
                }
                
            </Row>
        </Modal>
    )
}


export default LimitModal