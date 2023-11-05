import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import {FC} from 'react';
import styles from './BthPicker.module.scss';

const BthPicker:FC<DatePickerProps> = (props) => {
    return (
        <div className={styles.wrapper}>
            <DatePicker
                placeholder='День рождения'
                {...props}
                className={styles.picker}
                format={'DD-MM-YYYY'}
                />
        </div>
    )
}


export default BthPicker;
