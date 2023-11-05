import styles from './Main.module.scss';
import CardPremium from '../CardPremium/CardPremium';
import CardBalance from '../CardBalance/CardBalance';
import CardAdv from '../CardAdv/CardAdv';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useEffect, useState } from 'react';
import ApiService from '@/service/apiService';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import PayForm from '@/pageModules/deposit/components/PayForm/PayForm';
import notify from '@/helpers/notify';

const PUBLIC_KEY = 'pk_live_51MzlPfFjkPZRdnX1xG5oZ2f5LVylisRVV2O6Ym7c20knPF5GsjuKfcdl6fE3oXmqLIKwjhNNw4id48bpOXOC4n3R00zouqX2k9';
const PUBLIC_KEY_TEST = 'pk_test_51MzlPfFjkPZRdnX1dn6HeooarP7ShRYGfBoSNMCAfPRZPl4tCPcAljK4pn3p7W2VRm6t7VG2lB0oP6HyY7WRYDOp00ZOqNBbUJ'

const service = new ApiService()

const Main = () => {
    const {token, locale} = useAppSelector(s => s)

    const [listPrem, setListPrem] = useState<any[]>([])
    const [listSub, setListSub] = useState<any[]>([])
    const [listCred, setListCred] = useState<any[]>([])

    const [selected, setSelected] = useState<{value: string | number, type: string} | null>(null)

    const [stripePromise, setStripePromise] = useState<any>(loadStripe(PUBLIC_KEY))
    const [secretKey, setSecretKey] = useState<string>('')
    const [load, setLoad] = useState<boolean>(false)

    
    

    const getPrem = () => {
        if(token) {
            service.getPayPrems(token).then(res => {
                setListPrem(res)
            })
        }
    }
    const getSub = () => {
        if(token) {
            service.getPaySubs(token).then(res => {
                const m = res;
                const rm = m.splice(0,1)
                setListSub([...m])
            })
        }
    }
    const getCred = () => {
        if(token) {
            service.getPayPlans(token).then(res => {
                const m = res;
                const rm = m.splice(0, 2)
                setListCred([...m])
            })
        }
    }


    useEffect(() => {
        if(token) {
            getPrem()
            getSub()
            getCred()
        }
    }, [token])


    // const onAccept = () => {
    //     if(token && selected) {
    //         setLoad(true)
    //         if(selected?.type === 'credit') {
    //             service.pay(token, {
    //                 list_type: selected?.type,
    //                 list_id: selected?.value
    //             }).then(res => {
    //                 const clientSecret = res?.clientSecret;
    //                 setSecretKey(clientSecret)
    //             }).finally(() => setLoad(false))
    //         }
    //         if(selected?.type === 'premium') {
    //             service.payS(token, {
    //                 list_type: selected?.type,
    //                 list_id: selected?.value
    //             }).then(res => {
    //                 if(res?.message === 'success') {
    //                     if(selected?.value == 1) process?.browser && window.location?.replace(window?.location?.origin + '/pay_success_prem1')
                        
    //                     if(selected?.value == 2) process?.browser && window.location?.replace(window?.location?.origin + '/pay_success_prem2')
                        
    //                     if(selected?.value == 3) process?.browser && window.location?.replace(window?.location?.origin + '/pay_success_prem3')
    //                 } else {
    //                     notify(locale?.global?.notifications?.error_default, 'ERROR')
    //                 }
    //             }).finally(() => setLoad(false))
    //         }
    //         if(selected?.type === 'subscription') {
    //             service.payS(token, {
    //                 list_type: selected?.type,
    //                 list_id: selected?.value
    //             }).then(res => {
    //                 if(res?.message === 'success') {
    //                     if(selected?.value == 4) process?.browser && window.location?.replace(window?.location?.origin + '/pay_success_sub2')
    //                     if(selected?.value == 5) process?.browser && window.location?.replace(window?.location?.origin + '/pay_success_sub3')
    //                     if(selected?.value == 6) process?.browser && window.location?.replace(window?.location?.origin + '/pay_success_sub4')
    //                 } else {
    //                     notify(locale?.global?.notifications?.error_default, 'ERROR')
    //                 }
                    
    //             }).finally(() => setLoad(false))
    //         }
           
    //     }
    // }

    const onAccept = () => {
        if(token && selected) {
            setLoad(true)
            if(selected?.type === 'credit') {
                service.pay(token, {
                    list_type: selected?.type,
                    list_id: selected?.value
                }).then(res => {
                    const clientSecret = res?.clientSecret;
                    setSecretKey(clientSecret)
                }).finally(() => setLoad(false))
            }
            if(selected?.type === 'premium') {
                service.pay(token, {
                    list_type: selected?.type,
                    list_id: selected?.value
                }).then(res => {
                    if(res?.clientSecret) {
                      const clientSecret = res?.clientSecret;
                      setSecretKey(clientSecret)
                    } else notify(locale?.global?.notifications?.error_default, 'ERROR')
                }).finally(() => setLoad(false))
            }
            if(selected?.type === 'subscription') {
                service.pay(token, {
                    list_type: selected?.type,
                    list_id: selected?.value
                }).then(res => {
                    if(res?.clientSecret) {
                      const clientSecret = res?.clientSecret;
                      setSecretKey(clientSecret)
                    } else notify(locale?.global?.notifications?.error_default, 'ERROR')
                }).finally(() => setLoad(false))
            }
           
        }
      }

      useEffect(() => {
        setSecretKey('')
      }, [selected])

    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.in}>
                <div className={styles.item}>
                    <CardPremium 
                        load={load}
                        onAccept={onAccept}
                        onSelect={setSelected}
                        selected={selected}
                        list={listPrem}/>
                </div>
                <div className={styles.item}>
                    <CardAdv 
                        load={load}
                        onAccept={onAccept}
                        onSelect={setSelected}
                        selected={selected}
                        list={listSub}/>
                </div>
                <div className={styles.item}>
                    <CardBalance 
                        load={load}
                        onAccept={onAccept}
                        onSelect={setSelected}
                        selected={selected}
                        list={listCred}/>
                </div>
            </div>
            <div className={styles.body}>
                {
                    !load && (
                        (secretKey && stripePromise && selected) && (
                            <Elements
                                stripe={stripePromise}
                                options={{clientSecret: secretKey, locale: 'en'}}
                                >
                                <PayForm type={selected?.type} plan={selected?.value}/>
                            </Elements>
                        ) 
                    )
                }
            </div>
        </div>
    )
}


export default Main;