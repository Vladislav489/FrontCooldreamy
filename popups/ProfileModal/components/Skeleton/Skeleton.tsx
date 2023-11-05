import styles from './Skeleton.module.scss';



const Skeleton = () => {
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.main}></div>
                <div className={styles.body}></div>
            </div>
        </div>
    )
}

export default Skeleton;