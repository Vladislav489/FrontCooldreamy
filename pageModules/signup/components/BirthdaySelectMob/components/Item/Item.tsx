import styles from './Item.module.scss';
import { useSwiper } from 'swiper/react';

const Item = ({value, index, label, setValue, selected} : {value: any, index: any, label: any, setValue?: (...args: any[]) => any, selected?: any}) => {
    const swiper = useSwiper()

    return (
        <div className={styles.wrapper}>
            {label}
        </div>
    )
}


export default Item;