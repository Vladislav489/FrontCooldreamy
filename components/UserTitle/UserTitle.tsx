import styles from './UserTitle.module.scss';
import { userTitlePropsTypes } from './types';

const UserTitle = ({
    username,
    age,
    isOnline,
    style,
    textBold
}: userTitlePropsTypes) => {

    return (
        <div className={`${styles.wrapper} ${isOnline ? styles.online : ''}`} style={{fontWeight: textBold ? 500 : 400, ...style}}>
            <div className={styles.badge}>
                <span className={styles.name}>{username}</span>
                {
                    age && (
                        <span className={styles.age}>, {age}</span>
                    )
                }
            </div>
        </div>
    )
}

export default UserTitle;