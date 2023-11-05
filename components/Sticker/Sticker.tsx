import styles from './Sticker.module.scss';
import { ISticker } from '@/models/ISticker';
import {FC, useCallback} from 'react';
import Image from 'next/image';
import {motion} from 'framer-motion';

const Sticker:FC<ISticker> = ({
    category,
    created_at,
    credits,
    id,
    name,
    picture_url,
    updated_at,
    onSelect
}) => {

    const handleSelect = useCallback(() => {
        (onSelect && id) && onSelect(id)
    }, [id, onSelect])


    return (
        <motion.div 
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.8}}
            transition={{type: 'spring'}}
            onClick={handleSelect}
            className={styles.wrapper}>
            <div className={styles.img}>
                <Image
                    src={picture_url}
                    loader={(p) => {
                        return p?.src && typeof p?.src === 'string' ? p?.src : ''
                    }}
                    unoptimized
                    width={122}
                    height={122}
                    alt={name ? name : 'sticker'}
                    />
            </div>
        </motion.div>
    )
}

export default Sticker;