import styles from './ChatMenu.module.scss';
import {FC} from 'react';
import {IoImagesOutline, IoCloseCircleOutline} from 'react-icons/io5'
import {FaRegSmileWink} from 'react-icons/fa'
import {AiOutlineStar} from 'react-icons/ai';
import {HiOutlineMinusCircle} from 'react-icons/hi';
import { useAppSelector } from '@/hooks/useTypesRedux';

interface I {
    onGetAllMedia?: (...args: any) => any,
    onWink?: (...args: any) => any,
    onFav?: (...args: any) => any,
    onIgnore?: (...args: any) => any,
    onReport?: (...args: any) => any,
    onCloseMenu: (...args:any) => any
}


const ChatMenu:FC<I> = ({
    onGetAllMedia,
    onWink,
    onFav,
    onIgnore,
    onReport,
    onCloseMenu
}) => {
    const {locale} = useAppSelector(s => s)

    return (
        <div className={styles.wrapper}>
            {/* <div 
                onClick={onGetAllMedia}
                className={styles.item}>
                <div className={styles.icon}><IoImagesOutline/></div>
                <div className={styles.label}>Все медиа файлы</div>
            </div> */}
            <div 
                onClick={() => {
                    onWink && onWink()
                    onCloseMenu()
                }}
                className={styles.item}>
                <div className={styles.icon}><FaRegSmileWink/></div>
                <div className={styles.label}>{locale?.chatPage?.menu?.wink}</div>
            </div>
            <div 
                onClick={() => {
                    onFav && onFav()
                    onCloseMenu()
                }}
                className={styles.item}>
                <div className={styles.icon}><AiOutlineStar/></div>
                <div className={styles.label}>{locale?.chatPage?.menu?.fav}</div>
            </div>
            <div 
                onClick={() => {
                    onIgnore && onIgnore()
                    onCloseMenu()
                }}
                className={styles.item}>
                <div className={styles.icon}><HiOutlineMinusCircle/></div>
                <div className={styles.label}>{locale?.chatPage?.menu?.ignore}</div>
            </div>
            <div 
                onClick={() => {
                    onReport && onReport()
                    onCloseMenu()
                }}
                className={styles.item}>
                <div className={styles.icon}><IoCloseCircleOutline/></div>
                <div className={styles.label}>{locale?.chatPage?.menu?.report}</div>
            </div>
        </div>
    )
}

export default ChatMenu;