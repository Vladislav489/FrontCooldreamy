import styles from './DialogItem.module.scss';
import {FC, useEffect, memo, useState} from 'react';
import {chatMessageTypes} from '@/pageModules/chat/types';
import Avatar from '@/components/Avatar/Avatar';
import {BsCheckAll, BsCheck} from 'react-icons/bs';
import Image from 'next/image';
import {motion} from 'framer-motion';
import moment from 'moment';
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';
import {IMessage} from '@/pageModules/chat/types';
import {useInView} from 'react-intersection-observer';
import {useAppSelector} from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import {useRouter} from 'next/router';
import {decreaseUnreadChatCount, updateCurrentProfileId, updateUserData} from '@/store/actions';
import {useAppDispatch} from '@/hooks/useTypesRedux';
import winkImg from '@/public/assets/images/wink-sticker.png';
import {sortingChatList, sortingDialogList} from '@/helpers/sorting';
import blur2
    from '@/public/assets/images/censor-blur-effect-texture-isolated-blurry-pixel-color-censorship-element-naked-pixel-blur-nude-skin-censor-pattern-vector.jpg'
import notify from '@/helpers/notify';
import placeholder from '@/public/assets/images/avatar-placeholder.png';

const service = new ApiService()

interface I extends IMessage {
    showAvatar?: boolean,
    updateDialogsList?: (...args: any[]) => any,
    updateChatList?: (...args: any[]) => any
    is_payed?: 1 | 0,
    data?: any
}

const DialogItemComponent: FC<I> = ({
                                        id,
                                        avatar,
                                        createdAt,
                                        updatedAt,
                                        status,
                                        isSelf,
                                        type,
                                        text,
                                        images,
                                        sticker,
                                        gifts,
                                        index,
                                        showAvatar,
                                        senderUser,
                                        data,

                                        is_payed,
                                        updateDialogsList,
                                        updateChatList
                                    }) => {
    const dispatch = useAppDispatch()
    const {token, userData} = useAppSelector(s => s)
    const {inView, ref} = useInView()

    const {query} = useRouter()

    useEffect(() => {
        if (status === 'unread' && id && inView && !isSelf) {
            if (token) {
                service.readMessage({chat_message_id: Number(id)}, token).then(res => {
                    if (res?.message === 'success') {
                        dispatch(decreaseUnreadChatCount())
                        if (query && query?.id && typeof query?.id === 'string') {
                            updateDialogsList && updateDialogsList((s: any) => {
                                // const m = s;
                                // const findItem = m.find((i:any) => i.id == query?.id)
                                // if(findItem) {
                                //     const rm = m.splice(m.findIndex((i:any) => i?.id == findItem?.id), 1, {...findItem, unread_messages_count: findItem?.unread_messages_count > 0 ? findItem?.unread_messages_count - 1 : findItem?.unread_messages_count})
                                //
                                //     return sortingDialogList([...m])
                                // }
                                // return sortingDialogList([...m])
                                return s.map((el: any) => {
                                    if (el.id !== Number(query.id)) return el;

                                    return {
                                        ...el,
                                        unread_messages_count: 0,
                                        last_message: {
                                            ...el.last_message,
                                            is_read_by_recepient: 1
                                        },
                                    }
                                });
                            })
                        }
                    }
                })
            }
        }
    }, [status, token, id, inView, isSelf])


    const chatImagePay = () => {
        if (id && token) {
            service.chatImagePay(token, id).then(res => {

                if (res?.message === 'success') {
                    updateChatList && updateChatList((s: any) => {
                        const m = s;
                        const findItem = m.find((i: any) => i?.id == id)
                        const rm = m.splice(m.findIndex((i: any) => i?.id == id), 1, {...findItem, is_payed: 1})
                        return sortingChatList([...m])
                    })
                    service.getCredits(token).then(credits => {
                        dispatch(updateUserData({...userData, credits}))
                    })
                } else {
                    notify('Error', "ERROR")
                }
            })
        }
    }

    const [isLod, setIsLod] = useState(false)
    const chatBlurPay = async (body: any) => {
        if (is_payed === 1 || isLod === true) return false;
        notify('Processing request', "INFO")
        setIsLod(true)
        try {
            if (id && token) {
                const res = await service.chatBlurPay(token, {
                    'chat_id': body.chat_id,
                    'message_id': body.id,
                    'chat_messageable_type': body.chat_messageable_type
                })

                if (res?.message === 'success') {
                    updateChatList && updateChatList((s: any) => {
                        const m = s;
                        const findItem = m.find((i: any) => i?.id == id)
                        const rm = m.splice(m.findIndex((i: any) => i?.id == id), 1, {...findItem, is_payed: 1})
                        return sortingChatList([...m])
                    })
                    service.getCredits(token).then(credits => {
                        dispatch(updateUserData({...userData, credits}))
                    })
                } else {
                    // notify('Error', "ERROR")
                }
            }
        } catch (e) {

        } finally {
            setIsLod(false)
        }
    }


    const switchMessageType = (type?: chatMessageTypes) => {
        switch (type) {
            case 'App\\Models\\ChatImageMessage':
                return (
                    <div className={styles.media}>
                        {
                            is_payed === 1 ? (
                                <>
                                    <FancyboxWrapper>
                                        <div className={styles.body} onClick={() => chatBlurPay(data)}>
                                            <a data-fancybox="gallery" href={images[0].image} className={styles.item}>
                                                <Image
                                                    src={images[0].thumbnail ? images[0].thumbnail : ''}
                                                    loader={(p) => {
                                                        return p?.src && typeof p?.src === 'string' ? p?.src : ''
                                                    }}
                                                    alt=''
                                                    width={100}
                                                    height={100}
                                                />
                                            </a>
                                        </div>
                                    </FancyboxWrapper>
                                    <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
                                </>
                            ) : (
                                <>
                                    <div className={styles.body}>
                                        <a className={styles.item}
                                            // onClick={chatImagePay}
                                           onClick={() => chatBlurPay(data)}
                                        >
                                            <Image
                                                src={images[0].image ?? ''}
                                                loader={(p) => {
                                                    return p?.src && typeof p?.src === 'string' ? p?.src : ''
                                                }}
                                                alt=''
                                                width={100}
                                                height={100}
                                            />
                                        </a>
                                    </div>

                                    <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
                                </>
                            )
                        }

                    </div>
                )
            case 'App\\Models\\ChatVideoMessage':
                console.log(data)
                if (data.is_payed) {
                    return (
                        <div className={styles.bubble} key={data.chat_messageable.video_url}>
                            <div className={styles.text} style={{paddingTop: 0}}>
                                <video controls width="100%" style={{maxWidth: 500, maxHeight: 300}} height="100%">
                                    <source src={data.chat_messageable.video_url} type="video/mp4"/>
                                    <source src={data.chat_messageable.video_url} type="video/webm"/>
                                    <source src={data.chat_messageable.video_url} type="video/ogg"/>
                                    Your browser dont support this video
                                </video>
                            </div>
                        </div>
                    )
                }

                return (
                    <div className={styles.media} onClick={() => chatBlurPay(data)}>
                        <div className={styles.body}>
                            <a data-fancybox="gallery" href={'#'} className={styles.item}>
                                <Image
                                    src={'https://api2.cooldreamy.com/adult_content_video.jpg'}
                                    loader={(p) => {
                                        return p?.src && typeof p?.src === 'string' ? p?.src : ''
                                    }}
                                    alt=''
                                    width={100}
                                    height={100}
                                />
                            </a>
                        </div>
                        <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
                    </div>
                )
            case "App\\Models\\ChatTextMessage":
                return (
                    <div className={styles.bubble}>
                        <div className={styles.text}>
                            <p>
                                {text}
                            </p>

                        </div>
                        <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
                    </div>
                )
            case "App\\Models\\ChatWinkMessage":
                return (
                    <div className={styles.bubble}>
                        <div className={styles.text}>
                            <motion.div
                                initial={{opacity: 0, scale: 0}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{type: 'spring', damping: 17, stiffness: 400}}
                            >
                                <Image
                                    src={winkImg}
                                    width={50}
                                    height={50}
                                    alt=''
                                />
                            </motion.div>
                        </div>
                    </div>
                )
            case "App\\Models\\ChatGiftMessage":
                console.log(gifts)
                return (
                    <div className={styles.media}>
                        <div className={styles.body}>
                            {
                                gifts?.map((item, index) => (
                                    <div className={styles.item} key={index}>
                                        <Image
                                            src={item?.picture_url ? item?.picture_url : ''}
                                            loader={(p) => {
                                                return p?.src && typeof p?.src === 'string' ? p?.src : ''
                                            }}
                                            alt=''
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                )
            case "App\\Models\\ChatStickerMessage":
                return (
                    <div className={styles.media}>
                        <div className={styles.body}>
                            <div className={styles.item}>
                                <Image
                                    src={sticker?.picture_url ? sticker?.picture_url : ''}
                                    loader={(p) => {
                                        return p?.src && typeof p?.src === 'string' ? p?.src : ''
                                    }}
                                    alt=''
                                    width={100}
                                    height={100}
                                />
                            </div>
                        </div>
                    </div>
                )
            default:
                return null

        }
    }


    return (
        <div ref={ref} className={`${styles.wrapper} ${isSelf ? styles.right : styles.left}`}>
            {
                isSelf ? (
                    <div className={`${styles.body} ${styles.me}`}>
                        <div
                            className={styles.message}>
                            {switchMessageType(type)}
                            {
                                status === 'read' && (
                                    <div className={styles.ex}>
                                        <div className={styles.icon}><BsCheckAll/></div>
                                    </div>
                                )
                            }
                            {
                                status === 'unread' && (
                                    <div className={`${styles.ex} ${styles.unread}`}>
                                        <div className={styles.icon}><BsCheck/></div>
                                    </div>
                                )
                            }
                        </div>

                        <div className={`${styles.avatar} ${!showAvatar ? styles.hide : ''}`}>
                            <Avatar
                                round
                                image={(avatar && !avatar?.includes('cooldremy')) ? avatar : placeholder}
                                size={40}
                            />
                        </div>
                    </div>
                ) : (
                    <div className={`${styles.body} ${styles.you}`}>
                        {/* onClick={() => Router.push(`/users/${senderUser?.id}`)} */}
                        <div onClick={() => dispatch(updateCurrentProfileId(senderUser?.id))}
                             className={`${styles.avatar} ${!showAvatar ? styles.hide : ''}`}>
                            <Avatar
                                round
                                image={(avatar && !avatar?.includes('cooldremy')) ? avatar : placeholder}
                                size={40}
                            />
                        </div>
                        <div
                            className={styles.message}>
                            {switchMessageType(type)}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

const DialogItem = memo(DialogItemComponent)
export default DialogItem;