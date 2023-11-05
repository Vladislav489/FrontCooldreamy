import styles from './DialogEmpty.module.scss';
import Image from 'next/image';
import img from '@/public/assets/images/chat-empty.svg';
import Button from '@/components/Button/Button';
import Router from 'next/router';
import { useAppSelector } from '@/hooks/useTypesRedux';
const DialogEmpty = ({height, absolute} : {height?: number | string, absolute?:boolean}) => {
    const {locale} = useAppSelector(s => s)

    return (
        <div className={styles.wrapper} style={{height, position: absolute ? 'absolute' : 'static'}}>
            
            <div className={styles.body}>
                <div className={styles.img}>
                    <Image src={img} alt=''/>
                </div>
                <div className={styles.head}>{locale?.global.placeholders.chat_empty.title}</div>
                <div className={styles.text}>{locale?.global.placeholders.chat_empty.text}</div>
                {/* <div className={styles.action}>
                    <Button middle text={locale?.global.placeholders.chat_empty.btn} onClick={() => Router.push('/feed')} variant={'bordered'}/>
                </div> */}
            </div>

        </div>
    )
}


export default DialogEmpty;