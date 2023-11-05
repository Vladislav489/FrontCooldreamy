import {Modal, ModalFuncProps} from 'antd';
import {FC, useState} from 'react';
import styles from './LoginModal.module.scss';
import {Row, Col} from 'antd';
import Input from '../Input/Input';
import Button from '../Button/Button';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { updateToken, updateUserId } from '@/store/actions';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import notify from '@/helpers/notify';
import { useWindowSize } from 'usehooks-ts';
import LimitModal from '@/popups/LimitModal/LimitModal';
import LOCAL_STORAGE from '@/helpers/localStorage';
import ResetPassModal from '@/popups/ResetPassModal/ResetPassModal';

const service = new ApiService()

const LoginModal:FC<ModalFuncProps> = (props) => {
    const [resetModal, setResetModal] = useState(false)
    const {locale} = useAppSelector(s => s)
    const {width} = useWindowSize() 
    const [blocked, setBlocked] = useState(false)

    const dispatch = useDispatch()
    const {onCancel} = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [load, setLoad] = useState(false)

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const onClose = () => {
        setErrors({
            email: '',
            password: ''
        })
        setEmail('')
        setPassword('')
        onCancel && onCancel()
    }

    const onSubmit = () => {
        setLoad(true)
        service.login({
            email,
            password
        }).then(res => {
            if(res?.token) {
                LOCAL_STORAGE?.setItem('cooldate-web-token', res?.token)
                LOCAL_STORAGE?.setItem('cooldate-web-user-id', res?.id)
                dispatch(updateToken(res?.token))
                dispatch(updateUserId(res?.id))
                
                if(width <= 768 && width > 0) {
                    Router.push('/feed')
                }
                if(width > 768) {
                    Router.push('/search')
                }
                onClose()
                setErrors({
                    email: '',
                    password: ''
                })
                
            } else {
                if(res?.error === 'BLOCKED') {
                    setBlocked(true)
                } 
                notify(locale?.global?.notifications?.error_default, 'ERROR')
            }
            if(res?.error) {
                setErrors(s => {
                    return {
                        ...res?.error
                    }
                })
            }

        }).finally(() => {
            setLoad(false)
            
        })
    }




    return (
        <>
            <ResetPassModal
                open={resetModal}
                onCancel={() => setResetModal(false)}
                />
            <LimitModal
                text='User blocked!'
                open={blocked}
                onCancel={() => setBlocked(false)}
                />
            <Modal
            {...props}
            width={400}
            onCancel={onClose}
            className={`${styles.wrapper} modal`}
            title={locale?.popups?.login?.title}
            footer={false}
            >

            <Row gutter={[20,20]}>
                <Col span={24}>
                    <Input
                        error={errors.email ? true : false}
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder='E-mail'
                        />
                    {errors?.email && <div className={styles.error}>{errors?.email}</div>}
                </Col>
                <Col span={24}>
                    <Input
                        error={errors.password ? true : false}
                        value={password}
                        type={'password'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        placeholder={locale?.popups?.login?.fields?.password}
                        />
                    {errors?.password && <div className={styles.error}>{errors?.password}</div>}
                </Col>
                <Col span={24}>
                    <div className={styles.ex}>
                        {/* <span onClick={() => {
                            onClose()
                            Router.push('/signup')
                        }} className={styles.item}>{locale?.popups?.login?.links.register}</span> */}
                        <span onClick={() => {
                            setResetModal(true)
                            onClose()
                        }} className={styles.item}>{locale?.popups?.login?.links?.forgot_password}</span>
                    </div>
                </Col>
                <Col span={24}>
                    <Button
                        middle={width <= 768}
                        onClick={onSubmit}
                        load={load}
                        disabled={!(email && password)}
                        text={locale?.popups?.login?.login_btn}
                        style={{width: '100%'}}
                        />
                </Col>
            </Row>
        </Modal>
        </>
        
    )
}


export default LoginModal