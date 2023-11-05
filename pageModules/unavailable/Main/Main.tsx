import styles from './Main.module.scss';
import img from '@/public/assets/images/logo-animate.svg'
import Image from 'next/image';
import { useAppSelector } from '@/hooks/useTypesRedux';

const Main = () => {
    const {locale} = useAppSelector(s => s)

    return (
        <div className={styles.wrapper}>
            <div className={styles.img}><Image src={img} alt=''/></div>
            <div className={styles.label}>{locale?.global?.unavailable}</div>
        </div>
    )
}


export default Main;