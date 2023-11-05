import styles from './StepItem.module.scss';
import { FC} from 'react';
import { StepItemPropsTypes } from './types';
import {motion} from 'framer-motion';
import { item } from '@/helpers/variantsOrderAnim';

const StepItem:FC<StepItemPropsTypes>  = ({
    icon,
    text
}) => {

    return (
        <div
            className={styles.item}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.text}>
                {text}
            </div>
        </div>
    )
}

export default StepItem;