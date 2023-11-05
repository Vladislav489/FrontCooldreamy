import { useEffect, useRef, useState } from 'react';
import styles from './Main.module.scss';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Image from 'next/image';
import mcafee from '@/public/assets/images/mcafee.svg';
import norton from '@/public/assets/images/norton.svg'
import ApiService from '@/service/apiService';
import * as _ from 'lodash'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Button from '@/components/Button/Button';
import PayForm from '../PayForm/PayForm';
import { useWindowSize } from 'usehooks-ts';
import { PulseLoader } from 'react-spinners';
import {RiMoneyDollarCircleFill} from 'react-icons/ri';

const service = new ApiService()
const PUBLIC_KEY = 'pk_live_51MzlPfFjkPZRdnX1xG5oZ2f5LVylisRVV2O6Ym7c20knPF5GsjuKfcdl6fE3oXmqLIKwjhNNw4id48bpOXOC4n3R00zouqX2k9';
const PUBLIC_KEY_TEST = 'sk_test_51MzlPfFjkPZRdnX1wfytyiMDJ2b8Xg5NGPgZfLsRIJrf3GxTv1lC93kK7Gk2cYUNLBsNwnolqdIXghan7EYrJyi400dkmxVZ1Y'

const Main = () => {
  const { width } = useWindowSize()
  const payRef = useRef<HTMLDivElement>(null)
  const { userData, token, locale } = useAppSelector(s => s)
  const [list, setList] = useState<any[]>([])
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [promo, setPromo] = useState<any>(null)
  const [load, setLoad] = useState(false)
  const [type, setType] = useState<string>('')
  const [listLoad, setListLoad] = useState(false)

  const [stripePromise, setStripePromise] = useState<any>(loadStripe(PUBLIC_KEY))

  const [secretKey, setSecretKey] = useState<string>('')

  const getPlans = () => {
    if (token) {
      setListLoad(true)
      service.getPayPlans(token).then(res => {
        setList(res)
        setType('credit')
      }).finally(() => setListLoad(false))
    }
  }

  const getPromo = () => {
    if (token) {
      service.getPromo(token).then(res => {
        if (res?.data?.length > 0) {
          setPromo(res?.data[0]?.promotion)
          setType('promotion')
        } else {
          getPlans()
          setType('credit')
        }
      })
    }
  }

  useEffect(() => {
    setSecretKey('')
  }, [selectedPlan])

  useEffect(() => {
    setSecretKey('')
  }, [selectedPlan])

  const goToPayment = () => {
    if (width <= 768) {
      const top = payRef?.current?.getBoundingClientRect()?.top;
      if (typeof top === 'number') {
        document.documentElement.scrollTo(0, top)
      }
    }
  }

  useEffect(() => {
    if (userData && userData?.is_donate === 1) {
      getPlans()
    }
    if (userData && userData?.is_donate === 0) {
      getPromo()
    }
  }, [token, userData])

  const onAccept = (plan: any) => {
    if (token) {
      setSelectedPlan(plan?.id)
      setLoad(true)
      service.pay(token, {
        list_type: type,
        list_id: plan?.id
      }).then(res => {
        const clientSecret = res?.clientSecret;
        setSecretKey(clientSecret)
      }).finally(() => setLoad(false))
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.head}>{locale?.depositPage?.main?.title}</div>
        <div className={styles.balance}>{locale?.depositPage?.main?.my_balance} <span>{userData?.credits} {locale?.depositPage?.card?.credits}</span></div>
        {
          promo && (
            <div className={`${styles.list} ${styles.one}`}>
              <div className={`${styles.item_wr} ${selectedPlan?.id == promo?.id ? styles?.active : ''}`}>
                <div className={styles.item}>

                  <div className={styles.kl}>
                    <div className={styles.badge}>{locale?.depositPage?.card?.spec_offer}!</div>
                    <div className={styles.discount}>
                      {promo?.benefit}%
                    </div>
                    <div className={styles.credits}>
                      <div className={styles.value}>{promo?.credits}</div>
                      <div className={styles.label}>{locale?.depositPage?.card?.credits}</div>
                    </div>
                    <div className={styles.ex}>for</div>
                    <div className={styles.price}>
                      {
                        Number(promo?.old_price) > 0 && (
                          <div className={styles.old}>${promo?.old_price}</div>
                        )
                      }
                      <div className={styles.actual}>${promo?.price}</div>
                    </div>
                  </div>
                      
                  <div className={styles.action}>
                    <Button
                      onClick={() => {
                        onAccept(promo)
                        goToPayment()
                      }}
                      middle={width <= 768}
                      text='Buy' 
                      variant={'black'}/>
                  </div>

                </div>
              </div>
            </div>
          )
        }
        {
          list?.length > 0 && (
            <div className={styles.list}>
              {
                list?.map((i, index) => {
                  if (i?.id === 1) return null
                  if (i?.status === 0) {
                    return (
                      <div className={`${styles.item_wr} ${selectedPlan?.id == i?.id ? styles?.active : ''}`} key={i?.id}>
                        <div
                          className={`${styles.item}`} key={index}>
                          {
                            i?.discount !== 0 && (
                              <div className={styles.discount}>
                                -{i?.discount}%
                                {/* <span>{locale?.depositPage?.card?.discount}</span> */}
                              </div>
                            )
                          }
                          <div className={styles.adds}>

                          </div>
                          <div className={styles.credits}>
                            <div className={styles.value}>{i?.credits} 
                              <div className={styles.icon}>
                                <RiMoneyDollarCircleFill/>
                              </div>
                            </div>
                            <span>{locale?.depositPage?.card?.credits}</span>
                          </div>
                          <div className={styles.item_body}>
                            {
                              i?.discount !== 0 && (
                                <div className={styles.part}>
                                  <div className={styles.label}>{locale?.depositPage?.card?.price}</div>
                                  <div className={`${styles.value} ${styles.old}`}>{_.round(i?.price + (i?.price / 100 * i?.discount), 2)}$</div>
                                </div>
                              )
                            }
                            <div className={styles.part}>
                              <div className={styles.label}>
                                {
                                  i?.discount !== 0 ? (
                                    locale?.depositPage?.card?.discount
                                  ) : locale?.depositPage?.card?.price
                                }
                              </div>
                              <div className={styles.value}>{i?.price}$</div>
                            </div>
                          </div>
                          <div className={styles.action}>
                            <Button
                              onClick={() => {
                                onAccept(i)
                                goToPayment()
                              }}
                              middle={width <= 768}
                              text='Buy' 
                              variant={'black'}/>
                          </div>

                        </div>
                      </div>
                    )
                  }
                  if (i?.status === 1) {
                    return (
                      <div className={`${styles.item_wr} ${selectedPlan?.id == i?.id ? styles?.active : ''}`} key={i?.id}>
                        <div
                          className={`${styles.item} ${styles.pop}`}>
                          {
                            i?.discount !== 0 && (
                              <div className={styles.discount}>
                                -{i?.discount}%
                                {/* <span>{locale?.depositPage?.card?.discount}</span> */}
                              </div>
                            )
                          }
                          <div className={styles.adds}>

                            <div className={styles.badge}>
                              {locale?.depositPage?.card?.popular}
                            </div>
                          </div>
                          <div className={styles.credits}>
                            <div className={styles.value}>
                              {i?.credits}
                              <div className={styles.icon}>
                                <RiMoneyDollarCircleFill/>
                              </div>
                            </div>
                            <span>{locale?.depositPage?.card?.credits}</span>
                          </div>
                          <div className={styles.item_body}>
                            {
                              i?.discount !== 0 && (
                                <div className={styles.part}>
                                  <div className={styles.label}>{locale?.depositPage?.card?.price}</div>
                                  <div className={`${styles.value} ${styles.old}`}>{_.round(i?.price + (i?.price / 100 * i?.discount), 2)}$</div>
                                </div>
                              )
                            }
                            <div className={styles.part}>
                              <div className={styles.label}>{locale?.depositPage?.card?.discount}</div>
                              <div className={styles.value}>{i?.price}$</div>
                            </div>
                          </div>
                          <div className={styles.action}>
                            <Button
                              onClick={() => {
                                onAccept(i)
                                goToPayment()
                              }}
                              middle={width <= 768}
                              text='Buy' 
                              variant={'white'}/>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  if (i?.status === 2) {
                    return (
                      <div className={`${styles.item_wr} ${selectedPlan?.id == i?.id ? styles?.active : ''}`} key={i?.id}>
                        <div
                          className={`${styles.item} ${styles.dsc}`} key={index}>
                          {
                            i?.discount !== 0 && (
                              <div className={styles.discount}>
                                -{i?.discount}%
                                {/* <span>{locale?.depositPage?.card?.discount}</span> */}
                              </div>
                            )
                          }
                          <div className={styles.adds}>

                            <div className={styles.badge}>
                              {locale?.depositPage?.card?.spec_offer}
                            </div>
                          </div>
                          <div className={styles.credits}>
                            <div className={styles.value}>{i?.credits}</div>
                            <span>{locale?.depositPage?.card?.credits}</span>
                          </div>
                          <div className={styles.item_body}>
                            {
                              i?.discount !== 0 && (
                                <div className={styles.part}>
                                  <div className={styles.label}>{locale?.depositPage?.card?.price}</div>
                                  <div className={`${styles.value} ${styles.old}`}>{_.round(i?.price + (i?.price / 100 * i?.discount), 2)}$</div>
                                </div>
                              )
                            }

                            <div className={styles.part}>
                              <div className={styles.label}>{locale?.depositPage?.card?.discount}</div>
                              <div className={styles.value}>{i?.price}$</div>
                            </div>
                          </div>
                          <div className={styles.action}>
                            <Button
                              onClick={() => {
                                onAccept(i)
                                goToPayment()
                              }}
                              middle={width <= 768}
                              text='Buy' 
                              variant={'black'}/>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })
              }

            </div>
          )
        }
        {/*{*/}
        {/*  selectedPlan && !secretKey && (*/}
        {/*    <div className={styles.buy}>*/}
        {/*      <Button*/}
        {/*        text={`${locale?.depositPage?.select_btn} ${selectedPlan?.price}$`}*/}
        {/*        onClick={() => {*/}
        {/*          onAccept(selectedPlan)*/}
        {/*          goToPayment()*/}
        {/*        }}*/}
        {/*        variant={width <= 1200 ? 'green' : 'default'}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  )*/}
        {/*}*/}
      </div>
      <div className={styles.main}>
        <div className={styles.adv}>
          <div className={styles.fr}>
            <b>Secure credit card payment</b>
            This is a secure 128-bit SSL payment
          </div>
          <div className={styles.av}>
            <div className={styles.item}>
              <Image
                src={mcafee}
                width={152}
                height={69}
                alt='mcafee'
              />
            </div>
            <div className={styles.item}>
              <Image
                src={norton}
                width={152}
                height={69}
                alt='norton'
              />
            </div>
          </div>
        </div>
        <div ref={payRef} className={styles.field}>
          {
            load ? (
              <div className={styles.load}>
                <PulseLoader color='var(--violet)' />
              </div>
            ) : (
              (secretKey && stripePromise && selectedPlan) && (
                <Elements
                  stripe={stripePromise}
                  options={{ clientSecret: secretKey, locale: 'en' }}
                >
                  <PayForm secretKey={secretKey} type={type} plan={selectedPlan} />
                </Elements>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Main;