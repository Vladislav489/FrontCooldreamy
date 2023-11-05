import styles from './PromoCard.module.scss';
import {FC} from 'react';
import {Row, Col} from 'antd';
import img from '@/public/assets/images/promo-img.svg';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import Router from 'next/router';
import { useAppSelector } from '@/hooks/useTypesRedux';



const PromoCard:FC<any> = (props) => {

    const {
        activation_type_id,
        benefit,
        credits,
        hours,
        id,
        premium_id,
        price,
        status,
        subscription_id,
        type,
        updated_at,
        onClose,
        old_price
    } = props || {}
    const {locale} = useAppSelector(s => s)


    return (
        <div className={styles.wrapper}>
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <div className={styles.title}>{locale?.popups?.promo?.title}</div>
                </Col>
                <Col span={24}>
                    <div className={styles.card}>
                        <div className={styles.main}>
                            <div className={styles.credits}>
                                {credits} {locale?.popups?.promo?.credits}
                            </div>
                            {
                                benefit && (
                                    <div className={styles.benefit}>{locale?.popups?.promo?.benefit} {benefit}%</div>
                                )
                            }
                            <div className={styles.price}>
                                <span className={styles.actual}>${price}</span>
                                {
                                    Number(old_price) > 0 && (
                                        <span className={styles.old}>${old_price}</span>
                                    )
                                }
                            </div>
                            <div className={styles.action}>
                                <Button
                                    text={locale?.popups?.promo?.buy}
                                    middle
                                    onClick={() => {
                                        Router.push('/deposit-mb?tab=3')
                                        onClose && onClose()
                                    }}
                                    />
                            </div>
                        </div>
                        <div className={styles.image}>
                            <Image
                                src={img}
                                alt=""
                                width={170}
                                height={155}
                                />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default PromoCard;