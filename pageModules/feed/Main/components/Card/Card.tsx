import styles from './Card.module.scss';
import Image from 'next/image';
import {FC} from 'react';
import { cardPropsType } from './type';
import {useState} from 'react';
import IconButton from '@/components/IconButton/IconButton';
import {motion, PanInfo, AnimatePresence} from 'framer-motion';
import {CgClose} from 'react-icons/cg';
import {HiHeart} from 'react-icons/hi';
import logo from '@/public/assets/images/logo-big.svg';
import UserTitle from '@/components/UserTitle/UserTitle';
import getClassNames from '@/helpers/getClassNames';


const Card:FC<cardPropsType> = ({
    card,

    active,
    removeCard,

    leaveX,
    setLeaveX,

    disable,
    setDisable
}) => {
    const {age,
        user_avatar_url,
        avatar_url_thumbnail,
        id,
        birthday,
        country,
        name,
        state,
        index,
        setCanceling,
        setLiking,
        liking,
        canceling,
        user_thumbnail_url,
    } = card

    const [rotate, setRotate] = useState(1)
    const [leaveY, setLeaveY] = useState(0);

    const onDragEnd = (_e: any, info: PanInfo) => {
        if (info.offset.x > 100) {
          setLeaveY(info.offset.y)
          removeCard(card, "like");
          setDisable(true)
        }
        if (info.offset.x < -100) {
          setLeaveY(info.offset.y)
          removeCard(card, "nope");
          setDisable(true)
        }
        setLiking(false)
        setCanceling(false)
    }

    
    const onDrag = (e: any, info: PanInfo) => {
        setRotate(Math.round(info.offset.x / 40))
        if (info.offset.x > 100) {  
            setLiking(true)
        } else {
            setLiking(false)
        }
        if (info.offset.x < -100) {
            setCanceling(true)
        } else {
            setCanceling(false)
        }
    }





    return (
        <>
            
        {
            active ? (
                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    onDragEnd={onDragEnd}
                    onDrag={onDrag}
                    whileDrag={{ rotate: rotate === 0 ? 1 : rotate }}
                    exit={{
                    x: leaveX?.x,
                    y: leaveY,
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: .5},
                    }}
                    transition={{ease: [0,0,1,1], duration: 0.1}}
                    className={styles.wrapper}
                    >
                    <AnimatePresence>
                        {
                            canceling && (
                                <motion.div 
                                    initial={{scale: 0}}
                                    animate={{scale: 1}}
                                    exit={{scale: 0, opacity: 0}}
                                    transition={{
                                        type: 'spring'
                                    }}
                                    className={`${styles.status} ${styles.cancel}`}>
                                    <IconButton
                                    size={100}
                                        variant={'danger'}
                                        icon={<CgClose size={40} color='#fff'/>}
                                        />
                                </motion.div>
                            )
                        }
                        {
                            liking && (
                                <motion.div 
                                    initial={{scale: 0}}
                                    animate={{scale: 1}}
                                    exit={{scale: 0, opacity: 0}}
                                    transition={{
                                        type: 'spring'
                                    }}
                                    className={`${styles.status} ${styles.like}`}>
                                    <IconButton
                                    size={100}
                                        icon={<HiHeart size={35}/>}
                                        />
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                    <div className={styles.img}>
                        {
                            user_avatar_url && (
                                (index === 0 || index === 1) && (
                                    <Image 
                                        loader={() => user_thumbnail_url ? user_thumbnail_url : ''} 
                                        src={user_thumbnail_url ? user_thumbnail_url : logo} 
                                        alt='' 
                                        unoptimized
                                        width={560} 
                                        height={560}
                                        />
                                )
                            )
                        }
                    </div>
                    <div className={styles.label}>
                        <UserTitle
                            username={name}
                            age={age ? age.toString() : ''}
                            textBold
                            style={{color: '#fff', fontSize: 30, lineHeight: '40px'}}
                            />
                        <div className={styles.loc}>
                            {country}{state ? ', ' + state : ''}
                        </div>
                    </div>
                </motion.div>
            )   : (
                <div
                className={styles.wrapper}
                >
                <div className={styles.img}>
                    {
                        user_avatar_url && (
                            (index === 0 || index === 1) && (
                                <Image 
                                    loader={() => user_avatar_url ? user_avatar_url : ''}
                                    src={user_avatar_url ? user_avatar_url : logo}
                                    alt='' 
                                    unoptimized
                                    width={560} 
                                    height={560}
                                    />
                            )
                        )
                    }
                </div>
                <div className={styles.label}>
                    <UserTitle
                            username={name}
                            age={age ? age.toString() : ''}
                            textBold
                            style={{color: '#fff', fontSize: 30, lineHeight: '40px'}}
                            />
                        <div className={styles.loc}>
                            {country}{state ? ', ' + state : ''}
                        </div>
                </div>
            </div>
            )
        }
        
        </>
    )
}

export default Card;