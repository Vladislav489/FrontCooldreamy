import styles from './Hero.module.scss';
import { ChangeEvent, FC, useEffect } from 'react';
import Container from '@/components/Container/Container';
import { useState } from 'react';
import {Row, Col} from 'antd';
import Link from 'next/link';
import {container, item} from '../../../../helpers/variantsOrderAnim';
import { motion, useScroll, useTransform } from "framer-motion";
import { useAppSelector } from '@/hooks/useTypesRedux';
import Router from 'next/router';
import Button from '@/components/Button/Button';
import LoginModal from '@/components/LoginModal/LoginModal';
import Input from '@/components/Input/Input';
import BirthdaySelect from '@/pageModules/signup/components/BirthdaySelect/BirthdaySelect';
import getClassNames from '@/helpers/getClassNames';
import ApiService from '@/service/apiService';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { updateUserData, updateToken, updateRegisterData, updateConversData } from '@/store/actions';
import LOCAL_STORAGE from '@/helpers/localStorage';
import { useRouter } from 'next/router';
import { useWindowSize } from 'usehooks-ts';
import BirthdaySelectMob from '@/pageModules/signup/components/BirthdaySelectMob/BirthdaySelectMob';
import mobimg from '@/public/assets/images/start-hero-mob-bg.png'
import Image from 'next/image';
import notify from '@/helpers/notify';

const service = new ApiService()

const Hero: FC = ({}) => {
    const {width} = useWindowSize()
    const dispatch = useAppDispatch()
    const {locale, conversData} = useAppSelector(s => s)
    const [loginModal, setLoginModal] = useState(false)
    const {query} = useRouter()

    const [install, setInstall] = useState<any>(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState<any>()
    const [sex, setSex] = useState<'male' | 'female'>('male')

    const [queryData, setQueryData] = useState<any>({})

    useEffect(() => {

        if(query?.subid && !query?.af_id && query?.app_name) {
            const subid = query?.subid;
            const app_name = query?.app_name;

            setQueryData({
                subid,
                app_name
            })
        } 
        if(query?.subid && query?.af_id && query?.app_name) {
            const subid = query?.subid;
            const af_id = query?.af_id;
            const app_name = query?.app_name;

            setQueryData({
                subid,
                app_name,
                af_id
            })
        }   
    }, [query])


    useEffect(() => {
        if(conversData) {
            const {af_id, subid, app_name} = conversData || {}
            if(subid && app_name && !af_id) {
                // Router.push(`/start?subid=${subid}&app_name=${app_name}`)
                setQueryData({
                    subid,
                    app_name
                })
            }
            if(subid && af_id && app_name) {
                // Router.push(`/start?subid=${subid}&app_name=${app_name}&af_id=${af_id}`)
                setQueryData({
                    subid,
                    app_name,
                    af_id
                })
            }
        } else {
            const a:any = LOCAL_STORAGE?.getItem('conversData')
            if(typeof a === 'string' && a !== null) {
                setQueryData(JSON.parse(a))
            }
        }
    }, [conversData])

    

    const onSubmit = () => {
        if(email && password && birthday && sex && name) {
            if(password?.length < 6) {
                notify('Password must be at least 6 characters long')
            } else {
                service.checkMail({email}).then(res => {
                    if(res === 200) {
                        LOCAL_STORAGE?.removeItem('conversData')
                        dispatch(updateConversData(null))

                        dispatch(updateRegisterData({
                            ...queryData,
                            name,
                            password,
                            email,
                            gender: sex,
                            birthday
                        }))
                        Router?.push('/signup?signup_step=1')
                    } else {
                        notify('This e-mail is already registered.', 'ERROR')
                    }
                })
            }
            
            
        }
    }

    return (
        <div className={getClassNames([styles.hero])}>
            <LoginModal
                open={loginModal}
                onCancel={() => setLoginModal(false)}
                />
            <Container
                style={{
                    padding: width <= 768 ? 0 : '0 15px'
                }}
                >
                <motion.div
                    initial="hidden"
                    animate="visible" 
                    variants={container} 
                    className={styles.inner}>
                    <div className={styles.main} >
                        <div className={styles.top}>
                            <motion.h1 variants={item} className={styles.title}>
                                {locale?.startPage?.start_hero_title}
                            </motion.h1>
                            <motion.div variants={item} className={styles.subtitle}>
                                {locale?.startPage?.start_hero_subtitle}
                            </motion.div>
                        </div>
                        <motion.div className={styles.form}>
                            <Row gutter={[10,10]}>
                                <Col span={24}>
                                    <div className={styles.sex}>
                                        <Row gutter={[4,4]}>
                                            <Col span={12}>
                                                <div onClick={() => setSex('male')} className={getClassNames([styles.sex_item, sex === 'male' && styles.active, styles.male])}>
                                                    <span>I am a man</span>
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div onClick={() => setSex('female')} className={getClassNames([styles.sex_item, sex === 'female' && styles.active, styles.female])}>
                                                    <span>I am a woman</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <Input
                                        placeholder='Username'
                                        value={name}
                                        onChange={(e:ChangeEvent<HTMLInputElement>) => {
                                            if(!/[а-яё]+/i.test(e.target.value)) {
                                               setName(e.target.value) 
                                            }
                                        }}
                                        />
                                </Col>
                                <Col span={24}>
                                    <Input
                                        placeholder='E-mail'
                                        value={email}
                                        type='email'
                                        onChange={(e:ChangeEvent<HTMLInputElement>) => {
                                            if(!/[а-яё]+/i.test(e.target.value)) {
                                               setEmail(e.target.value) 
                                            }
                                        }}
                                        />
                                </Col>
                                <Col span={24}>
                                    <Input
                                        placeholder='Password'
                                        type='password'
                                        value={password}
                                        onChange={(e:ChangeEvent<HTMLInputElement>) => {
                                            if(!/[а-яё]+/i.test(e.target.value)) {
                                               setPassword(e.target.value) 
                                            }
                                        }}
                                        />
                                </Col>
                                <Col span={24}>
                                    {
                                        width <= 768 ? (
                                            <BirthdaySelectMob
                                                minAge={18}
                                                maxAge={70}
                                                setValue={setBirthday}
                                                value={birthday}
                                                />
                                        ) : (
                                            <BirthdaySelect
                                                minAge={18}
                                                maxAge={70}
                                                setValue={setBirthday}
                                                value={birthday}
                                                />
                                        )
                                    }
                                </Col>
                                <Col span={24}>
                                    <div className={styles.terms}>
                                    By continuing, you accept the <Link href={'/articles/privacy'}>terms and conditions of the user agreement and confidentiality</Link>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className={styles.action}>
                                        <Button
                                            text='Find your match'
                                            middle
                                            disabled={!(name && password && email && birthday && sex)}
                                            onClick={onSubmit}
                                            />
                                    </div>
                                    
                                </Col>
                            </Row>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </div>
    )
}

export default Hero;