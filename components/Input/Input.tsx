import styles from './Input.module.scss';
import { InputPropsTypes } from './types';
import {HiOutlineCheckCircle} from 'react-icons/hi';


const Input: React.FC<InputPropsTypes> = ({
    error,
    type,
    value,
    valid,
    beforeIcon,
    placeholder,
    onChange,
    wrapperStyle,
    style,
    afterIcon
}) => {
    return (
        <div className={`${styles.wrapper} ${error ? styles.error : ''} ${beforeIcon ? styles.before : ''}`} style={wrapperStyle}>
            <div className={styles.input_wrapper}>
                {
                    valid && (
                        <div className={styles.valid_icon}>
                            <HiOutlineCheckCircle/>
                        </div>
                    )
                }
                {
                    beforeIcon && (
                        <div className={styles.before_icon}>
                            {beforeIcon}
                        </div>
                    )
                }
                <input 
                    style={style}
                    onChange={onChange} 
                    value={value} 
                    type={type} 
                    placeholder={placeholder}
                    className={styles.input}
                    />
                {
                    afterIcon && (
                        <div className={styles.after_icon}>
                            {afterIcon}
                        </div>
                    )
                }
            </div>
            {
                error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )
            }
        </div>
    )
}

export default Input;