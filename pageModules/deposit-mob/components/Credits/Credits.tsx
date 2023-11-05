import { FC, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Image from 'next/image';
import mcafee from '@/public/assets/images/mcafee.svg';
import norton from '@/public/assets/images/norton.svg'
import ApiService from '@/service/apiService';
import * as _ from 'lodash'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Button from '@/components/Button/Button';
import PayForm from '@/pageModules/deposit/components/PayForm/PayForm';
import { useWindowSize } from 'usehooks-ts';
import { PulseLoader } from 'react-spinners';
import {RiMoneyDollarCircleFill} from 'react-icons/ri';
import styles from './Credits.module.scss'

const service = new ApiService()
const PUBLIC_KEY = 'pk_live_51MzlPfFjkPZRdnX1xG5oZ2f5LVylisRVV2O6Ym7c20knPF5GsjuKfcdl6fE3oXmqLIKwjhNNw4id48bpOXOC4n3R00zouqX2k9';
const PUBLIC_KEY_TEST = 'sk_test_51MzlPfFjkPZRdnX1wfytyiMDJ2b8Xg5NGPgZfLsRIJrf3GxTv1lC93kK7Gk2cYUNLBsNwnolqdIXghan7EYrJyi400dkmxVZ1Y'

interface I {
  load?: boolean,
  onAccept?: (...args:any[]) => any,
  onSelect?: (...args:any[]) => any,
  selected?: {value: number | string, type: string} | null
}

const Credits:FC<I> = ({
  load,
  onAccept,
  onSelect,
  selected
}) => {
  const { width } = useWindowSize()
  const payRef = useRef<HTMLDivElement>(null)
  const { userData, token, locale } = useAppSelector(s => s)
  const [list, setList] = useState<any[]>([])
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [promo, setPromo] = useState<any>(null)
  // const [load, setLoad] = useState(false)
  const [type, setType] = useState<string>('')
  const [listLoad, setListLoad] = useState(false)

  const [stripePromise, setStripePromise] = useState<any>(loadStripe(PUBLIC_KEY))

  const [secretKey, setSecretKey] = useState<string>('')

  const getPlans = () => {
    if (token) {
      setListLoad(true)
      service.getPayPlans(token).then(res => {
        
        const findPromo = res?.find((i:any) => i?.is_one_time == 1)
        if(findPromo) {
          setPromo(findPromo)
          setList([])
        } else {
          setList(res)
          setPromo(null)
        }
        setType('credit')
      }).finally(() => setListLoad(false))
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
    getPlans()
  }, [token])

  // const onAccept = (plan: any) => {
  //   if (token) {
  //     setSelectedPlan(plan?.id)
  //     setLoad(true)
  //     service.pay(token, {
  //       list_type: type,
  //       list_id: plan?.id
  //     }).then(res => {
  //       const clientSecret = res?.clientSecret;
  //       setSecretKey(clientSecret)
  //     }).finally(() => setLoad(false))
  //   }
  // }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
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
                        onSelect && onSelect({value: promo?.id, type: 'credit'})
                        onAccept && onAccept({value: promo?.id, type: 'credit'})
                        goToPayment()
                      }}
                      load={load && selected?.value === promo?.id}
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
                                onSelect && onSelect({value: i?.id, type: 'credit'})
                                onAccept && onAccept({value: i?.id, type: 'credit'})
                                goToPayment()
                              }}
                              load={load && selected?.value === i?.id}
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
                                onSelect && onSelect({value: i?.id, type: 'credit'})
                                onAccept && onAccept({value: i?.id, type: 'credit'})
                                goToPayment()
                              }}
                              middle={width <= 768}
                              text='Buy' 
                              load={load && selected?.value === i?.id}
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
                                onSelect && onSelect({value: i?.id, type: 'credit'})
                                onAccept && onAccept({value: i?.id, type: 'credit'})
                                goToPayment()
                              }}
                              middle={width <= 768}
                              text='Buy' 
                              load={load && selected?.value === i?.id}
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
      </div>
    </div>
  )
}

export default Credits;