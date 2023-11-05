import styles from './Main.module.scss';
import IFeedCard from '@/models/IFeedCard';
import IconButton from '@/components/IconButton/IconButton';
import {CgClose} from 'react-icons/cg';
import {AiOutlineMessage} from 'react-icons/ai';
import {HiHeart} from 'react-icons/hi';
import {useEffect, useState, useCallback} from 'react';
import Card from './components/Card/Card';
import ApiService from '@/service/apiService';
import img from '@/public/assets/images/girl-big.png';
import { AnimatePresence } from 'framer-motion';
import Router from 'next/router';
import { useAppSelector } from '@/hooks/useTypesRedux';
import getClassNames from '@/helpers/getClassNames';

const service = new ApiService()

export type SwipeType = "like" | "nope" | "superlike";
export type ResultType = { [k in SwipeType]: number };



const Main = () => {
    const {token} = useAppSelector(s => s);

    const [disable, setDisable] = useState(false)



    // ** Список карточек
    const [list, setList] = useState<IFeedCard[]>([])
    

    // ** текущая страница (передается в апи)
    const [page, setPage] = useState(1);

    // ** ID текущей карточки
    const [currentCard, setCurrentCard] = useState<number>(0)


    // !! test
    const activeIndex = 0;
    const [liking, setLiking] = useState(false)
    const [canceling, setCanceling] = useState(false)

    const [leaveX, setLeaveX] = useState<any>(null)

    useEffect(() => {
        let tm:any;
        if(disable) {
            tm = setTimeout(() => {
                setDisable(false)
            }, 300)
        }
        return () => {
            clearInterval(tm)
        }
        
    }, [disable])
        

    
    // ** Первое получение списка
    const getInitFeed = () => {
        if(token) {
            service.getFeed({
                page: 1
            }, token).then(res => {
                setList(res?.data)
            })
        }
    }

    // ** дополнение списка по мере необходимости
    const updateFeed = () => {
        if(token) {
            page && service.getFeed({page}, token).then(res => {
                if(res?.data?.length > 0) {
                    setList(s => [...s, ...res?.data])
                } else {
                    // карточки закончились
                }
            })
        }
        
    }

    // ** первая загрузка карточек
    useEffect(() => {
        getInitFeed()
    }, [token])

    // // ** изменение страницы когда в списке остается меньше или равно 3 карточек (догрузка)
    useEffect(() => {
        if(list?.length <= 3 && list?.length > 0) {
            setPage(s => s + 1)
        }
    }, [list])

    // ** догрузка карточек
    useEffect(() => {
        if(page > 1) {
            updateFeed()
        }
    }, [page])


    // ** лайк
    const onLike = () => {
        if(token) {
            if(currentCard) {
                service.feedItemLike({id: currentCard}, token).then(res => {
                    // console.log(res)
                })
            } 
        }
        
    }

    // ** отмена
    const onCancel = () => {
        if(token) {
            if(currentCard) {
                service.feedItemSkip({id: currentCard}, token).then(res => {
                    // console.log(res)
                })
            }
        }
    } 


    // ** определение текущей карточки (ее ID)
    useEffect(() => {
        if(list && list.length > 0) {
            setCurrentCard(list[0].id)
        }
    }, [list])

    

    const removeCard = (card: any, type: SwipeType) => {
        if(type === 'like') {
            onLike()

            setLeaveX({id: card?.id, x: '100%'})
        }
        if(type === 'nope') {
            onCancel()

            setLeaveX({id: card?.id, x: '-100%'})
        }
    }

    useEffect(() => {
        if(leaveX) {
            setList(s => {
                return s.filter(i => i.id !== leaveX?.id)
            })
        }
    }, [leaveX])


    const createChat = () => {
        if(token) {
            if(currentCard) {
                service.createChat({
                    user_id: currentCard
                }, token).then(res => {
                    if(res?.chat_id) {
                        Router.push(`/chat/${res?.chat_id}?type=chat`)
                    }
                })

                // !! параллельное создание чата писем
                // service.createMail({
                //     user_id: currentCard
                // }, token).then(res => {
                //     console.log(res)
                // })
            }
        }
       
    }


    return (
        <div className={styles.wrapper}>
            {/* <CreateChatModal
                open={createChatModal}
                id={list[0]?.id}
                onCancel={closeCreateChatModal}
                /> */}
            <div className={getClassNames([styles.slider])}>
                {
                    disable && <div className={styles.mask}></div>
                }
                <AnimatePresence>
                        {
                            list?.map((item, index) => (
                                <Card 
                                    leaveX={leaveX}
                                    setLeaveX={setLeaveX}
                                    removeCard={removeCard}
                                    active={activeIndex === index}
                                    key={item.id}
                                    card={{
                                        ...item,
                                        // onLike: onLike,
                                        // onCancel: onCancel,
                                        index: index,
                                        setCanceling,
                                        setLiking,
                                        canceling,
                                        liking
                                    }}
                                    disable={disable}
                                    setDisable={setDisable}
                                    />
                            ))
                        }
                </AnimatePresence>
            </div>
            <div className={getClassNames([styles.action, disable && styles.disabled])}>
                <div className={`${styles.item} ${canceling ? styles.active : ''}`}>
                    <IconButton
                        disabled={list?.length === 0 || disable}
                        onClick={() => {
                            removeCard(list[0], 'nope')
                            setDisable(true)
                        }}
                        variant={'danger'}
                        icon={<CgClose size={40} color='#fff'/>}
                        />
                </div>
                <div className={styles.item}>
                    <IconButton
                        disabled={list?.length === 0 || disable}
                        onClick={createChat}
                        size={50}
                        variant={'bordered'}
                        icon={<AiOutlineMessage size={25}/>}
                        />
                </div>
                <div className={`${styles.item} ${liking ? styles.active : ''}`}>
                    <IconButton
                        disabled={list?.length === 0 || disable}
                        onClick={() => {
                            removeCard(list[0], 'like')
                            setDisable(true)
                        }}
                        icon={<HiHeart size={35}/>}
                        />
                </div>
            </div>
        </div>
    )
}


export default Main;