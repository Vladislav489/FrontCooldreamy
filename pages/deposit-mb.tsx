import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect, useState, useRef } from "react";
import Tabs from "@/pageModules/deposit-mob/components/Tabs/Tabs";
import {Row, Col} from 'antd';
import CardPremium from "@/pageModules/premium/CardPremium/CardPremium";
import CardAdv from "@/pageModules/premium/CardAdv/CardAdv";
import { loadStripe } from "@stripe/stripe-js";
import ApiService from "@/service/apiService";
import { useAppSelector } from "@/hooks/useTypesRedux";
import notify from "@/helpers/notify";
import { Elements } from "@stripe/react-stripe-js";
import PayForm from "@/pageModules/deposit/components/PayForm/PayForm";
import { useFetch, useWindowSize } from "usehooks-ts";
import Main from "@/pageModules/deposit/components/Main/Main";
import Router, { useRouter } from "next/router";
import styles from '../pageModules/deposit-mob/components/Main/Main.module.scss';
import getClassNames from "@/helpers/getClassNames";
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi'
import Credits from "@/pageModules/deposit-mob/components/Credits/Credits";
import PrivateRoute from "@/hoc/PrivateRoute";
import PayModal from "@/popups/PayModal/PayModal";
const service = new ApiService()

const PUBLIC_KEY = 'pk_live_51MzlPfFjkPZRdnX1xG5oZ2f5LVylisRVV2O6Ym7c20knPF5GsjuKfcdl6fE3oXmqLIKwjhNNw4id48bpOXOC4n3R00zouqX2k9';
const PUBLIC_KEY_TEST = 'pk_test_51MzlPfFjkPZRdnX1dn6HeooarP7ShRYGfBoSNMCAfPRZPl4tCPcAljK4pn3p7W2VRm6t7VG2lB0oP6HyY7WRYDOp00ZOqNBbUJ'

const DepositPage = () => {
  const {width} = useWindowSize()
  const {query} = useRouter()
  const payRef = useRef<HTMLDivElement>(null)
  const {token, locale, userData} = useAppSelector(s => s)
  const [activeTab, setActiveTab] = useState<any>('2')
  
  const [selected, setSelected] = useState<{value: string | number, type: string} | null>({value: 5, type: 'subscription'})

  const [listPrem, setListPrem] = useState<any[]>([])
  const [listSub, setListSub] = useState<any[]>([])
  const [listCred, setListCred] = useState<any[]>([])

  const [stripePromise, setStripePromise] = useState<any>(loadStripe(PUBLIC_KEY))
  const [secretKey, setSecretKey] = useState<string>('')
  const [load, setLoad] = useState<boolean>(false)

  const [type, setType] = useState<string>('')
  const [list, setList] = useState<any[]>([])
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [promo, setPromo] = useState<any>(null)

  const [modal, setModal] = useState(false)
  

  const getPlans = () => {
    if(token) {
        service.getPayPlans(token).then(res => {
            setList(res)
            setType('credit')
        })
    }
  }

  useEffect(() => {
    if(query && query?.tab) {
      const tab = query?.tab
      setActiveTab(tab) 
      // if(tab === '2') {
      //   setSelected({value: 5, type: 'subscription'})
      // } else {
      //   setSelected(null)
      // }
    } else Router.push('deposit-mb?tab=2')
  }, [query])

  useEffect(() => {
    if(activeTab === '1') {
      if(listPrem?.length > 0) {
        setSelected({value: listPrem[1]?.id, type: 'premium'})
      }
    }
    if(activeTab === '2') {
      if(listSub) {
        setSelected({value: listSub[1]?.id, type: 'subscription'})
      }
    }
    if(activeTab === '3') {
      setSelected(null)
    }
    
  }, [activeTab, listPrem, listSub])

  useEffect(() => {
    setSecretKey('')
  }, [selected])

  const getPromo = () => {
      if(token) {
          service.getPromo(token).then(res => {
              if(res?.data?.length > 0) {
                  setPromo(res?.data[0]?.promotion)
                  setType('promotion')
              } else {
                  getPlans()
                  setType('credit')
              }
          })
      }
  }

  const getPrem = () => {
    if(token) {
      service.getPayPrems(token).then(res => {
        const findItem = res?.find((i:any) => i?.one_time === 1)
        const filtered = res?.filter((i:any) => i?.one_time === 0)
        if(findItem) {
            setListPrem(filtered?.map((i:any, index: number) => index === 0 ? findItem : i))
        } else {
            setListPrem(filtered)
        }
      })
    }
  }

  const getSub = () => {
    if(token) {
      service.getPaySubs(token).then(res => {
        const findItem = res?.find((i:any) => i?.one_time === 1)
        const filtered = res?.filter((i:any) => i?.one_time === 0)
        if(findItem) {
          setListSub(filtered?.map((i:any, index: number) => index === 0 ? findItem : i))
        } else {
          setListSub(filtered)
        }
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

  const onAccept = (plan:{value:number | string, type: string}) => {
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
    if(token && !selected && plan) {
      setLoad(true)
      service.pay(token, {
        list_type: plan?.type,
        list_id: plan?.value
      }).then(res => {
          const clientSecret = res?.clientSecret;
          setSecretKey(clientSecret)
      }).finally(() => setLoad(false))
    }
  }

  useEffect(() => {
    if(userData && userData?.is_donate === 1) {
        getPlans()
    } 
    if(userData && userData?.is_donate === 0) {
        getPromo()
    }
  }, [token, userData])

  useEffect(() => {
    if(token) {
      getSub()
      getCred()
      getPrem()
    }
  }, [token])

  useEffect(() => {
    setSecretKey('')
  }, [selectedPlan])

  const switchTabs = () => {
    switch(activeTab) {
      case '1':
        return <CardPremium 
                  load={load}
                  onAccept={onAccept}
                  onSelect={setSelected}
                  selected={selected}
                  list={listPrem}
                  />
      case '2':
        return <CardAdv 
                  load={load}
                  onAccept={onAccept}
                  onSelect={setSelected}
                  selected={selected}
                  list={listSub}
                  />
      case '3':
        return <Credits
                  load={load}
                  onAccept={onAccept}
                  onSelect={setSelected}
                  selected={selected}
                  />
      default:
        return null
    }
  }


  const onPrev = () => {
    if(activeTab === '2') Router.push('deposit-mb?tab=1')
    if(activeTab === '3') Router.push('deposit-mb?tab=2')
  }

  const onNext = () => {
    if(activeTab === '1') Router.push('deposit-mb?tab=2')
    if(activeTab === '2') Router.push('deposit-mb?tab=3')
  }

  const switchNavLabel = () => {
    switch(activeTab) {
      case '1':
        return {
          prev: null,
          next: 'Premium'
        }
      case '2':
        return {
          prev: 'VIP',
          next: 'Credits'
        }
      case '3':
        return {
          prev: 'Premium',
          next: null
        }
    }
  }

  useEffect(() => {
    if(!load && secretKey && stripePromise && selected?.type && (width > 0 && width <= 768)) {
      setModal(true)
    } else {
      setModal(false)
    }
  }, [load, secretKey, stripePromise, selected, width])

  return (
    <PrivateRoute>
      <PayModal
        customProps={{
          secretKey,
          stripePromise,
          plan: selected
        }}
        open={modal}
        onCancel={() => {
          setSecretKey('')
          setModal(false)
        }}
        />
      <Container>
      <MainLayout>
        <Sidebar/>
        <div className={styles.d}>
          <Row gutter={[20,20]}>
            <Col span={24}>
              <Tabs
                activeTab={activeTab}
                onChange={setActiveTab}
                />
            </Col>
            <Col span={24}>
              <div className={styles.wrapper}>
                <button onClick={onPrev} className={getClassNames([styles.nav, styles.prev, activeTab === '1' && styles.disabled])}>
                  <div className={styles.icon}>
                    <FiArrowLeft/>
                  </div>
                  <div className={styles.label}>
                    {switchNavLabel()?.prev}
                  </div>
                </button>
                <div className={styles.body}>
                  {switchTabs()}
                </div>
                <button onClick={onNext} className={getClassNames([styles.nav, styles.next, activeTab === '3' && styles.disabled])}>
                  <div className={styles.icon}>
                    <FiArrowRight/>
                  </div>
                  <div className={styles.label}>
                    {switchNavLabel()?.next}
                  </div>
                </button>
              </div>
            </Col>
            {
              <Col span={24}>
                <div>
                  {
                    (!load && secretKey && stripePromise && selected?.type && width > 768) && (
                        <Elements
                            stripe={stripePromise}
                            options={{clientSecret: secretKey, locale: 'en'}}
                            >
                            <PayForm secretKey={secretKey} type={selected?.type} plan={selected?.value}/>
                        </Elements>
                    ) 
                  }
                </div>
              </Col>
            }
          </Row>
        </div>
      </MainLayout>
    </Container>
    </PrivateRoute>
  )
}

export default DepositPage;