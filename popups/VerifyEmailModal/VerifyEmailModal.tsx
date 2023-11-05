import styles from './VerifyEmailModal.module.scss';
import {Modal, ModalFuncProps, Row, Col} from 'antd'
import {FC, useState} from 'react'
import { useAppSelector } from '@/hooks/useTypesRedux';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import img1 from '@/public/assets/icons/email-verify-1.svg'
import img2 from '@/public/assets/icons/email-verify-2.svg'
import img3 from '@/public/assets/icons/email-verify-3.svg';
import { useWindowSize } from 'usehooks-ts';
import ApiService from '@/service/apiService';
import notify from '@/helpers/notify';


interface I extends ModalFuncProps {
    onOpenEdit?: (...args:any[]) => void
}

const service = new ApiService()

const VerifyEmailModal:FC<I> = (props) => {
    const {width} = useWindowSize()
    const {onOpenEdit, ...otherProps} = props
    const {userData, token, locale} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)

    const onResendLetter = () => {
        if(token) {
            setLoad(true)
            service.sendVerifyEmail(token).then(res => {
                if(res === 200) {
                    notify('Verification letter sent', 'SUCCESS')
                } else {
                    notify(locale?.global?.notifications?.error_default, 'ERROR')
                }
            }).finally(() => setLoad(false))
        }
    }


    return (
        <Modal
            {...otherProps}
            footer={null}
            centered
            className={`${styles.wrapper} modal close-icon-big`}
            >
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.head}>
                        <div className={styles.title}>E-mail confirmation</div>
                        <div className={styles.ex}>
                        Confirm your email to be able to message users.
                        </div>
                        <div className={styles.ex}>
                        Email has been sent to <br/>
                            <div className={styles.email} onClick={() => window.open(`https://${userData?.email?.split('@')[1]}`)}>
                                {userData?.email}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <Row gutter={[10,10]}>
                            <Col span={24}>
                                <Button
                                    text='Resend the letter'
                                    variant='bordered'
                                    middle={width > 0 && width <= 768}
                                    onClick={onResendLetter}
                                    load={load}
                                    fill
                                    />
                            </Col>
                            <Col span={24}>
                                <Button
                                    text='Change your e-mail'
                                    middle={width > 0 && width <= 768}
                                    onClick={onOpenEdit}
                                    fill
                                    />
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.body}>
                        <div className={styles.title}>Didn&apos;t get the email?</div>
                        <div className={styles.list}>
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <Image
                                        src={img1}
                                        alt=''
                                        />
                                </div>
                                <div className={styles.text}>
                                    Check your Spam folder — sometimes our emails might accidentally end up there.
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <Image
                                        src={img2}
                                        alt=''
                                        />
                                </div>
                                <div className={styles.text}>
                                    <span onClick={onOpenEdit}>Change your email</span> — if you&apos;ve made a typo or want to use a different email, you can update it.
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <Image
                                        src={img3}
                                        alt=''
                                        />
                                </div>
                                <div className={styles.text}>
                                    <span onClick={onResendLetter}>Resend email</span> — we can also resend the verification email.
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                
            </Row>
        </Modal>
    )
}

export default VerifyEmailModal;