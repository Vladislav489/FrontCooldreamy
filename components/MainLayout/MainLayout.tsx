import { useRouter } from 'next/router';
import styles from './MainLayout.module.scss';
import {CSSProperties} from 'react';
import { useWindowSize } from 'usehooks-ts';

const MainLayout = ({children, style}:{
    children: React.ReactNode,
    style?: CSSProperties
}) => {
    const {width} = useWindowSize()
    const {pathname} = useRouter()

    return (
        <div className={`${styles.container} ${width <= 768 && (pathname && pathname?.includes('/chat')) ? styles.chat : ''}`} style={style}>
            {children}
        </div>
    )
}

export default MainLayout;