import styles from './GiftMainCard.module.scss';
import { giftCardPropsType } from '../GiftCard/types';
import {FC} from 'react';
import Image from 'next/image';
import placeholder from '@/public/assets/images/logo.svg';
import Button from '../Button/Button';
import {AiOutlineGift} from 'react-icons/ai'
import IconButton from '../IconButton/IconButton';
import {BsTrash, BsPlus} from 'react-icons/bs';
import { useWindowSize } from 'usehooks-ts';

const GiftMainCard:FC<giftCardPropsType> = ({
    onSelect,
    image,
    label,
    price,
    id,
    active
}) => {
    const {width} = useWindowSize()

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <div className={styles.label}>{label}</div>
                {
                    price && (
                        <div className={styles.price}>{price} credits</div>
                    )
                }
            </div>
            <div className={styles.img}>
                <Image
                    loader={p => {
                        return p?.src && typeof p?.src === 'string' ? p.src  :''
                    }}
                    src={image ? image : placeholder}
                    alt=''
                    unoptimized
                    width={120}
                    height={120}
                    />
            </div>
            <div className={styles.action}>
                {
                    active ? (
                        width <= 768 ? (
                            <IconButton
                                size={35}
                                icon={<BsTrash size={15}/>}
                                variant={'danger'}
                                onClick={() => {
                                    onSelect && onSelect('remove', id)
                                }}
                                />
                        ) : (
                            <Button
                                text='Added'
                                after={<AiOutlineGift/>}
                                middle={width > 768}
                                small={width <= 768}
                                onClick={() => {
                                    onSelect && onSelect('remove', id)
                                }}
                                />
                        )
                        
                    ) : (
                        width <= 768 ? (
                            <IconButton
                                size={35}
                                icon={<BsPlus size={30}/>}
                                variant={'default'}
                                onClick={() => {
                                    onSelect && onSelect('add', id)
                                }} 
                                />
                        ) : (
                            <Button
                                onClick={() => {
                                    onSelect && onSelect('add', id)
                                }} 
                                middle={width > 768}
                                small={width <= 768}
                                variant={'bordered'}
                                after={<AiOutlineGift/>}
                                text='Add'/>
                        )
                        
                    )
                }
               
            </div>
        </div>
    )
}


export default GiftMainCard;