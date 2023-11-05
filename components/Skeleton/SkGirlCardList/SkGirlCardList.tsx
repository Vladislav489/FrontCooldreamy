import styles from './SkGirlCardList.module.scss';
import {useState, useEffect} from 'react';

const SkGirlCardList = ({count}: {count: number}) => {
    const [array, setArray] = useState<any[]>([])

    useEffect(() => {
        setArray(Array(count).fill(1))
    }, [count])

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                {
                    array?.map((i, index) => (
                        <div
                            key={index}
                            className={styles.card}
                            >
                            <div className={styles.item}>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SkGirlCardList;