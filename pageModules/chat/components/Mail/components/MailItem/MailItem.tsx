import styles from './MailItem.module.scss';
import {FC} from 'react';
import Avatar from '@/components/Avatar/Avatar';
import UserTitle from '@/components/UserTitle/UserTitle';
import { chatMailTypes, mailItemType } from '@/pageModules/chat/types';
import moment from 'moment';
import {useState, useEffect} from 'react';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import chatMessageTypeVariants from '@/helpers/messageVariants';
import { IMail } from '@/pageModules/chat/types';
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';
import Image from 'next/image';
import { useWindowSize } from 'usehooks-ts';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { useInView } from 'react-intersection-observer';
import { decreaseUnreadMailCount } from '@/store/actions';
import { useRouter } from 'next/router';
const service = new ApiService()


const MailItem:FC<IMail> = ({
    id,
    index,
    type,
    avatar,
    name,
    isPayed,
    images,
    gifts,
    age,
    createdAt,
    updatedAt,
    sticker,
    text,
    isSelf,
    status,


    updateChat,
    updateDialog
}) => {
    const {token} = useAppSelector(s => s)
    const [openLoad, setOpenLoad] = useState(false)
    const {width} = useWindowSize()
    const {query} = useRouter()
    const dispatch = useAppDispatch()

    const {inView, ref} = useInView({
        triggerOnce: true,
    })

    

    useEffect(() => {
        if(status === 'unread' && id && inView && !isSelf) {
            if(token) {
                service.readMail({letter_message_id: Number(id)}, token).then(res => {
                    if(res?.message === 'success') {
                        dispatch(decreaseUnreadMailCount())
                        if(query && query?.id && typeof query?.id === 'string') {
                            // updateDialogsList && updateDialogsList((s: any) => {
                            //     const m = s;
                            //     const findItem = m.find((i:any) => i.id == query?.id)
                            //     if(findItem) {
                            //         const rm = m.splice(m.findIndex((i:any) => i?.id == findItem?.id), 1, {...findItem, unread_messages_count: findItem?.unread_messages_count > 0 ? findItem?.unread_messages_count - 1 : findItem?.unread_messages_count})

                            //         return sortingDialogList([...m])
                            //     }
                            //     return sortingDialogList([...m])
                            // })
                        }
                    }
                })
            }
        }
    }, [status, token, id, inView, isSelf])


    
    const switchMessageType = (type?: chatMailTypes) => {
        switch(type) {
            case chatMessageTypeVariants?.letterText:
                return  (
                    <div className={styles.content_text}>
                        {
                            text && (
                                <div className={styles.text_body}>
                                    {text}
                                </div>
                            )
                        }
                        {
                            isSelf ? (
                                images?.length > 0 && (
                                    <FancyboxWrapper>
                                        <div className={styles.media}>
                                            {images?.map((item, index) => (
                                                <a data-fancybox="gallery" href={item.image} className={styles.item} key={index}>
                                                    <Image
                                                        width={100}
                                                        height={100}
                                                        alt=''
                                                        src={item?.thumbnail ? item.thumbnail : ''}
                                                        loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                                        />
                                                </a>
                                            ))}
                                        </div>
                                    </FancyboxWrapper>
                                )
                            ) : (
                                isPayed ? (
                                    images?.length > 0 && (
                                        <FancyboxWrapper>
                                            <div className={styles.media}>
                                                {images?.map((item, index) => (
                                                    item?.image ? (
                                                        <a data-fancybox="gallery" href={item.image} className={styles.item} key={index}>
                                                            <Image
                                                                width={100}
                                                                height={100}
                                                                alt=''
                                                                src={item?.thumbnail ? item.thumbnail : ''}
                                                                loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                                                />
                                                        </a>
                                                    ) : (
                                                        <div className={styles.item} key={index}>
                                                            <Image
                                                                width={100}
                                                                height={100}
                                                                alt=''
                                                                src={item?.blur ? item.blur : ''}
                                                                loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                                                />
                                                        </div>
                                                    )
                                                    
                                                ))}
                                            </div>
                                        </FancyboxWrapper>
                                        
                                    )
                                ) : (
                                    images?.length > 0 && (
                                        <div className={styles.media}>
                                            {images?.map((item, index) => (
                                                <div className={styles.item} key={index}>
                                                    <Image
                                                        width={100}
                                                        height={100}
                                                        alt=''
                                                        src={item?.blur ? item.blur : ''}
                                                        loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                                        />
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )
                            )
                        }
                    </div>
                )
            default:
                return null
    
        }
    }


    // const openMail = () => {
    //     if(token && id) {
    //         setOpenLoad(true)
    //         service.mailOpenPay({letter_text_message_id: id}, token).then(res => {

    //         }).finally(() => {
    //             setOpenLoad(false)
    //         })
    //     }        
    // }


    return (
        <div ref={ref} className={styles.wrapper}>
            <div className={styles.avatar}>
                <Avatar 
                    image={avatar}
                    round
                    size={40}/>
            </div>
            <div className={styles.body}>
                <div className={styles.head}>
                    <div className={styles.user}>
                        <UserTitle
                            username={name}
                            age={age?.toString()}
                            />
                    </div>
                    {
                        width > 768 && (
                            <div className={styles.tm}>
                                <div className={styles.status}></div>
                                <div className={styles.label}>{moment(updatedAt).format('D MMMM YYYY, h:mm')}</div>
                            </div>
                        )
                    }
                   
                </div>
                <div className={styles.content}>
                    {switchMessageType(type)}
                </div>
                {
                    !(isPayed || isSelf) && (
                        <div className={styles.action}>
                            <div className={styles.item}>
                                <button className={styles.open}>Open mail</button>
                            </div>
                        </div>   
                    )
                }
                {
                    width <= 768 && (
                        <div className={styles.bottom}>
                             <div className={styles.tm}>
                                <div className={styles.status}></div>
                                <div className={styles.label}>{moment(updatedAt).format('D MMMM YYYY, h:mm')}</div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}


export default MailItem;