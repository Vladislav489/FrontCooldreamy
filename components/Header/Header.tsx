import styles from '../Header/Header.module.scss';
import Container from '../Container/Container';
import logoImage from '@/public/assets/images/logo.svg';
import Image from 'next/image';
import {motion} from 'framer-motion';
import LoginModal from '../LoginModal/LoginModal';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { updateToken, updateUserId, updateSocket, updateMenu } from '@/store/actions';
import Router, { useRouter } from 'next/router';
import PromptModal from '@/popups/PromptModal/PromptModal';
import { useWindowSize } from 'usehooks-ts';
import PremiumBtn from '../Sidebar/components/PremiumBtn/PremiumBtn';
import ApiService from '@/service/apiService';
import notify from '@/helpers/notify';
import { useEffect } from 'react';
import getClassNames from '@/helpers/getClassNames';
import { deauthorize } from '@/helpers/authApi';

const service = new ApiService()

const Header: React.FC<any> = () => {
    const dispatch = useAppDispatch()
    const {token, socketChannel, isMenuOpen, locale, premiumData, currentSub} = useAppSelector(s => s)
    const [loginModal, setLoginModal] = useState(false)
    const {width} = useWindowSize()
    const router = useRouter()
    const [logoutModal, setLogoutModal] = useState(false)
    const [active, setActive] = useState(false)
    const [main, setMain] = useState<HTMLElement | null>(null)

    useEffect(() => {
        const m = document.querySelector('main')
        setMain(m)
    }, [])

    const onScroll = () => {
        if(document.documentElement.scrollTop > 10 || main?.scrollTop && main?.scrollTop > 10) {
            setActive(true)
        } else setActive(false)
    }

    useEffect(() => {
        if(main) {
            window.addEventListener('scroll', onScroll)
            main.addEventListener('scroll', onScroll)
        }
        
        return () => {
            window.removeEventListener('scroll', onScroll)
            main?.removeEventListener('scroll', onScroll)
        }
    }, [main])
    
    const onLogout = () => {
        if(token) {
            service.logout(token).then(res => {
                if(res?.message === 'success') {
                    socketChannel?.unsubscribe()
                    dispatch(updateToken(null))
                    dispatch(updateUserId(null))
                    dispatch(updateSocket(null))
                    deauthorize()
                    
                    // Router.push('/start')
                    setLogoutModal(false)
                    Router.reload()
                } else {
                    notify(locale?.global?.notifications?.error_default, 'ERROR')
                }
            })
        }
    }

    return (
        <motion.header 
            initial={{y: '-100%'}}
            animate={{y: '0%'}}
            transition={{type: 'spring'}}
            // className={`${styles.header} ${width <= 768 && (router?.pathname === '/' || router?.pathname === '/start') ? styles.show : ''}`}
            className={getClassNames([styles.header, width <= 768 && (router?.pathname === '/' || router?.pathname === '/start') && styles.show, (active || router?.pathname !== '/' && router?.pathname !== '/start') && styles.active])}
            >
            <LoginModal
                open={loginModal}
                onCancel={() => setLoginModal(false)}
                />
            <PromptModal
                text={locale?.popups.logout.title}
                open={logoutModal}
                onCancel={() => setLogoutModal(false)}
                onAccept={onLogout}
                onReject={() => setLogoutModal(false)}
                />
            <Container>
                <motion.div 
                    className={styles.inner}>
                    {
                        token ? (
                            <button className={`${styles.burger} ${isMenuOpen ? styles.active : ''}`} onClick={() => dispatch(updateMenu(!isMenuOpen))}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        ) : null
                    }
                    <div className={styles.logo}>
                        <motion.div
                            whileHover={{scale: 1.2}}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}    
                            >
                            <Image style={{'cursor': 'pointer'}} onClick={() => Router.push('/')} src={logoImage} alt="Cool Date" />
                        </motion.div>
                    </div>
                    {
                        !token ? (
                            <div className={styles.main}>
                                <div className={styles.locale}>
                                    {/*<SelectDef*/}
                                    {/*    clearIcon={false}*/}
                                    {/*    onChange={(e) => {*/}
                                    {/*        if(e === '1') {*/}
                                    {/*            router.push(router.asPath, undefined, {locale: 'ru'})*/}
                                    {/*        } */}
                                    {/*        if(e === '2') {*/}
                                    {/*            router.push(router.asPath, undefined, {locale: 'en'})*/}
                                    {/*        }*/}
                                    {/*    }}*/}
                                    {/*    list={locales}*/}
                                    {/*    placeholder='Выбор языка'*/}
                                    {/*    value={router?.locale === 'ru' ? '1' : '2'}*/}
                                    {/*    />*/}
                                </div>
                                {
                                    !token ? (
                                        <div className={styles.auth}>
                                            <span onClick={() => setLoginModal(true)} className={styles.item}>{locale?.global?.header?.login_btn}</span>
                                        </div>
                                    ) : (
                                        width > 768 ? (
                                            <div className={styles.auth}>
                                                <span onClick={() => setLogoutModal(true)} className={styles.item}>{locale?.global?.header?.logout_btn}</span>
                                            </div>
                                        ) : null
                                    )
                                }
                            </div>
                        ) : (
                            width > 768 && (
                                <div className={styles.main}>
                                    {
                                        !currentSub && <div className={styles.prem}>
                                            <PremiumBtn/>
                                        </div>
                                    }
                                    <div className={styles.locale}>
                                        {/*<SelectDef*/}
                                        {/*    clearIcon={false}*/}
                                        {/*    onChange={(e) => {*/}
                                        {/*        if(e === '1') {*/}
                                        {/*            // dispatch(updateLocale(ru))*/}
                                        {/*            router.push(router.asPath, undefined, {locale: 'ru'})*/}
                                        {/*        } */}
                                        {/*        if(e === '2') {*/}
                                        {/*            // dispatch(updateLocale(en))*/}
                                        {/*            router.push(router.asPath, undefined, {locale: 'en'})*/}
                                        {/*        }*/}
                                        {/*    }}*/}
                                        {/*    list={locales}*/}
                                        {/*    placeholder='Выбор языка'*/}
                                        {/*    value={router?.locale === 'ru' ? '1' : '2'}*/}
                                        {/*    />*/}
                                    </div>
                                    {
                                        !token ? (
                                            <div className={styles.auth}>
                                                <div
                                                    className={styles.item} 
                                                    >{locale?.global?.header?.login_btn}</div>
                                            </div>
                                        ) : (
                                            width > 768 ? (
                                                <div className={styles.auth}>
                                                    <span onClick={() => setLogoutModal(true)} className={styles.item}>{locale?.global?.header?.logout_btn}</span>
                                                </div>
                                            ) : null
                                        )
                                    }
                                </div>
                            )
                        )
                    }
                </motion.div>
            </Container>
        </motion.header>
    )
}

export default Header;