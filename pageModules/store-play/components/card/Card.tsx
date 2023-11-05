import styles from './Card.module.scss';
import { FC, useEffect, useState } from 'react'
import logo from '@/public/assets/images/store-app-icon.svg';
import Image from 'next/image';
import Button from '../button/Button';
import { useWindowSize } from 'usehooks-ts';
import { Row, Col } from 'antd';
import getClassNames from '@/helpers/getClassNames';
import Router, { useRouter } from 'next/router';
import img1 from '@/public/assets/images/store-slide-1.png'
import img2 from '@/public/assets/images/store-slide-2.png'
import img3 from '@/public/assets/images/store-slide-3.png'
import img4 from '@/public/assets/images/store-slide-4.png'
import img5 from '@/public/assets/images/store-slide-5.png'
import { updateConversData } from '@/store/actions';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';
import LOCAL_STORAGE from '@/helpers/localStorage';
import ApiService from '@/service/apiService';
const service = new ApiService()
type statusType = 'INIT' | 'WAIT' | 'LOADING' | 'INSTALL' | 'DONE';

const Card: FC<any> = () => {
  const dispatch = useAppDispatch()
  const {conversData, token} = useAppSelector(s => s)
  const [status, setStatus] = useState<statusType>('INIT')
  const {query} = useRouter()
  const { width } = useWindowSize()
  const [install, setInstall] = useState<any>(null)
  const [pwaPermission, setPwaPermission] = useState<boolean>(false)
  const [regData, setRegData] = useState<{af_id?:any,app_name:any, subid:any} | null>(null)

  const switchVendorPlace = () => {
    switch (status) {
      case 'INIT':
        return 'SOLUTIONS INC.'
      case 'WAIT':
        return <><span>Wait...</span></>
      case 'LOADING':
        return <><span> of 28,84 MB</span></>
      case "INSTALL":
        return <><span>Installation...</span></>
      case 'DONE':
        return 'SOLUTIONS INC.'
    }
  }

  useEffect(() => {
    dispatch(updateConversData({
      af_id: query?.af_id,
      app_name: query?.app_name,
      subid: query?.subid
    }))
    const obj = {
      af_id: query?.af_id,
      app_name: query?.app_name,
      subid: query?.subid
    }
    LOCAL_STORAGE?.setItem('conversData', JSON.stringify(obj))
    if(!query?.af_id && !query?.app_name && !query?.subid) {
      dispatch(updateConversData(null))
    }
  }, [query])


  useEffect(() => {
    let tm: any;
    clearTimeout(tm)
    if (status && pwaPermission &&  status !== 'INIT' && status !== 'DONE') {
      tm = setTimeout(() => {
        if (status === 'WAIT') {
          setStatus('LOADING')
        }
        if (status === 'LOADING') {
          setStatus('INSTALL')
        }
        if (status === 'INSTALL') {
          setStatus('DONE')
        }
      }, 5000)
    }

    return () => {
      clearTimeout(tm)
    }
  }, [status, pwaPermission])

  
  

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', getInstallEvent)

    return () => {
      window.removeEventListener('beforeinstallprompt', getInstallEvent)
    }
  }, [])

  const getInstallEvent = (e: any) => {
    e?.preventDefault()
    setInstall(e)
  }

  const onInstall = () => {
    if (install) {
      
      install?.prompt()
      install?.userChoice.then((choiceResult: any) => {
        if (choiceResult?.outcome === 'accepted') {
          LOCAL_STORAGE?.setItem('isPwaInstalled', '1')
          if(token) {
            service.setPwa(token)
          }
          alert('PWA INSTALLED')
          setPwaPermission(true)
        } else {
          setInstall(null)
          setStatus('INIT')
        }
        setInstall(null)
      })
    }
  }

  const goToStart = () => {
    Router.push('/start')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.app}>
          <div className={getClassNames([styles.icon, (status !== 'INIT' && status !== 'DONE') && styles.active])}>
            {
              (status !== 'INIT' && status !== 'DONE') && (
                <div className={getClassNames([
                  styles.circle,
                  status === 'WAIT' && styles.wait,
                  status === 'LOADING' && styles.loading,
                  status === 'INSTALL' && styles.install
                ])}>
                  {
                    status === 'LOADING' && (
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle stroke-linecap="round" cx="50" cy="50" r="48" stroke="#00875F" stroke-width="4" fill="none" stroke-dasharray="315" stroke-dashoffset="100" stroke-mitterlimit="0" transform="rotate(-90 ) translate(-100 0)" />
                      </svg>
                    )
                  }
                </div>
              )
            }
            <div className={styles.icon_img}>
              <Image
                src={logo}
                alt=''
              />
            </div>
          </div>
          <div className={styles.app_descr}>
            <div className={styles.app_name}>CoolDreamy: Chat, Meet People</div>
            <div className={styles.app_vendor}>
              {
                status === 'LOADING' && (
                  <span>75%</span>
                )
              }
              {switchVendorPlace()}
            </div>
          </div>
        </div>
        {
          (status === 'INIT') && (
            <div className={styles.main_action}>
              <Button 
                onClick={() => {
                  if(install) {
                    setStatus('WAIT')
                    onInstall()
                  }
                }}
                
                >
                Install
              </Button>
            </div>
          )
        }
      </div>
      <div className={styles.ex}>
        <div className={styles.ex_part}>
          <div className={styles.ex_top}>
            <div className={styles.ex_label}>4.7</div>
            <div className={styles.ex_icon}></div>
          </div>
          <div className={styles.ex_text}>364К reviews</div>
        </div>
        <div className={styles.ex_part}>
          <div className={styles.ex_top}>
            <div className={styles.ex_icon}></div>
          </div>
          <div className={styles.ex_text}>39 МB</div>
        </div>
        <div className={styles.ex_part}>
          <div className={styles.ex_top}>
            <div className={styles.ex_icon}></div>
          </div>
          <div className={styles.ex_text}>18+ </div>
        </div>
        <div className={styles.ex_part}>
          <div className={styles.ex_top}>
            <div className={styles.ex_label}>1M+</div>
          </div>
          <div className={styles.ex_text}>Downloads</div>
        </div>
      </div>
      <div className={styles.action}>
        {
          (status === 'INIT' && width <= 768 && width > 0) && 
          <Button  onClick={() => {
            if(install) {
              setStatus('WAIT')
            onInstall()
            }
          }} isFill>Install</Button>
        }
        {
          (status === 'WAIT' || status === 'LOADING') && (
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <Button
                  isFill
                  variant={'outlined'}>Delete</Button>
              </Col>
              <Col span={12}>
                <Button
                  isFill
                  onClick={goToStart}
                  disabled>Open</Button>
              </Col>
            </Row>
          )
        }
        {
          status === 'INSTALL' && (
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <Button
                  isFill
                  variant={'outlined'}
                  disabled>Delete</Button>
              </Col>
              <Col span={12}>
                <Button
                  isFill
                  onClick={goToStart}
                  disabled>Open</Button>
              </Col>
            </Row>
          )
        }
        {
          status === 'DONE' && (
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <Button
                  isFill
                  variant={'outlined'}>Delete</Button>
              </Col>
              <Col span={12}>
                <Button
                  onClick={goToStart}
                  isFill>Open</Button>
              </Col>
            </Row>
          )
        }
      </div>
      <FancyboxWrapper
        options={{
          Toolbar:false,
          Slideshow:false,
        }}
        >
        <div className={styles.slider}>
          <a data-fancybox="gallery" href={img1.src} className={styles.slide}>
            <Image
              src={img1}
              alt=''
              placeholder='blur'
              />
          </a>
          <a data-fancybox="gallery" href={img2.src} className={styles.slide}>
            <Image
              src={img2}
              alt=''
              placeholder='blur'
              />
          </a>
          <a data-fancybox="gallery" href={img3.src} className={styles.slide}>
            <Image
              src={img3}
              alt=''
              placeholder='blur'
              />
          </a>
          <a data-fancybox="gallery" href={img4.src} className={styles.slide}>
            <Image
              src={img4}
              alt=''
              placeholder='blur'
              />
          </a>
          <a data-fancybox="gallery" href={img5.src} className={styles.slide}>
            <Image
              src={img5}
              alt=''
              placeholder='blur'
              />
          </a>
        </div>
        
      </FancyboxWrapper>
     
    </div>
  )
}

export default Card;