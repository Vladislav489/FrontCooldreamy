import styles from './ChatBody.module.scss';
import ChatSide from '../ChatSide/ChatSide';
import Dialog from '../Dialog/Dialog';
import ChatAction from '../ChatAction/ChatAction';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import { useCallback, useEffect, useState } from 'react';
import {FC} from 'react';
import { IDialogs, IChat } from '../../types';
import Input from '@/components/Input/Input';
import { FiInfo, FiSearch } from 'react-icons/fi';
import ChatStart from '../ChatStart/ChatStart';
import ChatMock from '../ChatMock/ChatMock';
import Gifts from '../Gifts/Gifts';
import Mail from '../Mail/Mail';
import Router, { useRouter } from 'next/router';
import { sortingDialogList } from '@/helpers/sorting';
import { useWindowSize } from 'usehooks-ts';
import IconButton from '@/components/IconButton/IconButton';
import {BiArrowBack} from 'react-icons/bi';
import Avatar from '@/components/Avatar/Avatar';
import DialogEmpty from '../DialogEmpty/DialogEmpty';
import {VscListSelection} from 'react-icons/vsc';
import SkeletonMail from '../Mail/components/SkeletonMail/SkeletonMail';
import SkeletonChatList from '../ChatList/components/SkeletonChatList/SkeletonChatList';
import { PulseLoader } from 'react-spinners';
import getPrice from '@/helpers/getPrice';
import { updateEmailModal, updateLimit } from '@/store/actions';
import { BsTrash } from 'react-icons/bs';
import PromptModal from '@/popups/PromptModal/PromptModal';
import notify from '@/helpers/notify';
import { Dropdown, Popover } from 'antd';
import ChatMenu from './components/ChatMenu/ChatMenu';
import ReportModal from '@/popups/ReportModal/ReportModal';
import { updateUserData } from '@/store/actions';
import CompReg from '@/popups/CompReg/CompReg';
import useUpdateBalance from '@/hooks/useUpdateBalance';
import OutsideClickHandler from 'react-outside-click-handler';
import ChatCountAvilableMessages from './components/ChatCountAvilableMessages/ChatCountAvilableMessages';

const service = new ApiService()
const VH = '(var(--vh, 1vh) * 100)'

type ChatBodyComponentType = {
    ChatType?: 'mail' | 'chat'
    onUpdateChat: (...args: any[]) => any,

    loadSide?: boolean,
    loadMain?: boolean,

    loadedDialogs?: boolean

    currentUser?: any,

    dialogSearch?: string,
    setDialogSearch?: (...args: any[]) => any,

    filter: 'all' | 'unread' | 'favorite' | 'ignored',
    updateChatList?: (...args: any) => any
}


const ChatBody:FC<IDialogs & IChat & ChatBodyComponentType> = ({
    dialogsList,
    activeDialogId,
    updateDialogsPage,

    chatList,

    updateChatListPage,
    updateDialogsList,
    totalChatItemCount,
    totalDialogItemCount,

    onUpdateChat,

    ChatType,
    loadSide,
    loadMain,

    loadedDialogs,

    currentUser,

    dialogSearch,
    setDialogSearch,
    updateChatList,
    filter
}) => {
    const dispatch = useAppDispatch()
    const {width} = useWindowSize()
    const {query: {id}} = useRouter()
    const {token, actionsPricing, locale, userData, userId} = useAppSelector(s => s)
    const updateBalance = useUpdateBalance()
    const [pb, setPb] = useState<number>(70)
    const [promptModal, setPromptModal] = useState(false)
    const [reportModal, setReportModal] = useState(false)

    const [mockType, setMockType] = useState<'wink' | 'gift' | 'text' | ''>('')
    const [cr, setCr] = useState(false)

    const [chatMenu, setChatMenu] = useState(false)



    const switchMock = useCallback(() => {
        switch(mockType) {
            case 'gift':
                return <Gifts pb={pb} onSend={sendGiftMessage} onClose={() => setMockType('')}/>
            case 'text':
                return <ChatMock  onClose={() => setMockType('')} onSend={sendTextMessage}/>
            case 'wink':
                return null
            case '':
                return null
        }
    
    }, [mockType, pb])

    const sendTextMessage = (text: string) => {
        if(text && activeDialogId && token && ChatType) {
            if(ChatType === 'chat') {
                service.sendMessage_text({chat_id: Number(activeDialogId), text}, token).then(res => {
                    if(res?.error) {
                        if(res?.error === 'You need to fill in information about yoursel') {
                            setCr(true)
                        } else {
                            dispatch(updateLimit({
                                open: true,
                                data: {
                                    head: 'Вам не хватает кредитов...',
                                    // text: `К сожалению сообщение к ${currentUser?.name} 
                                    // не доставлено. Пополните баланс. Стоимость действия: ${getPrice(actionsPricing, 'SEND_CHAT_MESSAGE')}`
                                }
                            }))
                        }
                    } else {
                        onUpdateChat({messageBody: res?.chat?.last_message, dialogBody: res?.chat})
                        // service.getCredits(token).then(credits => {
                        //     dispatch(updateUserData({...userData, credits}))
                        // })
                        updateBalance()
                        if(userData?.is_email_verified === 0 && userData?.prompt_careers?.length > 0) {
                            dispatch(updateEmailModal(true))
                        }
                    }
                    
                    setMockType('')
                })
            }
            if(ChatType === 'mail') {
                service.sendMail_text({text: text, letter_id: Number(activeDialogId)}, token).then(res => {
                    if(res?.error) {
                        dispatch(updateLimit({
                            open: true,
                            data: {
                                head: 'Вам не хватает кредитов...',
                                text: `К сожалению письмо к ${currentUser?.name} 
                                не доставлено. Пополните баланс. Стоимость действия: ${getPrice(actionsPricing, 'SEND_MAIL_MESSAGE')}`
                            }
                        }))
                    } else {
                        onUpdateChat({messageBody: res?.letter?.last_message, dialogBody: res?.letter})
                        service.getCredits(token).then(credits => {
                            dispatch(updateUserData({...userData, credits}))
                        })
                    }
                    
                    setMockType('')
                })
            }
            
        }
    }


    const sendGiftMessage = (gifts: any[]) => {
        if(gifts && token && activeDialogId && ChatType) {
            if(ChatType === 'chat') {
                service.sendMessage_gift({chat_id: activeDialogId.toString(), gifts, user_id: userId}, token).then(res => {
                    if(res?.error) {
                        if(res?.error === 'You need to fill in information about yoursel') {
                            // setCr(true)
                        } else {
                            dispatch(updateLimit({
                                open: true,
                                data: {
                                    // head: locale?.popups?.nocredit_gift?.title,
                                    action: {
                                        label: 'Go to store',
                                        link: '/deposit-mb?tab=3'
                                    }
                                }
                            }))
                            // if(userData?.free_credits && userData?.free_credits < 3) {
                            //     dispatch(updateSubsModal(true))
                            // }
                        }
                    } else {
                        // onUpdateChat({messageBody: res?.chat?.last_message, dialogBody: res?.chat})
                        updateBalance()
                        
                        if(userData?.is_email_verified === 0 && userData?.prompt_careers?.length > 0) {
                            dispatch(updateEmailModal(true))
                        }
                    }
                    
                    setMockType('')
                })
            }
            if(ChatType === 'mail') {
                // service.sendMail_gift({letter_id: activeDialogId.toString(), gifts}, token).then(res => {
                //     if(res?.error) {
                //         dispatch(updateLimit({
                //             open: true,
                //             data: {
                //                 head: locale?.popups?.nocredit_gift?.title,
                //                 text: `${locale?.popups?.nocredit_gift?.text_part_1}${currentUser?.name}${locale?.popups?.nocredit_gift?.text_part_2}${getPrice(actionsPricing, 'SEND_MAIL_GIFT')}`
                //             }
                //         }))
                //     } else {
                //         onUpdateChat({messageBody: res?.letter?.last_message, dialogBody: res?.letter})
                //         service.getCredits(token).then(credits => {
                //             dispatch(updateUserData({...userData, credits}))
                //         })
                //     }
                //     setMockType('')
                // })
            }
        }
    }
    
    
    const onDeleteChat = () => {
        if((id && typeof id === 'string') && token) {
            service.deleteChat(token, Number(id)).then(res => {
                if(res?.message === 'success') {
                    updateDialogsList && updateDialogsList((s: any) => {
                        const m = s;
                        const rm = m.splice(m.findIndex((i: any) => i.id == id), 1)
                        if([...m]?.length > 0) Router.push(`/chat/${sortingDialogList([...m])[0]?.id}?type=chat`)
                        return sortingDialogList([...m])
                    })
                    notify(locale?.global?.notifications?.success_delete_chat, 'SUCCESS')
                } else {
                    notify(locale?.global?.notifications?.error_default, 'ERROR')
                }
            }).finally(() => {
                setPromptModal(false)
            })
        }
    }


    const onGetAllMedia = () => {
        if(token && id && typeof id === 'string') {
            service.getChatMedia(token, id).then(res => {
                
            })
        }
    }

    const onWink = () => {
        if(token && currentUser?.id) {
            service.sendWink({user_id: Number(currentUser?.id)}, token).then(res => {
                if(!res?.id) notify(locale?.global?.notifications?.error_wink, 'ERROR')
            })
        }
    }

    const onFav = () => {
        if(token && currentUser?.id) {
            console.log(currentUser)
            service.addUserToFav({user_id: Number(currentUser?.id)}, token).then(res => {
                if(res?.status === 200) {
                    notify(locale?.global?.notifications?.success_add_chat_to_fav, 'SUCCESS')
                }
            })
        }
    }

    const onIgnore = () => {
        if(token && currentUser?.id) {
            service.chatIgnore(token, {id: Number(id)}).then(res => {
                if(res) {
                    notify(locale?.global?.notifications?.success_report, 'SUCCESS')
                }
                updateDialogsList && updateDialogsList((s: any | any[]) => {
                    const findItem = s.find((i: any) => i.id === id)
                    if(findItem) {
                        const m = s;
                        if(filter === 'ignored') {
                            const rm = m.splice(m.findIndex((i:any) => i.id === findItem.id), 1)
                            return [...m]   
                        } else {
                            return [...m]
                        }
                    } else return s;
                })
            })
        }
    }

    const onReport = () => {
        setReportModal(true)
    }

    return (
        <div className={styles.wrapper}>
            <CompReg
                open={cr}
                onCancel={() => setCr(false)}
                />
            <ReportModal
                open={reportModal}
                chatId={Number(id)}
                onCancel={() => setReportModal(false)}
                />
            <PromptModal
                open={promptModal}
                onCancel={() => setPromptModal(false)}
                text='Would you like to delete the dialog?'
                onAccept={onDeleteChat}
                onReject={() => setPromptModal(false)}
                />
            {
                (width <= 768 && id) && (
                    <div className={styles.bc}>
                        <div className={styles.back}>
                            <IconButton
                                onClick={() => Router.push('/chat?type=chat')}
                                variant={'transparent'}
                                size={30}
                                icon={<BiArrowBack color={'#000'} size={20}/>}
                                />
                        </div>
                        <div className={styles.main}>
                            {currentUser?.name}
                        </div>
                        <div className={styles.avatar}>
                            <Avatar
                                image={currentUser?.avatar_url_thumbnail} 
                                round 
                                onClick={() => Router?.push(`/users/${currentUser?.id}`)}
                                size={30}/>
                        </div>
                    </div>
                )
            }
            {
                width <= 768 ? (
                    !id && (
                        <div className={styles.sidebar}>
                            <div className={styles.search}>
                                <Input
                                    style={{
                                        borderRadius: 8,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                    }}
                                    placeholder={`...${locale?.chatPage.search}`}
                                    afterIcon={<FiSearch color='#888888'/>}
                                    value={dialogSearch}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDialogSearch && setDialogSearch(e.target.value)}
                                    />
                            </div>
                            {
                                loadSide ? (
                                    <SkeletonChatList/>
                                ) : (
                                    <ChatSide
                                        filter={filter}
                                        updateDialogsPage={updateDialogsPage}
                                        updateDialogsList={updateDialogsList}
                                        dialogsList={dialogsList}
                                        activeDialogId={activeDialogId}
                                        totalDialogItemCount={totalDialogItemCount}
                                        /> 
                                )
                            }
                        </div> 
                    )
                ) : (
                    <div className={styles.sidebar}>
                        <div className={styles.search}>
                            <Input
                                style={{
                                    borderRadius: 8,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                }}
                                placeholder={`...${locale?.chatPage.search}`}
                                afterIcon={<FiSearch color='#888888'/>}
                                value={dialogSearch}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDialogSearch && setDialogSearch(e.target.value)}
                                />
                        </div>
                        {
                            loadSide ? (
                                <SkeletonChatList/>
                            ) : (
                                <ChatSide
                                    filter={filter}
                                    updateDialogsList={updateDialogsList}
                                    updateDialogsPage={updateDialogsPage}
                                    dialogsList={dialogsList}
                                    activeDialogId={activeDialogId}
                                    totalDialogItemCount={totalDialogItemCount}
                                    /> 
                            )
                        }
                    </div> 
                )
            }
            {
                (width <= 768 && !id) ? (
                        (!id && loadedDialogs && dialogsList?.length === 0) && (
                            <div className={styles.main}>
                                <DialogEmpty height={width <= 768 ? `calc(${VH} - 42px - ${pb}px - 20px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px) + 50px`}/>
                            </div>
                        )
                ) : (
                    <div className={styles.main}>
                        <ChatCountAvilableMessages/>
                        {
                            (!id && loadedDialogs && dialogsList?.length === 0) && (
                                <DialogEmpty absolute height={width <= 768 ? `calc(${VH} - 42px - ${pb}px - 20px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px) + 50px`}/>
                            )
                        }
                        {
                            ChatType === 'chat' ? (
                                <div className={styles.body} style={{
                                    height: 
                                    width <= 768 ? 
                                    `calc(${VH} - 42px - ${pb}px - 20px)` : 
                                    `calc(100vh - 165px - 75px - 50px - ${pb}px + 50px)`
                                }}>
                                    
                                    {
                                        id && (
                                            <div className={styles.body_action}>
                                                {
                                                    width <= 768 && (
                                                        <div className={styles.info}>
                                                            <Popover
                                                                trigger={'click'}
                                                                content={
                                                                    <div className={'pricing_tooltip_content'}>
                                                                        {
                                                                            actionsPricing?.map((i,index) => (
                                                                                <div key={index}>{i?.name}: {i?.price}</div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                }
                                                                >
                                                                <IconButton
                                                                    icon={<FiInfo/>}
                                                                    size={35}
                                                                    variant={'bordered'}
                                                                    style={{border: 'none', color: '#888888'}}
                                                                    />
                                                            </Popover>
                                                        </div>
                                                    )
                                                }
                                                <div className={styles.body_action_item}>
                                                    <IconButton
                                                        onClick={() => setPromptModal(true)}
                                                        icon={<BsTrash/>}
                                                        size={35}
                                                        variant={'bordered'}
                                                        style={{border: 'none', color: '#888888'}}
                                                        />
                                                </div>
                                                <div className={styles.body_action_item}>
                                                    <OutsideClickHandler
                                                        onOutsideClick={() => setChatMenu(false)}
                                                        >
                                                        <>
                                                        <IconButton
                                                            icon={<VscListSelection/>}
                                                            onClick={() => setChatMenu(s => !s)}
                                                            size={35}
                                                            style={{borderRadius: '11px', borderColor: 'rgba(104, 98, 237, 0.21)'}}
                                                            variant={'bordered'}
                                                            />
                                                        {
                                                            chatMenu && (
                                                                <ChatMenu
                                                                    onCloseMenu={() => setChatMenu(false)}
                                                                    onWink={onWink}
                                                                    onGetAllMedia={onGetAllMedia}
                                                                    onFav={onFav}
                                                                    onIgnore={onIgnore}
                                                                    onReport={onReport}
                                                                    />
                                                            )
                                                        }
                                                        </>
                                                    </OutsideClickHandler>
                                                </div>
                                            </div>
                                        )
                                    }


                                    {
                                        loadMain ? (
                                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}><PulseLoader color='var(--violet)'/></div>
                                        ) : (
                                            chatList && chatList?.length > 0 ? (
                                                <div className={styles.body_wr}>
                                                    <Dialog
                                                        totalChatItemCount={totalChatItemCount}
                                                        height={width <= 768 ? `calc(${VH} - 42px - ${pb}px - 20px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px) + 50px`}
                                                        chatList={chatList}
                                                        id={activeDialogId}
                                                        updateChatListPage={updateChatListPage}

                                                        updateDialogsList={updateDialogsList}
                                                        updateChatList={updateChatList}
                                                    />
                                                </div>
                                            ) : (
                                                activeDialogId && !mockType ? (
                                                    <ChatStart
                                                        onSelect={setMockType} 
                                                        avatar={currentUser?.user_avatar_url}/>
                                                ) : null
                                            )
                                        )
                                    }
                                    {switchMock()}
                                </div>
                            ) : null    
                        }
                        {
                            ChatType === 'mail' ? (
                                <div className={styles.mail} style={{
                                    height: width <= 768 ? `calc(${VH} - 42px - ${pb}px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px + 50px)`
                                }}>
                                    {
                                        loadMain ? (
                                            <SkeletonMail/>
                                        ) : (
                                            (chatList && chatList?.length > 0) && (
                                                <Mail
                                                    height={width <= 768 ? `calc(${VH} - 42px - ${pb}px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px + 50px)`}
                                                    chatList={chatList}
                                                    id={activeDialogId}
                                                    updateChatListPage={updateChatListPage}
                                                    totalChatItemCount={totalChatItemCount}
                                                    />
                                            ) 
                                            //: (
                                                // activeDialogId && !mockType ? (
                                                //     <ChatStart
                                                //         onSelect={setMockType} 
                                                //         avatar={currentUser?.avatar_url_thumbnail}/>
                                                // ) : null
                                            //)
                                        )
                                    }
                                    {
                                        switchMock()
                                    }
                                </div>
                            ) : null
                        }
                        <div className={styles.action}>
                            <ChatAction 
                                currentUser={currentUser}
                                getGifts={() => {
                                    if(mockType !== 'gift') {
                                        setMockType('gift')
                                    } else {
                                        setMockType('')
                                    }
                                }}
                                onUpdateChat={onUpdateChat}
                                setHeight={setPb}
                                updateDialogsList={updateDialogsList}
                                />
                        </div>
                    </div>          
                )
            }      
        </div>
    )
}

export default ChatBody;