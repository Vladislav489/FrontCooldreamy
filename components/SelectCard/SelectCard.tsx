import styles from './SelectCard.module.scss';
import { FC } from 'react';
import {motion} from 'framer-motion';
import Image from 'next/image';
import { selectCardPropsTypes } from './types';
import {Row, Col} from 'antd';
import Ripple from '../Ripple/Ripple';
import getClassNames from '@/helpers/getClassNames';

const SelectCard:FC<selectCardPropsTypes> = ({
    image,
    label,
    isSelect,
    onSelect,
    value,
    disabled,
    isOnlyLabel = false
}) => {
    return (
        <motion.div 
            onClick={() => onSelect(value)}
            whileTap={{
                scale: 0.9,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }} 
            className={getClassNames([styles.card, isSelect && styles.active, disabled && styles.disabled, isOnlyLabel && styles.onlyLabel])} >
            {
                isSelect && <motion.div className={styles.ind}></motion.div>
            }
            <div className={styles.body}>
                {
                    !isOnlyLabel && (
                        <div className={styles.img}>
                            {
                                image ? (
                                    <Image width={90} height={90} src={image} alt={label}/>
                                ) : null
                            }
                        </div>
                    )
                }
                    
                    <div className={styles.label}>
                        {label}
                    </div>
                </div>
            <Ripple
                color='var(--light_purp_2)'
                />
        </motion.div>
    )
}

export default SelectCard;