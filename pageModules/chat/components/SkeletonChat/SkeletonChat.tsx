import styles from './SkeletonChat.module.scss';


const SkeletonChat = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
        </div>
    )
}

export default SkeletonChat;