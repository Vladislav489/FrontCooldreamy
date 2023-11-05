import styles from './donateStatus.module.scss';
import { FC, useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/useTypesRedux';
import getClassNames from '@/helpers/getClassNames';
import Button from '../Button/Button';
import ApiService from '@/service/apiService';
import moment from 'moment';
import Router from 'next/router';
const service = new ApiService()


//SUBSCRIBE
export const StatusPremium:FC<any> = () => {
  const {userData, token, currentVip} = useAppSelector(s => s)
  const [deadline, setDeadLine] = useState<any>(null)

  useEffect(() => {
    if(currentVip) {
      const dateFrom = moment.utc()
      const dateNow = moment.utc(currentVip.period_end)

      const diff = dateNow.diff(dateFrom)
      const start = moment.utc(diff).valueOf()
      if(moment.utc(start).get('hours') >= 24) {
        setDeadLine(`${Math.floor(moment.utc(start).get('hours') / 24).toString()}d`)
      }
      if(moment.utc(start).get('hours') < 24 && moment.utc(start).get('hours') >= 1) {
        setDeadLine(`${moment.utc(start).format('HH')}h ${moment.utc(start).format('mm')}min`)
      }
      if(moment.utc(start).get('hours') < 1) {
        setDeadLine(moment.utc(start).get('minutes') + 'min')
      }
    }
  }, [currentVip])

  return (
    <div className={getClassNames([styles.wrapper, styles.premium])}>
      <div className={styles.main}>
        <div className={styles.icon}>
          
        </div>
        <div className={styles.body}>
          <div className={styles.title}>VIP-status</div>
          <div className={styles.value}>
          {currentVip && deadline ? 'Active' : 'Not active'}
          </div>
        </div>
      </div>
      <div className={styles.action}>
        {/* <Button
          middle
          style={{padding: '7px 5px', backgroundColor: '#F5F5F5'}}
          fill
          variant={'white'}
          text={'3 д. 18:33'}
          /> */}
        <Button
          text={deadline ? deadline : 'Activate'}
          variant={'gold'}
          middle
          style={{padding: '7px 5px'}}
          onClick={() => {
            if(currentVip) {
              
            } else {
              Router.push('/deposit-mb?tab=1')
            }
          }}
          fill
          />
      </div>
    </div>
  )
}


//PREMIUM
export const StatusVip:FC<any> = () => {
  const {userData, currentSub} = useAppSelector(s => s)
  const [deadline, setDeadLine] = useState<any>(null)

  useEffect(() => {
    if(currentSub) {
      const dateFrom = moment.utc()
      const dateNow = moment.utc(currentSub.period_end)

    const diff = dateNow.diff(dateFrom)
    const start = moment.utc(diff).valueOf()
    if(moment.utc(start).get('hours') >= 24) {
      setDeadLine(`${Math.floor(moment.utc(start).get('hours') / 24).toString()}d`)
    }
    if(moment.utc(start).get('hours') < 24 && moment.utc(start).get('hours') >= 1) {
      setDeadLine(`${moment.utc(start).format('HH')}h ${moment.utc(start).format('mm')}min`)
    }
    if(moment.utc(start).get('hours') < 1) {
      setDeadLine(moment.utc(start).get('minutes') + 'mins')
    }
    }
  },[currentSub])

  const {
    is_premium
  } = userData || {}

  return (
    <div className={getClassNames([styles.wrapper, styles.vip])}>
      <div className={styles.main}>
        <div className={styles.icon}>
          
        </div>
        <div className={styles.body}>
          <div className={styles.title}>Premium</div>
          <div className={styles.value}>
            {currentSub && deadline ? `Active` : 'Not active'}
          </div>
        </div>
      </div>
      <div className={styles.action}>
        <Button
          text={deadline ? deadline : 'Activate'}
          onClick={() => {
            if(currentSub) {
              
            } else {
              Router.push('/deposit-mb?tab=2')
            }
          }}
          middle
          style={{padding: '7px 5px', backgroundColor: '#1E85FE', color: '#fff'}}
          variant={'white'}
          fill
          />
      </div>
    </div>
  )
}


//CREDITS
export const StatusCredits:FC<any> = () => {
  const {userData, credits} = useAppSelector(s => s)
  

  return (
    <div className={getClassNames([styles.wrapper, styles.credits])}>
      <div className={styles.main}>
        <div className={styles.icon}>
          
        </div>
        <div className={styles.body}>
          <div className={styles.title}>Credits</div>
          <div className={styles.value}><b>{credits}</b></div>
        </div>
      </div>
      <div className={styles.action}>
        <Button
          text='Buy'
          style={{padding: '7px 5px'}}
          onClick={() => Router.push('/deposit-mb?tab=3')}
          middle
          fill
          />
      </div>
    </div>
  )
}