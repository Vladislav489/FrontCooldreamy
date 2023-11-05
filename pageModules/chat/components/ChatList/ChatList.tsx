import styles from './ChatList.module.scss';
import ChatItem from '../ChatItem/ChatItem';
import PromoBadge from '../PromoBadge/PromoBadge';
import ApiService from '@/service/apiService';
import {FC, useEffect, useState} from 'react';
import { useInView } from 'react-intersection-observer';
import { IDialogs } from '../../types';
import ChatPricing from '../ChatPricing/ChatPricing';
import { useWindowSize } from 'usehooks-ts';

const ChatList:FC<IDialogs> = ({
    activeDialogId,
    dialogsList = [],
    updateDialogsPage,
    totalDialogItemCount,

    updateDialogsList,
    filter
}) => {
   
    const {inView, ref} = useInView({
        rootMargin: '150px'
    })
    const [loadMore, setLoadMore] = useState(false)
    const {width} = useWindowSize()

    useEffect(() => {
        dialogsList?.length === totalDialogItemCount ? setLoadMore(false) : setLoadMore(true)
    }, [dialogsList, totalDialogItemCount])



    useEffect(() => {
        if(loadMore && inView) {
            updateDialogsPage && updateDialogsPage((s: number) => s + 1)
        }
    }, [inView, loadMore, updateDialogsPage])





  
    return (
        <div className={`${styles.wrapper} custom-scroll-vertical`}>
            <PromoBadge/>
            {
                dialogsList?.length > 0 && dialogsList?.map((item, index) => (
                    item?.id && (
                        <ChatItem
                            key={index}
                            {...item}
                            active={item?.id === activeDialogId}
                            updateDialogsList={updateDialogsList}
                            filter={filter}
                        />
                    )
                ))
                // <div className={styles.empty}>Нет переписок</div>
            }
            {
                dialogsList && dialogsList?.length > 0 && (
                    loadMore && (
                        <div ref={ref} className={styles.loader}>
                            {/* <SkeletonChatList/> */}
                        </div>
                    )
                )
            }
            {width > 768 && <ChatPricing/>}
        </div>  
    )
}

export default ChatList;