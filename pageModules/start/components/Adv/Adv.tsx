import styles from './Adv.module.scss';
import { FC } from 'react';
import Container from '@/components/Container/Container';
import AdvItem from './components/AdvItem/AdvItem';
import {motion} from 'framer-motion';
import adv1 from '@/public/assets/images/adv-1.svg';
import adv2 from '@/public/assets/images/adv-2.svg';
import adv3 from '@/public/assets/images/adv-3.svg';
import { container, item } from '@/helpers/variantsOrderAnim';
import { useAppSelector } from '@/hooks/useTypesRedux';

const Adv:FC = () => {
    const {locale} = useAppSelector(s => s)

    return (
        <motion.div 
            initial={{
                scale: 0
            }} 
            whileInView={{
                scale: 1,
                transition: {
                    type: 'spring',
                    
                },
                
            }}
            viewport={{once: true}}
            className={styles.wrapper}>
            <Container>
                <motion.div 
                    initial="hidden"
                    whileInView={'visible'}
                    variants={container}
                    viewport={{once: true}}
                    className={styles.inner}>
                    <div className={styles.list}>
                        <motion.div variants={item} className={styles.item}>
                            <AdvItem
                                img={adv1}
                                label={locale?.startPage?.start_adv_1?.title}
                                text={locale?.startPage?.start_adv_1?.text}
                                />
                        </motion.div>
                        <motion.div variants={item} className={styles.item}>
                            <AdvItem
                                img={adv2}
                                label={locale?.startPage?.start_adv_2?.title}
                                text={locale?.startPage?.start_adv_2?.text}
                                />
                        </motion.div>
                        <motion.div variants={item} className={styles.item}>
                            <AdvItem
                                img={adv3}
                                label={locale?.startPage?.start_adv_3?.title}
                                text={locale?.startPage?.start_adv_3?.text}
                                />
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </motion.div >
    )
}

export default Adv;