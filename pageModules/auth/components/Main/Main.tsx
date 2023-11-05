import styles from './Main.module.scss';
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { useWindowSize } from 'usehooks-ts';
import ApiService from '@/service/apiService';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import { updateToken, updateUserId } from '@/store/actions';
import LOCAL_STORAGE from '@/helpers/localStorage';
import Router from 'next/router';
import notify from '@/helpers/notify';
import LimitModal from '@/popups/LimitModal/LimitModal';

const service = new ApiService;

const Main: FC<any> = () => {
  const { locale } = useAppSelector(s => s)


  const dispatch = useAppDispatch()
  const { width } = useWindowSize()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [load, setLoad] = useState(false)
  const [blocked, setBlocked] = useState(false)

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const onSubmit = () => {
    if (password && email) {
      setLoad(true)
      service.login({ email, password }).then(res => {
        if (res?.token) {
          LOCAL_STORAGE?.setItem('cooldate-web-token', res?.token)
          LOCAL_STORAGE?.setItem('cooldate-web-user-id', res?.id)
          dispatch(updateToken(res?.token))
          dispatch(updateUserId(res?.id))
          if (width <= 768) {
            Router.push('/feed')
          } else {
            Router.push('/search')
          }
          setErrors({
            email: '',
            password: ''
          })
        } else {
          if (res?.error === 'BLOCKED') {
            setBlocked(true)
          }
          notify(locale?.global?.notifications?.error_default, 'ERROR')
        }
        if (res?.error) {
          setErrors(s => {
            return {
              ...res?.error
            }
          })
        }
      }).finally(() => setLoad(false))
    }
  }

  useEffect(() => {
    if (width !== 0 && width > 768) {
      Router.push('/start')
    }
  }, [width])

  if (width !== 0 && width <= 768) {
    return (
      <div className={styles.wrapper}>
        <LimitModal
          text='User blocked!'
          open={blocked}
          onCancel={() => setBlocked(false)}
        />
        <div className={styles.form}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <h3 className={styles.title}>Log in</h3>
            </Col>
            <Col span={24}>
              <Input
                placeholder='E-mail'
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </Col>
            <Col span={24}>
              <Input
                placeholder='Password'
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                type='password'
              />
            </Col>
            <Col span={24}>
              <div className={styles.action}>
                <Button
                  text='Log in'
                  middle={width <= 768 && width > 0}
                  onClick={onSubmit}
                  load={load}
                  disabled={!(email && password)}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

  return null

}

export default Main;