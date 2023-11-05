import styles from './Button.module.scss';
import {FC, useRef} from 'react';
import { ButtonPropsTypes, ButtonVariants } from './types';
import {motion} from 'framer-motion';
import { PulseLoader } from 'react-spinners';

const Button: FC<ButtonPropsTypes> = ({
    text,
    variant = 'default',
    disabled,
    onClick,
    style,
    before,
    after,
    hover = {boxShadow: '0.872px 9.962px 20px rgba(148, 45, 217, 0.35)'},
    fill,
    small,
    load,
    middle,
    className,
    type = 'button'
}) => {
    const ref = useRef(null);

    const switchVariant = (variant: ButtonVariants) => {
        switch(variant) {
            case 'default':
                return styles.default
            case 'simple':
                return styles.simple
            case 'bordered':
                return styles.bordered
            case 'danger':
                return styles.danger
            case 'white':
                return styles.white
            case 'gold':
                return styles.gold
            case 'green':
                return styles.green
            case 'black':
                return styles.black
            default:
                return styles.default
        }
    }

    return (
        <motion.button 
            ref={ref}
            whileTap={{
                scale: 0.9,
                transition: {type: "spring", stiffness: 400, damping: 17}
            }} 
            transition={{type: 'spring', stiffness: 400, damping: 17}}
            initial={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0, opacity: 0}}
            whileHover={hover ? hover : undefined}
            disabled={disabled}
            onClick={onClick}
            style={style}
            type={type}
            className={`${styles.button} ${switchVariant(variant)} ${fill ? styles.fill : ''} ${small ? styles.sm : ''} ${load ? styles.load : ''} ${middle ? styles.md : ''} ${className}`}>
            {
                load && (
                    <div className={styles.load}>
                        <PulseLoader color={variant === 'simple' || variant === 'bordered' || variant === 'white' ? 'var(--violet)' : '#fff'} size={10}/>
                    </div>
                )
            }
            {
                before && (
                    <div className={styles.before}>{before}</div>
                )
            }
            {
                text && (
                    <div className={styles.text}>
                        {text}
                    </div>
                )
            }
            {
                after && (
                    <div className={styles.after}>{after}</div>
                )
            }
        </motion.button>
    )
}

export default Button;