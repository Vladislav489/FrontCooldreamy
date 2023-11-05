import styles from './Sidebar.module.scss';
import { FC, useEffect, useState } from 'react';
import MyCard from './components/MyCard/MyCard';
import { Row, Col } from 'antd';
import Menu from './components/Menu/Menu';
import ApiService from '@/service/apiService';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import { useWindowSize } from 'usehooks-ts';
import { updateMenu } from '@/store/actions';
import {motion} from 'framer-motion';
import Button from '../Button/Button';
import Router, { useRouter } from 'next/router';
import PromoModal from '@/popups/PromoModal/PromoModal';


const Sidebar:FC = () => {
    const {userData, isMenuOpen, locale, premiumData} = useAppSelector(s => s)
    const dispatch = useAppDispatch()
    const {width} = useWindowSize()
    
    const router = useRouter()
 
    const onClose = (e: any) => {
        if(width <= 768 && e.target.dataset.close === 'true') {
            dispatch(updateMenu(false))
        }
    }

    useEffect(() => {
        dispatch(updateMenu(false))
    }, [router])
 
    
    return (
        <motion.div
            onClick={onClose}
            data-close
            className={`${styles.wrapper} ${isMenuOpen ? styles.active : ''}`}>
            <div data-close className={styles.in}>
                <Row gutter={[15, 15]}>
                    <Col span={24}>
                        <MyCard
                            {...userData}
                            /> 
                    </Col>
                    <Col span={24}>
                        <Button
                            text={locale?.global?.menu?.buy_credits}
                            onClick={() => Router.push('/deposit-mb?tab=3')}
                            middle
                            fill
                            variant={'default'}
                            />
                        {/* <PremiumBtn/> */}
                    </Col>
                    <Col span={24}>
                        <Menu/>
                    </Col>
                    
                </Row>
            </div>
            {/* <motion.button 
                whileTap={{
                    scale: 0.9,
                    transition: {type: "spring", stiffness: 400, damping: 17}
                }} 
                transition={{type: 'spring', stiffness: 400, damping: 17}}
                initial={{scale: 0, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{scale: 0, opacity: 0}}
                whileHover={{boxShadow: '0.872px 9.962px 20px rgba(251, 179, 69, .5)'}}
                className={styles.promo}>
                Promo
            </motion.button> */}

            {/* <PromoModal
                
                /> */}
        </motion.div>
    )
}

export default Sidebar;