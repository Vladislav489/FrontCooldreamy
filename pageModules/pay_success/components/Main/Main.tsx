import styles from './Main.module.scss';
import Image from 'next/image';
import img from '@/public/assets/images/pay-sc.svg'
import Button from '@/components/Button/Button';
import Router from 'next/router';
import { useAppSelector } from '@/hooks/useTypesRedux';

const Main = () => {
    const {locale} = useAppSelector(s => s)
    return (
        <div className={styles.wrapper}>
            <div className={styles.img}>
                <Image
                    alt=''
                    src={img}
                    width={422}
                    height={315}
                    />
            </div>
            <div className={styles.body}>
                <div className={styles.title}>Payment successful!</div>
                <div className={styles.action}>
                    <Button
                        text={locale?.global?.back_to_site_btn}
                        fill
                        onClick={() => Router.push('/search')}
                        />
                </div>
            </div>
        </div>
    )
}


export default Main;