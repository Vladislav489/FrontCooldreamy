import styles from './UserInfoAction.module.scss';
import {FC} from 'react';
import UserTitle from '@/components/UserTitle/UserTitle';
import { IUser } from '@/models/IUser';
import UserLocation from '@/components/UserLocation/UserLocation';
import { useAppSelector } from '@/hooks/useTypesRedux';
import SkeletonUserInfoAction from './components/SkeletonUserInfoAction/SkeletonUserInfoAction';

const UserInfoAction:FC<IUser> = ({
    online,
    name,
    age,
    state,
    country}) => {
    const {locale, credits} = useAppSelector(s => s);

    if(!name) return <SkeletonUserInfoAction/>

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.name}>
                    <UserTitle
                        isOnline={online === 1}
                        username={name ? name : ''}
                        age={age ? age?.toString() : ''}
                        style={{fontSize: 24}}
                        />
                </div>
                <div className={styles.location}>
                    <UserLocation
                        country={country}
                        state={state}
                        />
                </div>
            </div>
            <div className={styles.action}>
                {locale?.global.my_card.balance.title}: {credits ? credits: 0} {locale?.global.my_card.balance.label}
            </div>
        </div>
    )
}

export default UserInfoAction;