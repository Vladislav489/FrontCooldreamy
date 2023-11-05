import styles from './UserLayout.module.scss';
import {FC} from 'react';
import { userLayoutPropsType } from './types';


const UserLayout:FC<userLayoutPropsType> = ({
    side,
    main
}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.side}>
                {side}
            </div>
            <div className={styles.main}>
                {main}
            </div>
        </div>
    )
}

export default UserLayout;