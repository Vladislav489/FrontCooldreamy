import styles from './SkeletonChatList.module.scss';




const SkeletonChatList = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.item}>
                <div className={styles.avatar}></div>
                <div className={styles.body}></div>
            </div>
            <div className={styles.item}>
                <div className={styles.avatar}></div>
                <div className={styles.body}></div>
            </div>
            <div className={styles.item}>
                <div className={styles.avatar}></div>
                <div className={styles.body}></div>
            </div>
            <div className={styles.item}>
                <div className={styles.avatar}></div>
                <div className={styles.body}></div>
            </div>
        </div>
    )
}


export default SkeletonChatList;