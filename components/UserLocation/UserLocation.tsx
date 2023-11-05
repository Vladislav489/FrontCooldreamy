import styles from './UserLocation.module.scss';
import {BsGeo} from 'react-icons/bs'
import { userLocationPropsType } from './types';
import {FC} from 'react';

const UserLocation:FC<userLocationPropsType> = ({
    size = 20,
    state,
    country
}) => {
    
    if(!country && !state) {
        return null
    }
    return (
        <div className={styles.wrapper}>
            <span className={styles.icon}>
                <BsGeo size={size}/>
            </span>
            <span style={{fontSize: size}} className={styles.label}>
                {state && `${state}, `}{country && country}
            </span>
        </div>
    )
}

export default UserLocation