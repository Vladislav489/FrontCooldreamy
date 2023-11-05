import styles from './StepLine.module.scss';
import { FC, useEffect, useState } from 'react';
import { StepLinePropsTypes } from './types';

const StepLine:FC<StepLinePropsTypes> = ({
    total,
    currentIndex = 0,
}) => {

    const [arr, setArr] = useState<number[]>([])

    useEffect(() => {
        if(total) {
            const a = [];
            for(let i = 0; i < total; i++) {
                a.push(i);
            }
            setArr(a)
        }
    }, [total])

    return (
        <div className={styles.wrapper}>
            <div className={styles.line}>
                <div 
                    className={styles.bar}
                    style={{width: `${currentIndex / (total - 1) * 100}%` }}
                    ></div>
            </div>
            {
                arr?.map((i,index) => (
                    <div key={index} className={`${styles.item} ${index == currentIndex ? styles.current : ''} ${index < currentIndex ? styles.done : ''}`}>
                        <div className={styles.el}></div>
                    </div>
                ))
            }
        </div>
    )
}





export default StepLine;