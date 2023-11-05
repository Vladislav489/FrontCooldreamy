import { IUser } from '@/models/IUser';
import styles from './ProfileModal.module.scss';
import { Modal, ModalFuncProps, Row, Col } from 'antd';
import {FC, useEffect, useState} from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { Swiper as SwiperWrap, SwiperSlide } from 'swiper/react';
import {Thumbs, Navigation} from 'swiper';
import Skeleton from './components/Skeleton/Skeleton';
import { updateCurrentProfileUiid } from '@/store/actions';
import Image from 'next/image';
import ApiService from '@/service/apiService';
import UserTitle from '@/components/UserTitle/UserTitle';
import UserLocation from '@/components/UserLocation/UserLocation';
import Button from '@/components/Button/Button';
import Router, { useRouter } from 'next/router';
import placeholder from '@/public/assets/images/avatar-placeholder.png'
import Avatar from '@/components/Avatar/Avatar';
import { BsCamera } from 'react-icons/bs';

import { FaRegSmileWink } from 'react-icons/fa';
import { AiOutlineStar, AiFillStar, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';
import notify from '@/helpers/notify';
import {GoMail} from 'react-icons/go'
import getClassNames from '@/helpers/getClassNames';


const service = new ApiService()

const ProfileModal:FC<ModalFuncProps> = (props) => {
    const {currentProfileId, token, locale, currentProfileUuid} = useAppSelector(s => s)
    const dispatch = useAppDispatch()
    const {onCancel} = props
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [load, setLoad] = useState(true)
    const [createChatLoad, setCreateChatLoad] = useState(false)
    const [data, setData] = useState<IUser | null>(null)
    const [loadedImages, setLoadedImages] = useState<number>(0)

    const [isFav, setIsFav] = useState<any>(false)
    const [isLiked, setIsLiked] = useState<any>(false)


    useEffect(() => {
        if(data) {
            setIsFav(data?.is_favorite)
            setIsLiked(data?.is_liked)
        }
    }, [data])

    const {
        profile_photo, 
        name,
        age,
        country,
        state,
        about_self,
        id,
        avatar_url_thumbnail,
        user_avatar_url,
        online
    } = data || {}

    const onClose = () => {
        setLoadedImages(0)
        onCancel && onCancel()
        dispatch(updateCurrentProfileUiid(null))
    }
  
    useEffect(() => {
        if(currentProfileId && token) {
            setLoad(true)
            service.getProfile({user_id: currentProfileId}, token).then(res => {
                if(res) {
                    setData(res)
                }
            }).finally(() => {
                setLoad(false)
            })
        }
    }, [currentProfileId, token])

    const onLike = () => {
        if(token) {
            service.feedItemLike({id: Number(id)}, token).then(res => {
                if(res?.message === 'success') {
                    onClose()
                    notify(locale?.global?.notifications?.liked, 'SUCCESS')
                } else {
                    notify(locale?.global?.notifications?.already_liked, 'ERROR')
                }
            })
        }
        
    }

    const onFavorite = () => {  
        if(token) {
            service.addUserToFav({user_id: Number(id)}, token).then(res => {
                if(res?.status === 200) {
                    // notify(locale?.global?.notifications?.add_to_fav, 'SUCCESS')
                    notify('User added to favorites', 'SUCCESS')
                    onClose()
                } else {
                    // notify(locale?.global?.notifications?.already_added_to_fav, 'ERROR')
                    notify(locale?.global?.notifications?.error_default, 'ERROR')
                }
            })
        }
    }   
    
    const createChat = () => {
        if(id && token) {
            setCreateChatLoad(true)
            service.createChat({user_id: id}, token).then(res => {
                if(res?.chat_id) {
                    Router.push(`/chat/${res?.chat_id}?type=chat`)
                    onClose()
                }
            }).finally(() => setCreateChatLoad(false))
            // !! параллельное создание чата писем
            // service.createMail({user_id: id}, token).then(res => {
                
            // }).finally(() => setCreateChatLoad(false))
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
                            onClose()
                            // Router.push(`/chat/${res?.chat_id}?type=chat`)
                        }
                    })
                }
            })
        }
    }

    return (
        <Modal
            {...props}
            width={800}
            footer={false}
            onCancel={onClose}
            className={`modal purp ${styles.wrapper}`}
            centered
            >
            {
                !load ? (    
                    <>
                        <div className={styles.in}>
                            <div className={styles.top_action}>
                                <button onClick={() => {
                                    !isLiked && onLike()
                                }} className={styles.item}>
                                    <div className={styles.icon}>
                                        {
                                            isLiked ? <AiFillHeart/> : <AiOutlineHeart/>
                                        }
                                    </div>
                                    <div className={styles.text}>{locale?.global?.user_action?.like}</div>
                                </button>
                                <button onClick={onWink} className={styles.item}>
                                    <div className={styles.icon}>
                                        <FaRegSmileWink/>
                                    </div>
                                    <div className={styles.text}>{locale?.global?.user_action?.wink}</div>
                                </button>
                            </div>
                            {
                                (profile_photo && profile_photo?.length > 0) && (
                                    <div className={styles.main}>
                                        Slider
                                        {
                                            thumbsSwiper && (
                                                <div className={styles.slider}>
                                                    <div className={styles.photo_count}><BsCamera/>{profile_photo?.length}</div>
                                                    <FancyboxWrapper>
                                                    <SwiperWrap
                                                        modules={[Thumbs]}
                                                        thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                                                        className={styles.slider_body}
                                                        spaceBetween={10}
                                                        >
                                                        {
                                                            (profile_photo && profile_photo?.length > 0) ? profile_photo?.map(i => (
                                                                <SwiperSlide className={styles.slider_item} key={i.id}>
                                                                    <a data-fancybox="gallery" href={i.image_url} className={styles.item}>
                                                                        <Image
                                                                            width={300}
                                                                            height={300}
                                                                            src={i.image_url}
                                                                            alt=''
                                                                            loader={p => p?.src && typeof p?.src === 'string' ? p?.src : ''}
                                                                            />
                                                                    </a>
                                                                    
                                                                </SwiperSlide>
                                                            )) : (
                                                                <SwiperSlide className={styles.slider_item}>
                                                                    <Image
                                                                        width={300}
                                                                        height={300}
                                                                        src={placeholder}
                                                                        alt=''
                                                                        loader={p => p?.src && typeof p?.src === 'string' ? p?.src : ''}
                                                                        />
                                                                </SwiperSlide>
                                                            )
                                                        }
                                                        
                                                    </SwiperWrap>
                                                    </FancyboxWrapper>
                                                </div>
                                            ) 
                                        }
                                        {
                                            profile_photo && profile_photo?.length > 0 ? (
                                                <div className={getClassNames([styles.thumbs, (profile_photo?.length === loadedImages && profile_photo?.length > 1) && styles.show])}>
                                                    <SwiperWrap
                                                        modules={[Thumbs, Navigation]}
                                                        className={styles.thumbs_body}
                                                        navigation={{
                                                            prevEl: '.profile-modal-nav-prev',
                                                            nextEl: '.profile-modal-nav-next'
                                                        }}
                                                        slidesPerView={3}
                                                        watchSlidesProgress
                                                        onSwiper={setThumbsSwiper}
                                                        spaceBetween={10}
                                                        >
                                                        {
                                                            profile_photo?.map(i => (
                                                                <SwiperSlide className={styles.thumbs_item} key={i.id}>
                                                                    <Image
                                                                        src={i.image_url}
                                                                        alt='img'
                                                                        width={70}
                                                                        height={70}
                                                                        priority
                                                                        onLoad={() => setLoadedImages(s => s + 1)}
                                                                        loader={p => p?.src && typeof p?.src === 'string' ? p?.src : ''}
                                                                        />
                                                                </SwiperSlide>
                                                            ))
                                                        }
                                                    </SwiperWrap>
                                                    {
                                                        profile_photo?.length > 3 && (
                                                            <>
                                                                <div className={`profile-modal-nav-prev ${styles.nav} ${styles.prev}`}>
                                                                    <FiChevronLeft/>
                                                                </div>
                                                                <div className={`profile-modal-nav-next ${styles.nav} ${styles.next}`}>
                                                                    <FiChevronRight/>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            ) : null
                                        }
                                        
                                    </div>
                                ) 
                            }
                            {
                                profile_photo && profile_photo?.length === 0 && (
                                    <div className={styles.main}>
                                        <div className={styles.slider}>
                                            <SwiperWrap
                                                className={styles.slider_body}
                                                spaceBetween={10}>
                                                <SwiperSlide className={styles.slider_item}>
                                                    <div className={styles.item}>
                                                        <Image
                                                            width={300}
                                                            height={300}
                                                            src={(user_avatar_url && !user_avatar_url?.includes('cooldremy')) ? user_avatar_url : placeholder}
                                                            alt=''
                                                            loader={p => p?.src && typeof p?.src === 'string' ? p?.src : ''}
                                                            />
                                                    </div>
                                                    
                                                </SwiperSlide>
                                                
                                            </SwiperWrap>
                                        </div>
                                    </div>
                                )
                            }
                            <div className={styles.body}>
                                <div className={styles.body_action}>
                                    <button onClick={() => {
                                        !isLiked && onLike()
                                    }} className={styles.item}>
                                        <div className={styles.icon}>
                                            {
                                                isLiked ? <AiFillHeart/> : <AiOutlineHeart/>
                                            }
                                        </div>
                                        <div className={styles.text}>{locale?.global?.user_action?.like}</div>
                                    </button>
                                    <button onClick={onWink} className={styles.item}>
                                        <div className={styles.icon}>
                                            <FaRegSmileWink/>
                                        </div>
                                        <div className={styles.text}>{locale?.global?.user_action?.wink}</div>
                                    </button>
                                </div>
                                <div className={styles.body_main}>
                                    <Row gutter={[15,15]}>
                                        
                                        <Col span={24}>
                                            <div className={styles.user}>
                                                <Avatar
                                                    image={(user_avatar_url && !user_avatar_url?.includes('cooldremy')) ? user_avatar_url : placeholder}
                                                    style={{marginRight: 15}}
                                                    />
                                                <UserTitle
                                                    isOnline={online == 1}
                                                    username={name}
                                                    age={age ? age.toString() : ''}
                                                    style={{fontSize: 20}}
                                                    />
                                            </div>
                                            
                                        </Col>
                                        <Col span={24}>
                                            <UserLocation
                                                state={state}
                                                country={country}
                                                />
                                        </Col>
                                        {
                                            about_self ? (
                                                <Col span={24}>
                                                    <div className={styles.part}>
                                                        <div className={styles.label}>{locale?.profilePage?.info?.about}</div>
                                                        <div className={styles.value}>{about_self}</div>
                                                    </div>
                                                </Col>
                                            ) : null
                                        }
                                        {/* <Col span={24}>
                                            <div className={styles.action}>
                                                <Button onClick={() => {
                                                    onClose()
                                                    Router.push({
                                                        pathname: `/users/[id]`,
                                                        query: {id: id, currentProfileUuid: currentProfileUuid}
                                                    })
                                                }} middle text={locale?.popups?.profile_modal?.open_btn}/>
                                            </div>
                                        </Col> */}
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className={styles.action}>
                            <div className={styles.action_item}>
                                <Button
                                    after={<GoMail/>}
                                    onClick={createChat}
                                    load={createChatLoad}
                                    middle
                                    text={locale?.global?.user_card?.send_message}
                                    />
                            </div>
                            <div className={styles.action_item}>
                                <Button
                                    onClick={() => {
                                        onClose()
                                        Router.push({
                                            pathname: `/users/[id]`,
                                            query: {id: id, currentProfileUuid: currentProfileUuid}
                                        })
                                    }}
                                    middle
                                    text={locale?.popups?.profile_modal?.open_btn}
                                    />
                            </div>
                        </div>
                    </>
                    
                ) : <Skeleton/> 
            }
            
        </Modal>
    )
}

export default ProfileModal;