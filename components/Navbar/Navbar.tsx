import styles from './Navbar.module.scss';
import {FiSearch} from 'react-icons/fi';
import {IoChatbubblesOutline} from 'react-icons/io5';
import {FiUsers} from 'react-icons/fi'
import {AiOutlineHeart} from 'react-icons/ai'
import {BiStore} from 'react-icons/bi';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useRouter } from 'next/router';
import Avatar from '../Avatar/Avatar';
import { CSSProperties, useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import placeholder from '@/public/assets/images/avatar-placeholder.png'


const Navbar = ({
    fixed = true,
    style
}: {
    fixed?: boolean,
    style?: CSSProperties
}) => {
    const {unreadChatCount, userData, token, sympCountData} = useAppSelector(s => s)
    const {count_likes,count_mutual,count_watches} = sympCountData || {}
    const {pathname} = useRouter()
    const {width} = useWindowSize()
    const [sympCount, setSympCount] = useState(0)

    useEffect(() => {
        setSympCount((count_likes + count_mutual + count_watches) > 0 ? (count_likes + count_mutual + count_watches) : 0)
    }, [sympCountData])



    if(token && pathname !== '/' && pathname !== '/start' && pathname !== '/signup' && width <= 768) {
        return (
            <div className={styles.wrapper} style={style}>
                <div className={styles.in}>
                    <div className={styles.item}>
                        <Link className={`${styles.btn}`} href={'/profile'}>
                            <Avatar
                                size={30}
                                style={{border: pathname?.includes('/profile') ? '1px solid var(--violet)' : '1px solid transparent'}}
                                round
                                image={userData?.user_thumbnail_url && !userData?.user_thumbnail_url?.includes('cooldremy') ? userData?.user_thumbnail_url : placeholder}
                                />
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link className={`${styles.btn} ${pathname?.includes('/search') ? styles.active : ''}`} href={'/search'}>
                            <FiSearch/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link className={`${styles.btn} ${pathname?.includes('/chat') ? styles.active : ''}`} href={'/chat?type=chat'}>
                            <IoChatbubblesOutline/>
                            {
                                unreadChatCount > 0 && (
                                    <div className={styles.badge}>{unreadChatCount > 99 ? '+99' : unreadChatCount}</div>
                                )
                            }
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link className={`${styles.btn} ${pathname?.includes('/feed') ? styles.active : ''}`} href={'/feed'}>
                            <FiUsers/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link className={`${styles.btn} ${pathname?.includes('/sympathy') ? styles.active : ''}`} href={'/sympathy'}>
                            {
                                sympCount > 0 && (
                                    <div className={styles.badge}>{sympCount > 99 ? '+99' : sympCount}</div>
                                )
                            }
                            <AiOutlineHeart/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link className={`${styles.btn} ${styles.market} ${pathname?.includes('/deposit') ? styles.active : ''}`} href={'/deposit-mb'}>
                            <BiStore/>
                        </Link>
                    </div>
                    
                </div>
            </div>
        )
    }

    return null;
    
}


export default Navbar;