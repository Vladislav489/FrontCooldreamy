import styles from './Dialog.module.scss';
import {useState, useEffect, FC} from 'react';
import DialogItem from './components/DialogItem/DialogItem';
import { IChat } from '../../types';
import { PulseLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { AnimatePresence } from 'framer-motion';

interface I extends IChat {
    height?: string,
    updateDialogsList?: (...args: any[]) => any,
    updateChatList?: (...args: any[]) => any
}


const Dialog:FC<I> = ({
    chatList,
    updateChatListPage,
    id,
    height,
    totalChatItemCount,

    updateDialogsList,
    updateChatList
}) => {
    const {userId} = useAppSelector(s => s)
    const {inView, ref} = useInView({
        rootMargin: '150px'
    })

    const [loadMore, setLoadMore] = useState(false)

    useEffect(() => {
        if(totalChatItemCount !== undefined) {
            chatList?.length >= totalChatItemCount ? setLoadMore(false) : setLoadMore(true)
        }
    }, [chatList, totalChatItemCount])

    useEffect(() => {
        if(loadMore && inView) {
            updateChatListPage && updateChatListPage((s: number) => s + 1)
        }
    }, [inView, loadMore, updateChatListPage])

    return (
        <div className={styles.wrapper} style={{maxHeight: height}}>
            <AnimatePresence>
                {
                    chatList?.map((item, index) => (
                        <DialogItem
                            key={index}
                            id={item.id}
                            avatar={item?.sender_user?.avatar_url_thumbnail}
                            status={item?.is_read_by_recepient === 1 ? 'read' : 'unread'}
                            text={item.chat_messageable?.text}
                            images={[{image: item.chat_messageable?.image_url, thumbnail: item?.chat_messageable?.thumbnail_url}]}
                            gifts={item.chat_messageable?.gifts}
                            sticker={item.chat_messageable?.sticker}
                            type={item?.chat_messageable_type}
                            isSelf={item.sender_user_id === Number(userId)} 
                            createdAt={item.created_at}
                            updatedAt={item.updated_at}
                            index={index}
                            showAvatar={item.sender_user_id !== chatList[index - 1]?.sender_user_id}
                            senderUser={item?.sender_user}
                            is_payed={item?.is_payed}
                            updateDialogsList={updateDialogsList}
                            updateChatList={updateChatList}
                            />
                    ))
                }
            </AnimatePresence>
            {
                (chatList && chatList?.length > 0) && (
                    loadMore && (
                        <div ref={ref} className={styles.load}>
                            <PulseLoader color='var(--violet)'/>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Dialog;