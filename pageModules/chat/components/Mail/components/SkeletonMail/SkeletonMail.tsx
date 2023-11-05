import styles from './SkeletonMail.module.scss';



const SkeletonMail = () => {

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

export default SkeletonMail;