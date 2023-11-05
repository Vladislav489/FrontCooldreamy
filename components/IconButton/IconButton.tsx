import styles from './IconButton.module.scss';
import { iconButtonPropsType, iconButtonVariants } from './types';
import {FC} from 'react';
import {motion} from 'framer-motion';

const IconButton:FC<iconButtonPropsType> = (props) => {
    const {icon, variant = 'default', size = 62, style, onClick = () => {}, disabled, fileId} = props;

    const switchVariant = (variant: iconButtonVariants) => {
        switch(variant) {
            case 'default':
                return styles.default
            case 'danger':
                return styles.danger
            case 'transparent':
                return styles.transparent
            case 'bordered':
                return styles.bordered
            default:
                return styles.default
        }
    }

    const switchHover = (variant: iconButtonVariants) => {
        switch(variant) {
            case 'danger':
                return {filter: 'drop-shadow(0px 0px 10px var(--red))'}
            case 'default':
                return {filter: 'drop-shadow(0px 0px 10px var(--red))'}
            case 'transparent':
                return {filter: 'drop-shadow(0px 0px 10px var(--red))'}
        }
    }

    if(fileId) {
        return (
            <motion.label
                initial={{scale: 0, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{scale: 0, opacity: 0}}
                transition={{type: 'spring', damping: 17, stiffness: 400}}
                whileTap={{scale: 0.9}}
                htmlFor={fileId}
                style={{...style, width: size, height: size}}
                className={`${styles.wrapper} ${switchVariant(variant)} ${disabled ? styles.disabled : ''}`}
                >
                {icon}
            </motion.label>
        )
    }
    return (
        <motion.button
            initial={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0, opacity: 0}}
            transition={{type: 'spring', damping: 17, stiffness: 400}}
            whileTap={{scale: 0.9}}
            disabled={disabled}
            type='button'
            onClick={onClick}
            style={{...style, width: size, height: size}}
            className={`${styles.wrapper} ${switchVariant(variant)} ${disabled ? styles.disabled : ''}`}
            >
            {icon}
        </motion.button>
    )
}

export default IconButton