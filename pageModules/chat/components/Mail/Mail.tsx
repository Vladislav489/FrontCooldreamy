import styles from './Mail.module.scss';
import MailItem from './components/MailItem/MailItem';
import {IChat} from '../../types';
import {FC, useEffect, useState} from 'react';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useInView } from 'react-intersection-observer';
import SkeletonMail from './components/SkeletonMail/SkeletonMail';

interface I extends IChat {
    height?: string
}

const Mail:FC<I> = ({
    height,
    chatList,
    updateChatListPage,
    totalChatItemCount
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
            <div className={styles.list} >
                {
                    chatList?.map((item, index) => (
                        <MailItem
                            key={index}
                            id={item.id}
                            index={index}
                            type={item?.letter_messageable_type}
                            avatar={item?.sender_user?.user_thumbnail_url || item?.sender_user?.user_avatar_url}
                            name={item?.sender_user?.name}
                            age={item?.sender_user?.age}
                            isPayed={item?.letter_messageable?.is_payed === 1 ? true : false}
                            images={item?.letter_messageable?.images?.map((i:any) => ({
                                image: i.image_url,
                                thumbnail: i.thumbnail_url,
                                big_thumbnail: i.big_thumbnail_url,
                                blur: i.blur_thumbnail_url
                            }))}
                            gifts={item?.letter_messageable?.gifts}
                            sticker={item?.letter_messageable?.sticker}
                            text={item?.letter_messageable?.text}
                            updatedAt={item.updated_at}
                            createdAt={item.created_at}
                            isSelf={item.sender_user_id === Number(userId)}
                            status={item?.is_read_by_recepient === 1 ? 'read' : 'unread'}
                            />
                    ))
                }
            </div>
            {
                (chatList && chatList?.length > 0) && (
                    loadMore && (
                        <div ref={ref} className={styles.load}>
                            <SkeletonMail/>
                        </div>
                    )
                )
            }
        </div>
        
    )
}


export default Mail;