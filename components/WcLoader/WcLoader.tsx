import styles from './WcLoader.module.scss';
import {motion} from 'framer-motion';
import logo from '@/public/assets/images/logo-animate.svg'
import Image from 'next/image';

const WcLoader = () => {


    return (
        <motion.div
            exit={{x: '-100%'}}
            transition={{
                easings: ['easeInOut'],
                duration: .7,
            }}
            className={styles.wrapper}>
            <motion.div 
                animate={{scale: [0.8, 1, 0.8]}}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    type: 'spring',
                    damping: 17,
                    stiffness: 400
                }}
                className={styles.main}>
                <Image src={logo} alt=''/>
            </motion.div>
        </motion.div>
    )
}


export default WcLoader;