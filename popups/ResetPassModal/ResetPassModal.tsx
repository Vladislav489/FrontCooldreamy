import { ChangeEvent, FC, useState } from 'react';
import styles from './ResetPassModal.module.scss';
import {Modal, ModalFuncProps, Row, Col} from 'antd'
import getClassNames from '@/helpers/getClassNames';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import { useWindowSize } from 'usehooks-ts';
import notify from '@/helpers/notify';
import { updateToken, updateUserData, updateUserId } from '@/store/actions';
import LOCAL_STORAGE from '@/helpers/localStorage';
import Router from 'next/router';

type statusType = 'INIT' | 'SENT' | 'NEWPASS'

const service = new ApiService()

const ResetPassModal:FC<ModalFuncProps> = (props) => {
  const {onCancel} = props
  const {locale} = useAppSelector(s => s)
  const dispatch = useAppDispatch()
  const {width} = useWindowSize()
  const [status, setStatus] = useState<statusType>('INIT')

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [load, setLoad] = useState(false)
  const [token, setToken] = useState('')

  const onClose = () => {
    setEmail('')
    setCode('')
    setPassword('')
    setToken('')
    setLoad(false)
    onCancel && onCancel()
  }


  const onSubmit = () => {
    setLoad(true)
    if(status === 'INIT') {
      service.getResetCode({body: {email}}).then(res => {
        if(res === 200) {
          setStatus('SENT')
        } else {
          notify(locale?.global?.notifications?.error_default)
        }
      }).finally(() => {
        setLoad(false)
      })
    }
    if(status === 'SENT') {
      service.sendReestCode({body: {email, code}}).then(res => {
        if(res.token) {
          setToken(res?.token)
          setStatus('NEWPASS')
        } else {
          notify(locale?.global?.notifications?.error_default)
        }
      }).finally(() => {
        setLoad(false)
      })
      
    }
    if(status === 'NEWPASS') {
      if(token) {
        service.changePassword({token, body: {password, password_confirmation: password}}).then(res => {
          if(res?.id) {

            const {
              credits,
              ...other
            } = res

            LOCAL_STORAGE?.setItem('cooldate-web-token', token)
            LOCAL_STORAGE?.setItem('cooldate-web-user-id', res?.id)
            dispatch(updateToken(token))
            dispatch(updateUserId(res?.id))
            
            if(width <= 768) {
              Router.push('/feed')
            } else {
              Router.push('/search')
            }
            dispatch(updateUserData({...other, free_credits: credits})) 
            
            notify('Password successfully restored')
            onCancel && onCancel()

          } else {
            notify(locale?.global?.notifications?.error_default)
          }
        }).finally(() => {
          setLoad(false)
        })
      }
    }
   
  }

  const setDisabled = () => {
    if(status === 'INIT' && !email) {
      return true
    } else if(status === 'SENT' && !code) {
      return true
    } else if(status === 'NEWPASS' && !password) {
      return true
    } else {
      return false
    }
  }


  return (
    <Modal
      {...props}
      className={getClassNames([styles.wrapper, 'modal'])}
      width={360}
      footer={false}
      >
      <Row gutter={[20,20]}>
        <Col span={24}>
          <div className={styles.head}>
            <Row gutter={[10,10]}>
              <Col span={24}>
                <div className={styles.title}>
                  {
                    status === 'NEWPASS' ? 'New password' : 'Password recovery'
                  }
                </div>
              </Col>
              <Col span={24}>
                <div className={styles.text}>
                  {status === 'INIT' && 'Enter your email, we will send an email to it.'}
                  {status === 'SENT' && 'Enter the code from the email. If the email did not arrive, check the "Spam".'}
                  {status === 'NEWPASS' && 'The password must contain at least 6 characters.'}
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24}>
          {status === 'INIT' && (
            <Input
              type='email'
              value={email}
              onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder='E-mail'
              />
          )}
          {status === 'SENT' && (
            <Input
              placeholder='Code'
              value={code}
              onChange={(e:ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
              />
          )}
          {status === 'NEWPASS' && (
            <Input
              placeholder='Password'
              value={password}
              type='password'
              onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
          )}
        </Col>
        <Col span={24}>
          <Button
            fill
            text='Done'
            onClick={onSubmit}
            disabled={setDisabled()}
            load={load}
            type='button'
            middle={width > 0 && width <= 768}
            />
        </Col>
      </Row>
    </Modal>
  )
}

export default ResetPassModal;