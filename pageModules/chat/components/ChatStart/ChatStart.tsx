import styles from './ChatStart.module.scss';
import Image from 'next/image';
import placeholder from '@/public/assets/images/avatar-placeholder.png';
import {HiOutlineGift} from 'react-icons/hi';
import {HiOutlineChatBubbleOvalLeftEllipsis} from 'react-icons/hi2';
import IconButton from '@/components/IconButton/IconButton';
import {motion} from 'framer-motion';
import {FC} from 'react'; 

interface I {
    avatar?: string, 
    onSelect: (type: 'wink' | 'gift' | 'text' | '') => void
}

const ChatStart:FC<I> = ({
    avatar, 
    onSelect}: I) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <div className={styles.main}>
                    <motion.div 
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{type: 'spring'}}
                        className={styles.bg}></motion.div>
                    <div className={styles.img}>
                        <Image
                            width={180}
                            height={180}
                            unoptimized
                            loader={(p) => {
                                return p?.src && typeof p?.src === 'string' ? p.src : ''
                            }}
                            src={avatar ? avatar : placeholder}
                            alt=''
                            />
                    </div>
                </div>
                <h3 className={styles.title}>Start chatting right now !</h3>
                <div className={styles.action}>
                    {/* <div className={styles.item}>
                        <button className={styles.button}>
                            <IconButton
                                onClick={() => onSelect('wink')}
                                size={60}
                                icon={<FaRegSmileWink size={30}/>}
                                />
                            <div className={styles.label}>ПОДМИГНУТЬ</div>
                        </button>
                    </div> */}
                    <div className={styles.item}>
                        <button className={styles.button}>
                            <IconButton
                                onClick={() => onSelect('gift')}
                                size={60}
                                icon={<HiOutlineGift size={30}/>}
                                />
                            <div className={styles.label}>Gift</div>
                        </button>
                    </div>
                    <div className={styles.item}>
                        <button className={styles.button}>
                            <IconButton
                                onClick={() => onSelect('text')}
                                size={60}
                                icon={<HiOutlineChatBubbleOvalLeftEllipsis size={30}/>}
                                />
                            <div className={styles.label}>GREETINGS</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ChatStart;