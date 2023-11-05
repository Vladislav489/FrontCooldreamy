import styles from './Radio.module.scss';
import {FC} from 'react';
import { radioPropsType } from './types';


const Radio:FC<radioPropsType> = (props) => {
    const {text} = props;

    return (
        <div className={styles.wrapper}>
            <input 
                {...props}
                className={styles.input}
                type="radio" />
            <label 
                className={styles.label}
                htmlFor={props.id}>

                <div className={styles.icon}></div>
                {
                    text ? (
                        <div className={styles.text}>{text}</div>
                    ) :  null
                }
            </label>
        </div>
    )
}

export default Radio;