import styles from './ChatLayout.module.scss';
import { Row, Col } from 'antd';
import Filter from '../Filter/Filter';
import ChatBody from '../ChatBody/ChatBody';
import ApiService from '@/service/apiService';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/useTypesRedux';
import notify from '@/helpers/notify';
import { sortingChatList, sortingDialogList } from '@/helpers/sorting';
import { useWindowSize } from 'usehooks-ts';
import { sortingMailChatList } from '@/helpers/sorting';
import {useDebounce} from 'usehooks-ts';
import socketEvents from '@/helpers/socketEvents';

const service = new ApiService()

const ChatLayout = () => {
    const {width} = useWindowSize()
    const {query} = useRouter()
    const {token, socketChannel, newMessage, newMail} = useAppSelector(s => s)

    const [loadSide, setLoadSide] = useState(false)
    const [loadMain, setLoadMain] = useState(false)

    const [loadedDialogs, setLoadedDialogs] = useState(false)

    const [currentChatId, setCurrentChatId] = useState<number>()
    const [currentUser, setCurrentUser] = useState<any>(null)

    const [chatType, setChatType] = useState<'chat' | 'mail'>()
    const [filter, setFilter] = useState<'all' | 'unread' | 'favorite' | 'ignored' | any>('all')

    const [dialogsList, setDialogsList] = useState<any[]>([])
    const [chatList, setChatList] = useState<any[]>([]) 

    const [dialogsPage, setDialogsPage] = useState<number>(1)
    const [chatListPage, setChatListPage] = useState(1)

    const [totalDialogItemCount, setTotalDialogItemCount] = useState(0)
    const [totalChatItemCount, setTotalChatItemCount] = useState(0)

    const [dialogSearch, setDialogSearch] = useState('')
    const dialogSearchDebounce = useDebounce<string>(dialogSearch, 500)

    useEffect(() => {
        if(query) {
            if(query?.id && typeof query?.id === 'string') {
                setChatListPage(1)
                setCurrentChatId(Number(query?.id))
            }
        }
        if(query?.type === 'mail' || query?.type === 'chat') {
            setChatType(query?.type)
        }
    }, [query])

    const getDialogs = () => {
        if(token) {
            if(dialogsPage === 1) {
                setLoadSide(true)
            }
            service.getChatList({
                filter: filter != 'all' ? filter : '',
                page: dialogsPage,
                search: dialogSearchDebounce
            }, token).then(res => {
                setTotalDialogItemCount(res?.total)
                if(dialogsPage === 1) {
                    setDialogsList(res?.data)
                } else {
                    setDialogsList(s => [...s, ...res?.data])
                }
            }).finally(() => {
                setLoadSide(false)
                setLoadedDialogs(true)
            })
        }
    }

    const updateDialogs = () => {
        if(token) {
            service.getChatList({
                filter: filter != 'all' ? filter : '',
                page: 1,
                per_page: 1000,
                search: dialogSearchDebounce
            }, token).then(res => {
                setDialogsList(res?.data)
            })
        }
    }

    const getChat = () => {
        if(token) {
            if(currentChatId && chatListPage) {
                if(chatListPage === 1) {
                    setLoadMain(true)
                }
                service.getChat({
                    id: currentChatId,
                    page: chatListPage,
                    per_page: 10
                }, token).then(res => {
                    if(res?.another_user) {
                        setCurrentUser(res?.another_user)
                        setTotalChatItemCount(res?.chat_messages?.total)
                        if(chatListPage === 1) {
                            setChatList(res?.chat_messages?.data)
                        } else {
                            setChatList(s => [...s, ...res?.chat_messages?.data])
                        }
                    }
                }).finally(() => {
                    setLoadMain(false)
                })
            }
        }
    }

    const updateChat = () => {
        if(token && currentChatId) {
            service.getChat({
                id: currentChatId,
                page: 1,
                per_page: 1000
            }, token).then(res => {
                if(res?.another_user) {
                    setChatList(res?.chat_messages?.data)
                }
            })
        }
    }

    useEffect(() => {
        let tm:any;
        if(token) {
            tm = setInterval(updateChat, 5000)
        }
        return () => {
            if(tm) clearInterval(tm)
        }
    }, [token, currentChatId])

    useEffect(() => {
        let tm:any = null;
        if(token) {
            tm = setInterval(updateDialogs, 5000)
        }
        return () => {
            if(tm) clearInterval(tm)
        }
    }, [token, filter, dialogSearchDebounce])


    const getMailDialogs = () => {
        if(token) {
            if(dialogsPage === 1) {
                setLoadSide(true)
            }
            service.getMailList({
                page: dialogsPage,
                per_page: 10,
                filter: filter != 'all' ? filter : '',
            }, token).then(res => {
                setTotalDialogItemCount(res?.total)
                if(dialogsPage === 1) {
                    setDialogsList(res?.data)
                } else {
                    setDialogsList(s => [...s, ...res?.data])
                }
            }).finally(() => {
                setLoadSide(false)
                setLoadedDialogs(true)
            })
        }
    }

    const getMailChat = () => {
        if(token) {
            if(currentChatId && chatListPage) {
                if(chatListPage === 1) {
                    setLoadMain(true)
                }
                service.getMail({
                    id: currentChatId,
                    page: chatListPage,
                    per_page: 10
                }, token).then(res => {
                    
                    setCurrentUser(res?.another_user)
                    setTotalChatItemCount(res?.letter_messages?.total)
                    if(chatListPage === 1) {
                        setChatList(res?.letter_messages?.data)
                    } else {
                        setChatList(s => [...s, ...res?.letter_messages?.data])
                    }
                }).finally(() => {
                    setLoadMain(false)
                })
    
            }
        }
    }

    useEffect(() => {
        setDialogsPage(1)
        setChatListPage(1)
    }, [chatType])

    useEffect(() => {
        if(chatType === 'chat') {
            getDialogs && getDialogs()
        }
        if(chatType === 'mail') {
            getMailDialogs && getMailDialogs()
        }
    }, [dialogsPage, token, chatType, filter, dialogSearchDebounce])


    useEffect(() => {
        if(chatType === 'chat') {
            getChat && getChat()
        }
        if(chatType === 'mail') {
            getMailChat && getMailChat()
        }
    }, [chatListPage, currentChatId, token, chatType])


    useEffect(() => {
        setDialogsList([])
        setDialogsPage(1)
    }, [filter])


    useEffect(() => {
        if(socketChannel) {
            if(chatType === 'chat') {
                if(newMessage) { 
                    onUpdateChat && onUpdateChat({ 
                        messageBody: newMessage?.chat_message, 
                        dialogBody: {...newMessage?.chat_list_item, another_user: newMessage?.chat_message?.sender_user, self_user: newMessage?.chat_message?.recepient_user, last_message: newMessage?.chat_message}
                    })
                }
            }
        }
    }, [socketChannel, currentChatId, chatType, newMessage, newMail])


    useEffect(() => {
        if(socketChannel) {
            socketChannel?.listen(socketEvents?.eventChatReadMessage, (data: any) => {
                if(chatType === 'chat') {
                    onUpdateChat && onUpdateChat({
                        messageBody: data?.chat_message, 
                        dialogBody: {...data?.chat_list_item, another_user: data?.chat_message?.recepient_user, self_user: data?.chat_message?.sender_user, last_message: data?.chat_message}
                    }, 'read')
                }
            })
        }
    }, [chatType, socketChannel, chatList, dialogsList, currentChatId])
    

    const onUpdateChat = (body: {
        messageBody?: any,
        dialogBody?:any
    }, type: 'read' | 'new' = 'new') => {
        if(body?.dialogBody && body?.messageBody) {
            if(chatType === 'chat') {
                if(type === 'read') {
                    if(chatList?.length > 0 && dialogsList?.length > 0) {
                        // ?? обновление чата
                        if(currentChatId == body?.dialogBody?.id) {   
                            const foundMessage = chatList?.find(s =>  s?.id == body?.messageBody?.id)
                            if(currentChatId == body?.dialogBody?.id) {
            
                                if(foundMessage) {
                                    setChatList(s => {
                                        const m = s;
                                        const rm = m.splice(m.findIndex(i => i.id == foundMessage?.id), 1, body?.messageBody)
                                        return sortingChatList([...m])
                                    })   
                                } 
                            }
                        }

                        // ?? обновление диалогов
                        const foundDialog = dialogsList?.find(s => s?.id == body?.dialogBody?.id) 
                        if(foundDialog) {
                            setDialogsList(s => {
                                const m = s;
                                const rm = m.splice(m.findIndex(i => i.id == foundDialog?.id), 1, body?.dialogBody)
                                return sortingDialogList([...m])
                            })
                        } else {
                            setDialogsList(s => {
                                return sortingDialogList([body?.dialogBody, ...s])
                            })
                        }
                    }
                } else {
                    // ?? обновление чата
                    if(currentChatId == body?.dialogBody?.id) {           
                        const foundMessage = chatList?.find(s =>  s?.id == body?.messageBody?.id)
                        if(currentChatId == body?.dialogBody?.id) {
                     
                            if(foundMessage) {
                                setChatList(s => {
                                    const m = s;
                                    const rm = m.splice(m.findIndex(i => i.id == foundMessage?.id), 1, body?.messageBody)
                                    return sortingChatList([...m])
                                })   
                            } else {
                                setChatList(s => {
                                    return sortingChatList([body?.messageBody, ...s])
                                })
                            }
                        }
                    }

                    // ?? обновление диалогов
                    const foundDialog = dialogsList?.find(s => s?.id == body?.dialogBody?.id) 
                    if(foundDialog) {
                        setDialogsList(s => {
                            const m = s;
                            const rm = m.splice(m.findIndex(i => i.id == foundDialog?.id), 1, body?.dialogBody)
                            return sortingDialogList([...m])
                        })
                    } else {
                        setDialogsList(s => {
                            return sortingDialogList([body?.dialogBody, ...s])
                        })
                    }
                }
            } 
        }
    }

    


    return (
        <div className={styles.wrapper}>
            <Row>
                {
                    width <= 768 ? (
                        !currentChatId ? (
                            <Col span={24}>
                                <div className={styles.top}>
                                    <Filter
                                        activeFilter={filter}
                                        onFilterChange={setFilter}
                                        activeType={chatType}
                                        onTypeChange={setChatType}
                                        />
                                </div>
                            </Col>
                        ) : null
                    ) : (
                        <Col span={24}>
                            <div className={styles.top}>
                                <Filter
                                    activeFilter={filter}
                                    onFilterChange={setFilter}
                                    activeType={chatType}
                                    onTypeChange={setChatType}
                                    />
                            </div>
                        </Col>
                    )
                }
                <Col span={24}>
                    <div className={styles.main}>
                        <ChatBody
                            filter={filter}
                            chatList={chatList}
                            dialogsList={dialogsList}
                            activeDialogId={currentChatId}
                            totalChatItemCount={totalChatItemCount}
                            totalDialogItemCount={totalDialogItemCount}      

                            updateDialogsPage={setDialogsPage}
                            updateChatListPage={setChatListPage}
                            updateDialogsList={setDialogsList}
                                         
                            onUpdateChat={onUpdateChat}
                            
                            ChatType={chatType}
                            loadMain={loadMain}
                            loadSide={loadSide}

                            loadedDialogs={loadedDialogs}
                            currentUser={currentUser}

                            dialogSearch={dialogSearch}
                            setDialogSearch={setDialogSearch}
                            updateChatList={setChatList}
                            />
                    </div>
                </Col>
            </Row>
        </div>
    )
}


export default ChatLayout;