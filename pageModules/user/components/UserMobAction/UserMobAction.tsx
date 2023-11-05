import styles from './UserMobAction.module.scss';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Router from 'next/router';
import Button from '@/components/Button/Button';
import { useWindowSize } from 'usehooks-ts';


const service = new ApiService()



const UserMobAction = ({id, createChat}: {id?: number, createChat?: (...args: any[]) => any}) => {
    const {locale} = useAppSelector(s => s)
    const {width} = useWindowSize()


    


    return (
        <div className={styles.wrapper}>
            {/* <div className={styles.main}>
                <div className={styles.item}></div>
            </div> */}
            <div className={styles.ex}>
                <Button onClick={createChat} small={width <= 500} middle={width > 500} text={locale?.profilePage?.action?.message_btn}/>
            </div>
        </div>
    )
}

export default UserMobAction;