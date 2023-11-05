import styles from './PremiumBtn.module.scss';
import {FC} from 'react';
import {motion} from 'framer-motion';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Router from 'next/router';
import { useAppDispatch } from '@/hooks/useTypesRedux';

const PremiumBtn:FC = ({
    
}) => {
    const {locale} = useAppSelector(s => s)

    return (
        <motion.button 
            whileTap={{
                scale: 0.9,
            }}
            onClick={() => Router.push('/deposit-mb?tab=2')}
            transition={{ type: "spring", stiffness: 400, damping: 17 }} 
            whileHover={{
                boxShadow: '0.872px 9.962px 20px rgba(148, 45, 217, 0.35)',
            }}
            className={styles.button}>
            <div className={styles.icon}></div>
            <div className={styles.text}>{locale?.global.menu.get_premium}</div>
        </motion.button>
    )

}

export default PremiumBtn;