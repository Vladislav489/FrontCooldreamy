import styles from './ChatItem.module.scss';
import Link from 'next/link';
import { chatItemPropsTypes } from '../../types';
import UserTitle from '@/components/UserTitle/UserTitle';
import {Row, Col} from 'antd';
import LinesEllipsis from 'react-lines-ellipsis'
import Badge from '@/components/Badge/Badge';
import {BiCheckDouble, BiCheck} from 'react-icons/bi';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai';
import Avatar from '@/components/Avatar/Avatar';
import { useRouter } from 'next/router';
import ApiService from '@/service/apiService';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import IconButton from '@/components/IconButton/IconButton';
import notify from '@/helpers/notify';
import { updateCurrentProfileId, updateCurrentProfileUiid } from '@/store/actions';
import chatMessageTypeVariants from '@/helpers/messageVariants';
import placeholder from '@/public/assets/images/avatar-placeholder.png';
const service = new ApiService()

interface I extends chatItemPropsTypes {
    updateDialogsList: (...args: any[]) => any,
    filter?: 'all' | 'unread' | 'ignored' | 'favorite',
    uuid?: any
}

const ChatItem = ({
    favorite,
    first_user_id,
    id,
    is_ignored_by_first_user,
    is_ignored_by_second_user,
    last_message,
    another_user,
    is_confirmed_user,
    text,
    active,
    
    updateDialogsList,
    filter,
    uuid,
    unread_messages_count
}:I) => {
    const dispatch = useAppDispatch()
    const {query} = useRouter()
    const {type} = query || null
    const {token, locale} = useAppSelector(s => s)
    const {avatar_url_thumbnail, name, age, online, user_avatar_url, user_thumbnail_url} = another_user || {};


    const switchChatType = (type?: string) => {
        switch(type) {
            case chatMessageTypeVariants.messageImage:
                return 'Picture'
            case chatMessageTypeVariants.messageText:
                return  (
                    typeof last_message?.chat_messageable?.text === 'string' && (
                    <LinesEllipsis
                        text={last_message?.chat_messageable?.text}
                        maxLine={2}
                        />
                    )
                )
            case chatMessageTypeVariants.messageWink:
                return 'Wink'
            case chatMessageTypeVariants.messageGift:
                return 'Gift'
            case chatMessageTypeVariants.messageSticker:
                return 'Sticker'
            default:
                return null
        }
    }


    const addToFav = () => {
        if(token && id && another_user?.id) {
            service.addUserToFav({user_id: another_user.id}, token).then(res => {
                if(res?.status === 200) {
                    updateDialogsList((s: any | any[]) => {
                        const findItem = s.find((i: any) => i.id === id)
                        if(findItem) {
                            const m = s;
                            const rm = m.splice(m.findIndex((i:any) => i.id === findItem.id), 1, {...findItem, favorite: true})
                            return [...m]
                        } else return s;
                    })
                    notify(locale?.global?.notifications?.success_add_chat_to_fav, 'SUCCESS')
                } else {
                    notify(locale?.global?.notifications?.error_default, 'ERROR')
                }
            })
        }
    }


    const deleteFromFav = () => {
        if(token && id && another_user?.id) {
            service.deleteUserFromFav({user_id: another_user?.id}, token).then(res => {
                if(res?.status === 200) {
                    updateDialogsList((s: any | any[]) => {
                        const findItem = s.find((i: any) => i.id === id)
                        if(findItem) {
                            const m = s;
                            if(filter === 'favorite') {
                                const rm = m.splice(m.findIndex((i:any) => i.id === findItem.id), 1)
                                return [...m]
                            } else {
                                const rm = m.splice(m.findIndex((i:any) => i.id === findItem.id), 1, {...findItem, favorite: false})
                                return [...m]
                            }
                        } else return s;
                    })
                } else {
                    notify('Произошла ошибка', 'ERROR')
                }
            })
        }
    }


    if(type === 'chat') {
        if(!last_message) return <></>
        return (
            <div  className={`${styles.wrapper} ${active ? styles.active : ''}`}>
                {/* <Link href={`/users/${another_user?.id}`} className={styles.avatar}>
                    <Avatar
                        size={63}
                        verified={is_confirmed_user == 1}
                        image={avatar_url_thumbnail}    
                        />
                </Link> */}
                <div onClick={() => {
                    if(another_user?.id) {
                        dispatch(updateCurrentProfileId(another_user?.id))
                        dispatch(updateCurrentProfileUiid(uuid))
                    }
                }} className={styles.avatar}>
                    <Avatar
                        size={63}
                        verified={is_confirmed_user == 1}
                        image={(user_avatar_url && !user_avatar_url?.includes('cooldremy')) ? user_avatar_url : placeholder}    
                        />
                </div>
                <div className={styles.body}>
                    <Link
                        href={`/chat/${id}?type=${type}`} 
                        className={styles.main}>
                        <Row gutter={[2,2]}>
                            <Col span={24}>
                                <UserTitle 
                                    username={name}
                                    age={age ? age.toString() : ''}
                                    textBold
                                    isOnline={online === 1}/>
                            </Col>
                            <Col span={24}>
                                <div className={styles.dialog}>
                                    {switchChatType(last_message?.chat_messageable_type)}
                                </div>
                            </Col>
                        </Row>
                    </Link>    
                    <div className={styles.ex}>
                        <div className={styles.item}>
                            {
                                !(is_ignored_by_first_user || is_ignored_by_second_user) && (
                                    favorite ? (
                                        <IconButton
                                            onClick={deleteFromFav}
                                            size={20}
                                            variant={'transparent'}
                                            icon={<AiFillStar color='var(--violet)'/>}
                                            />
                                        
                                    ) : (
                                        <IconButton
                                            onClick={addToFav}
                                            size={20}
                                            variant={'transparent'}
                                            icon={<AiOutlineStar color='var(--violet)'/>}
                                            />
                                    )
                                )
                            }
                        </div>
                        {
                            (unread_messages_count && unread_messages_count > 0) ? (
                                <div className={styles.item}>
                                    <Badge
                                        value={unread_messages_count}
                                        />
                                </div>
                            ) : (
                                last_message && (
                                    last_message?.is_read_by_recepient === 1 ? (
                                        <div className={styles.item}>
                                            <BiCheckDouble/>
                                        </div>
                                    ) : (
                                        <div className={styles.item} style={{color: 'var(--gray)'}}>
                                            <BiCheck/>
                                        </div>
                                    )
                                )
                            )
                        }
                    </div>
                </div> 
            </div>
        )
    }

    return (
        <div className={`${styles.wrapper} ${active ? styles.active : ''}`}>
            <div onClick={() => {
                if(another_user?.id) {
                    dispatch(updateCurrentProfileId(another_user?.id))
                    dispatch(updateCurrentProfileUiid(uuid))
                }
            }} className={styles.avatar}>
                <Avatar
                    size={63}
                    verified={is_confirmed_user == 1}
                    image={(user_avatar_url && !user_avatar_url?.includes('cooldremy')) ? user_avatar_url : placeholder}
                    />
            </div>
            <div className={styles.body}>
                <Link 
                    href={`/chat/${id}?type=${type}`}
                    className={styles.main}>
                    <Row gutter={[2,2]}>
                        <Col span={24}>
                            <UserTitle 
                                username={name}
                                age={age ? age.toString() : ''}
                                textBold
                                isOnline={online === 1}/>
                        </Col>
                        <Col span={24}>
                            <div className={styles.dialog}>
                                {
                                    typeof last_message?.letter_messageable?.text === 'string' && 
                                        <LinesEllipsis
                                            text={last_message?.letter_messageable?.text}
                                            maxLine={2}
                                    />
                                }
                            </div>
                        </Col>
                    </Row>
                </Link>    
            </div> 
        </div>
    )
    return null

    
}

export default ChatItem;