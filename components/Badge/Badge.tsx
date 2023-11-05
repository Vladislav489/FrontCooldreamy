import styles from './Badge.module.scss';
import {FC} from 'react';
import { badgePropsType } from './types';
import Image from 'next/image';
const Badge:FC<badgePropsType> = ({
    value,
    icon,
    style,
    size = 22
}) => {
    return (
        <div className={styles.badge} style={{...style, width: size, height: size}}>
            {icon ? (
                <div className={styles.img}>
                    <Image
                        width={50}
                        height={50}
                        src={icon}
                        loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                        alt='icon'
                        />
                </div>
                
            ) : (
                value ? (
                    value < 99 ? value : '99+'
                ) : null
            )}
        </div>
    )
}

export default Badge;