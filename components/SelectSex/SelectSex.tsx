import styles from './SelectSex.module.scss';
import { SelectSexPropsTypes } from './types';
import { FC } from 'react';
import {Row, Col} from 'antd';
import Image from 'next/image';
import maleIcon from '@/public/assets/icons/male-icon.svg';
import femaleIcon from '@/public/assets/icons/female-icon.svg';
import Ripple from '../Ripple/Ripple';
import {motion} from 'framer-motion';
import { useAppSelector } from '@/hooks/useTypesRedux';

const SelectSex: FC<SelectSexPropsTypes>  = ({
    value,
    onSelect,
    shadow = true,
    isSelf = true
}) => {
    const {locale} = useAppSelector(s => s)

    return (
        <div className={styles.wrapper}>
            <motion.div 
                whileTap={{
                    scale: 0.9,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}   
                onClick={() => onSelect('male')} className={`${styles.item} ${styles.male} ${value == 'male' ? styles.active : ''} ${shadow ? styles.shadow : ''}`}>
                
                <Col span={24}>
                    <Row gutter={[16,16]}>
                        <Col span={24}>
                            <div className={styles.icon}>
                                <Image width={56} height={56} src={maleIcon} alt="sex"/>
                            </div>
                        </Col>
                        <Col span={24}>
                            {
                                isSelf ? (
                                    <div className={styles.label}>{locale?.global?.select_gender?.male}</div>
                                ) : (
                                    <div className={styles.label}>{'Male'}</div>
                                    
                                )
                            }
                        </Col>
                    </Row>
                </Col>
                <Ripple
                    color='var(--light_purp_2)'
                    />
            </motion.div>
            <motion.div 
                 whileTap={{
                    scale: 0.9,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }} 
                onClick={() => onSelect('female')} className={`${styles.item} ${styles.female} ${value == 'female' ? styles.active : ''} ${shadow ? styles.shadow : ''}`}>
                <Col span={24}>
                    <Row gutter={[16,16]}>
                        <Col span={24}>
                            <div className={styles.icon}>
                                <Image width={56} height={56} src={femaleIcon} alt="sex"/>
                            </div>
                        </Col>
                        <Col span={24}>
                            {
                                isSelf ? (
                                    <div className={styles.label}>{locale?.global?.select_gender?.female}</div>
                                ) : (
                                    <div className={styles.label}>{'Female'}</div>
                                )
                            }
                        </Col>
                    </Row>
                </Col>
                <Ripple
                    color='var(--light_purp_1)'
                    />
            </motion.div>
        </div>
    )
}

export default SelectSex;