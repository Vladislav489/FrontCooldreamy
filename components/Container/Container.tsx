import styles from './Container.module.scss';
import React, { CSSProperties } from 'react';

const Container = ({
    children,
    style
}: {
    children: React.ReactNode,
    style?: CSSProperties
}) => {
    return (
        <div className={styles.container} style={style}>
            {children}
        </div>
    )
}

export default Container;