import styles from './StepMail.module.scss';
import {motion} from 'framer-motion';
import {Row, Col} from 'antd'
import Button from '@/components/Button/Button';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { FC, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import img1 from '@/public/assets/icons/signup-email-1.svg'
import img2 from '@/public/assets/icons/signup-email-2.svg'
import img3 from '@/public/assets/icons/signup-email-3.svg'
import getClassNames from '@/helpers/getClassNames';
import Link from 'next/link';
import EditModalText from '@/pageModules/profile/modals/EditModals/EditModalText/EditModalText';

interface I {
    email?: string,   
}

const StepMail:FC<I> = ({
    email
}) => {
    const {width} = useWindowSize()
    const [modal, setModal] = useState(false)

    return (
        <motion.div 
        initial={{
            y: '20px',
            scale: 0.8,
            opacity: 0
        }}
        animate={{
            y: 0,
            scale: 1,
            opacity: 1
        }}
        transition={{type: 'spring', stiffness: 400, damping: 17 }}
            className={styles.wrapper}>
            <EditModalText
                editItemType={'email'}
                head='Edit e-mail'
                open={modal}
                onCancel={() => setModal(false)}
                />
            <Row gutter={[25,25]}>
                <Col span={24}>
                    <div className={styles.head}>
                        <div className={styles.title}>Email Confirmation</div>
                        <div className={styles.subtitle}>Confirm your email to be able to message users.</div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.body}>
                        <div className={styles.label}>Email has been sent to</div>
                        <div className={styles.value}>{email}</div>
                        <button onClick={() => setModal(true)} className={styles.change}>Change your e-mail</button>
                    </div>
                </Col>
                {/* <Col span={24}>
                    <div className={styles.ex}>
                        <div className={styles.ex_title}>Didn&quot;t get the email?</div>
                        <div className={styles.ex_body}>
                            <Row gutter={[10,10]}>
                                <Col span={24}>
                                    <div className={getClassNames([styles.ex_part, styles.first])}>
                                        <div className={styles.ex_icon}></div>
                                        <div className={styles.ex_text}>
                                            <b>Check your Spam folder</b> — sometimes our emails might accidentally end up there.
                                        </div>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className={getClassNames([styles.ex_part, styles.second])}>
                                    <div className={styles.ex_icon}></div>
                                        <div className={styles.ex_text}>
                                            <b>Change your email</b> — if you&quot;ve made a typo or want to use a different email, you can update it.
                                        </div>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className={getClassNames([styles.ex_part, styles.third])}>
                                    <div className={styles.ex_icon}></div>
                                        <div className={styles.ex_text}>
                                            <b>Resend email</b> — we can also resend the verification email.
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col> */}
                <Col span={24}>
                    <div className={styles.action}>
                        <Button
                            // variant={'bordered'}
                            middle={width <= 768}
                            onClick={() => window.open(`https://${email?.split('@')[1]}`)}
                            text='Go to email'
                            />
                    </div>
                </Col>
            </Row>


        </motion.div>
    )
}


export default StepMail;