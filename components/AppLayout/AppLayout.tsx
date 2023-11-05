import styles from './AppLayout.module.scss';
import Sidebar from '../Sidebar/Sidebar';


const AppLayout = ({children, isSidebar}: {children?: React.ReactNode, isSidebar?: boolean}) => {

    return (
        <main className={styles.wrapper}>
            {
                isSidebar && (
                    <div className={styles.side}>
                        <Sidebar/>
                    </div>
                ) 
            }
            <div className={styles.main}>
                {children}
            </div>
        </main>
    )
}

export default AppLayout;