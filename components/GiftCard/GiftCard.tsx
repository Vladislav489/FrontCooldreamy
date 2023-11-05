import styles from './GiftCard.module.scss';
import Badge from '../Badge/Badge';
import Image from 'next/image';
import {FC} from 'react';
import { giftCardPropsType } from './types';
import placeholder from '@/public/assets/images/logo.svg';

const GiftCard:FC<giftCardPropsType> = ({
    image,
    badgeValue,
    label,
    price
}) => {
    
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                {
                    label && <div className={styles.label}>{label}</div>
                }
                {
                    price && <div className={styles.price}>{price} credits</div>
                }
            </div>
            <div className={styles.main}>
                {
                    badgeValue && (
                        <div className={styles.badge}>
                            <Badge
                                value={badgeValue}
                                />
                        </div>
                    )
                }
                <div className={styles.img}>
                    <Image
                        loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                        src={image ? image : placeholder}
                        alt={""}
                        width={130}
                        height={130}
                        />
                </div>
            </div>
           
        </div>
    )
}

export default GiftCard;