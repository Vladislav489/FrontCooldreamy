import styles from './UserInfoAction.module.scss';
import {FiHeart} from 'react-icons/fi';
import {FaRegSmileWink} from 'react-icons/fa';
import {AiOutlineStar} from 'react-icons/ai';
import UserTitle from '@/components/UserTitle/UserTitle';
import { IUser } from '@/models/IUser';
import {FC, useEffect, useState} from 'react';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import Router from 'next/router';
import notify from '@/helpers/notify';
import { BsHeart, BsHeartFill } from 'react-icons/bs';


const service = new ApiService()


const UserInfoAction:FC<IUser> = ({
    name,
    age,
    state,
    country,
    id,
    is_liked
}) => {
    const {token, locale} = useAppSelector(s => s)

    const [liked, setLiked] = useState(false)

    useEffect(() => {
        is_liked ? setLiked(true) : setLiked(false)
    }, [is_liked])

    const onLike = () => {
        if(token) {
            service.feedItemLike({id: Number(id)}, token).then(res => {
                console.log(res)
                if(res?.message === 'success') {
                    notify('User Liked', 'SUCCESS')
                    setLiked(true)
                } else {
                    notify('User already Liked', 'ERROR')
                }
            })
        }
        
    }

    const onWink = () => {
        if(id && token) {
            service.createChat({user_id: id}, token).then(res => {
                if(res?.chat_id) {
                    service.sendWink({user_id: id}, token).then(r => {
                        if(r?.error) {
                            notify(locale?.global?.notifications?.already_wink, 'ERROR')
                        } else {
                            Router.push(`/chat/${res?.chat_id}?type=chat`)
                        }
                    })
                }
            })
        }
    }

    return (
        <div className={`${styles.wrapper} ${styles.online}`}>
            <div className={styles.main}>
                <div className={styles.name}>
                    <UserTitle
                        username={name}
                        age={age?.toString()}
                        isOnline={false}
                        style={{fontSize: 24}}
                        />
                </div>
                {
                    country && state ? (
                        <div className={styles.location}>
                            {country}, {state}
                        </div>
                    ) : null
                }
            </div>
            <div className={styles.action}>
                <button onClick={() => {
                    if(!liked) {
                        onLike()
                    }
                }} className={styles.item}>
                    <div className={styles.icon}>
                        {
                            liked ? <BsHeartFill/> : <BsHeart/>
                        }
                    </div>
                    <div className={styles.text}>{locale?.global?.user_action?.like}{liked ? 'D' : ''}</div>
                </button>
                <button onClick={onWink} className={styles.item}>
                    <div className={styles.icon}>
                        <FaRegSmileWink/>
                    </div>
                    <div className={styles.text}>{locale?.global?.user_action?.wink}</div>
                </button>
            </div>
        </div>
    )
}

export default UserInfoAction;