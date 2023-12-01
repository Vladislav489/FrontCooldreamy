import { useState } from 'react';
import styles from './PayForm.module.scss';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import {Row, Col, Input} from 'antd';
import Button from '@/components/Button/Button';
import { useAppSelector } from '@/hooks/useTypesRedux';
import notify from '@/helpers/notify';

const switchRedirect = (planId: number | string, type?: string) => {
    if(planId == '1' && type === 'promotion') {
        return `${window.location.origin}/pay_success_promo1?user_promotion_id=${planId}`
    }
    if(planId == '1' && type === 'credit') {
        return `${window.location.origin}/pay_success_credit1`
    }
    if(planId == '2' && type === 'credit') {
        return `${window.location.origin}/pay_success_credit2`
    }
    if(planId == '3' && type === 'credit') { 
        return `${window.location.origin}/pay_success_credit3`
    }
    if(planId == '4' && type === 'credit') {
        return `${window.location.origin}/pay_success_credit4`
    }
    if(planId == '5' && type === 'credit') {
        return `${window.location.origin}/pay_success_credit5`
    }
    if(planId == '1' && type === 'premium') {
        return `${window.location.origin}/pay_success_prem1`
    }
    if(planId == '2' && type === 'premium') {
        return `${window.location.origin}/pay_success_prem2`
    }
    if(planId == '3' && type === 'premium') {
        return `${window.location.origin}/pay_success_prem3`
    }
    if(planId == '4' && type === 'subscription') {
        return `${window.location.origin}/pay_success_sub2`
    }
    if(planId == '5' && type === 'subscription') {
        return `${window.location.origin}/pay_success_sub3`
    }
    if(planId == '6' && type === 'subscription') {
        return `${window.location.origin}/pay_success_sub4`
    }
    return `${window.location.origin}/deposit`
}

const PayForm = ({plan, type, secretKey}: {plan?: any, type?: string, price?: number | string, secretKey?: any}) => {
    const [payLoad, setPayLoad] = useState<boolean>(false)
    const [message, setMessage] = useState<any>(null)
    const {locale} = useAppSelector(s => s)
    const stripe = useStripe()
    const elements = useElements()
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    


    const onPay = async (e: React.ChangeEvent<HTMLFormElement>) => {
        console.log('PAY')
        e.preventDefault()
        if(!stripe || !elements) {
            return;
        }
        setPayLoad(true)
        if(stripe) {
            const {error} = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: switchRedirect(plan?.id, type),
                    payment_method_data: {
                        billing_details: {
                            name: fullName,
                            email: email
                        }
                    }
                },
                redirect: 'if_required'
            })
            const {payment_intent} = error || {}
            if(error) {
                setMessage(error)
                notify(locale?.global?.notifications?.error_default, 'ERROR')
            } else if(payment_intent && payment_intent?.status === 'succeeded') {
                setMessage("Payment status: " + payment_intent?.status + "")
            } else {
                setMessage('Unexpected state')
            }
        }
        setPayLoad(false)
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <div className={styles.title}>
                {locale?.depositPage?.form?.title}
                </div>
                <div className={styles.subtitle}>
                {locale?.depositPage?.form?.subtitle}
                </div>
            </div>
            <form id='payment-form' onSubmit={onPay}>
                <Row gutter={[15,15]}>
                    <Col span={24}>
                        <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 12}}>
                            <Input
                                placeholder="Enter your full name"
                                value={fullName}
                                required
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <Input
                                placeholder="Enter your email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <PaymentElement/>
                        </div>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                        {
                            plan?.price ? (
                                <Button
                                    type='submit'
                                    text={`${locale?.depositPage?.form?.btn} ${plan?.price}$`}
                                    load={payLoad}
                                    />
                            ) : (
                                <Button
                                    type='submit'
                                    text={`${locale?.depositPage?.form?.btn}`}
                                    load={payLoad}
                            />
                            )
                        }
                    </Col>
                </Row>
            </form>
        </div>
    )
}


export default PayForm;