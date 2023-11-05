import styles from './ChatAction.module.scss';
import IconButton from '@/components/IconButton/IconButton';
import {AiOutlineSmile, AiOutlineGift, AiOutlineCamera} from 'react-icons/ai';
import {BsArrowUpShort} from 'react-icons/bs';
import TextareaAutosize from 'react-textarea-autosize';
import {useEffect, useState, useCallback} from 'react';
import Stickers from './components/Stickers/Stickers';
import ApiService from '@/service/apiService';
import { useRouter } from 'next/router';
import { PulseLoader } from 'react-spinners';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useWindowSize } from 'usehooks-ts';
import { setCredits, setFreeCredits, updateEmailModal, updateLimit, updateSubsModal, updateUserData } from '@/store/actions';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import OutsideClickHandler from 'react-outside-click-handler';
import CompReg from '@/popups/CompReg/CompReg';
import useUpdateBalance from '@/hooks/useUpdateBalance';

const service = new ApiService()

const ChatAction = ({
    setHeight,
    onUpdateChat,
    getGifts,
    updateDialogsList,
    currentUser
}: {
    currentUser: any,
    setHeight: (...args: any[]) => any, 
    onUpdateChat: (...args: any[]) => any,
    getGifts: (type: 'gift') => any,
    updateDialogsList?: (...args: any[]) => any
}) => {
    const updateBalance = useUpdateBalance()
    const dispatch = useAppDispatch()
    const [cr, setCr] = useState(false)

    const {width} = useWindowSize()
    const {token, locale, actionsPricing, userData} = useAppSelector(s => s)
    const {query} = useRouter()
    const {type, id} = query

    //const [uploadedMedia, setUploadedMedia] = useState<any[]>([])
    const [stickers, setStickers] = useState(false)
    const [gifts, setGifts] = useState(false);
    const [drawerPos, setDrawerPos] = useState(70);
    const [text, setText] = useState('')
    const [load, setLoad] = useState(false)




    useEffect(() => {
        if(gifts) setStickers(false)
        if(stickers) setGifts(false)
    }, [stickers, gifts])


    const onStickerSelect = (id: number) => {
        if(token && id) {
            if(query?.id && typeof query?.id === 'string') {
                if(type === 'chat') {
                    setLoad(true)
                    service.sendMessage_sticker({
                        chat_id: Number(query?.id),
                        sticker_id: id
                    }, token).then(res => {
                        if(res?.error) {
                            if(res?.error === 'You need to fill in information about yoursel') {
                                setCr(true)
                            } else {
                                dispatch(updateLimit({
                                    open: true,
                                    data: {
                                        head: locale?.popups?.nocredit_sticker_message?.title,
                                        // text: `${locale?.popups?.nocredit_sticker_message?.text_part_1}${currentUser?.name}${locale?.popups?.nocredit_sticker_message?.text_part_2} ${getPrice(actionsPricing, 'SEND_CHAT_STICKER')}`
                                        text: locale?.popups?.nocredit_global_chat
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
                        
                    }).finally(() => {
                        setLoad(false)
                    })
                }
                if(type === 'mail') {
                    setLoad(true)
                    service.sendMail_sticker({
                        letter_id: Number(query?.id),
                        sticker_id: id
                    }, token).then(res => {

                        if(res?.error) {
                            // !! ERROR
                        } else {
                            onUpdateChat({messageBody: res?.letter?.last_message, dialogBody: res?.letter})
                            service.getCredits(token).then(credits => {
                                dispatch(updateUserData({...userData, credits}))
                            })
                        }
                    })
                }
            }
        }
    }


    const onSmileSelect = (label: string) => {
        setText(s => `${s}${label}`)
    }


    // !!отправка сообщения временно будет локализовано в этом компоненте
    const sendMessage = useCallback(() => {
        if(token) {
            if(query?.id && typeof query?.id === 'string') {
                if(type === 'chat') {
                    setLoad(true)
                    service.sendMessage_text({
                        chat_id: Number(query?.id),
                        text
                    }, token).then(res => {
                        if(res?.error) {
                            if(res?.error === 'You need to fill in information about yoursel') {
                                setCr(true)
                            } else {
                                if(userData?.free_credits && userData?.free_credits < 3) {
                                    dispatch(updateSubsModal(true))
                                }   
                            }
                            // dispatch(updateLimit({
                            //     open: true,
                            //     data: {
                            //         head: locale?.popups?.nocredit_chat_message?.title,
                            //         // text: `${locale?.popups?.nocredit_chat_message?.text_part_1}${currentUser?.name} 
                            //         // ${locale?.popups?.nocredit_chat_message?.text_part_2}${getPrice(actionsPricing, 'SEND_CHAT_MESSAGE')}`
                            //         text: locale?.popups?.nocredit_global_chat
                            //     }
                            // }))
                        } else {
                            onUpdateChat({messageBody: res?.chat?.last_message, dialogBody: res?.chat})
                            // service.getMyProfile(token).then(res => {
                            //     const {credits} = res
                            //     dispatch(setFreeCredits(credits))
                            // })
                            updateBalance()
                            if(userData?.is_email_verified === 0 && userData?.prompt_careers?.length > 0) {
                                dispatch(updateEmailModal(true))
                            }
                        }
                        
                    }).finally(() => {
                        setLoad(false)
                        setText('')
                    })
                }
                if(type === 'mail') {
                    setLoad(true)
                    service.sendMail_text({
                        letter_id: Number(query?.id),
                        text
                    }, token).then(res => {
                        if(res?.error) {
                            if(res?.error === 'You need to fill in information about yoursel') {
                                setCr(true)
                            } else {
                                if(userData?.free_credits && userData?.free_credits < 3) {
                                    dispatch(updateSubsModal(true))
                                }
                            }
                            // dispatch(updateLimit({
                            //     open: true,
                            //     data: {
                            //         head: locale?.popups?.nocredit_mail_message?.title,
                            //         // text: `${locale?.popups?.nocredit_mail_message?.text_part_1}${currentUser?.name} 
                            //         // ${locale?.popups?.nocredit_mail_message?.text_part_2}${getPrice(actionsPricing, 'SEND_MAIL_MESSAGE')}`
                            //         text: locale?.popups?.nocredit_global_chat
                            //     }
                            // }))
                        } else {
                            onUpdateChat({messageBody: res?.letter?.last_message, dialogBody: res?.letter})
                            service.getMyProfile(token).then(res => {
                                const {credits} = res
                                dispatch(setFreeCredits(credits))
                            })
                        }
                    }).finally(() => {
                        setLoad(false)
                        setText('')
                    })
                }
            }
        }
    }, [text, query, token, type])


    

    const uploadMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(type === 'chat') {
            if(e.target?.files && token && (id && typeof id === 'string')) {
                const data = new FormData()
                data.append('category_id', '3')
                data.append('image', e.target.files[0])
                setLoad(true)
                service.addProfileImage(data,token).then(res => {
                    if(res?.thumbnail_url && res?.image_url) {
                        service.sendMessage_image({
                            chat_id: id,
                            thumbnail_url: res.thumbnail_url,
                            image_url: res.image_url
                        }, token).then(r => {
                            if(r?.error) {
                                // if(userData?.free_credits && userData?.free_credits < 3) {
                                //     dispatch(updateSubsModal(true))
                                // }
                                if(res?.error === 'You need to fill in information about yoursel') {
                                    setCr(true)
                                } else {
                                    dispatch(updateLimit({
                                        open: true,
                                        data: {
                                            head: locale?.popups?.nocredit_chat_picture?.title,
                                            // text: `${locale?.popups?.nocredit_chat_picture?.text_part_1}${currentUser?.name} 
                                            // ${locale?.popups?.nocredit_chat_picture?.text_part_2}${getPrice(actionsPricing, 'SEND_CHAT_PHOTO')}`
                                            text: locale?.popups?.nocredit_global_chat
                                        }
                                    }))
                                }
                                
                            } else {
                                onUpdateChat({messageBody: r?.chat?.last_message, dialogBody: r?.chat})
                                // service.getMyProfile(token).then(res => {
                                //     const {credits} = res
                                //     dispatch(setFreeCredits(credits))
                                // })
                                service.getCredits(token).then(credits => {
                                    dispatch(updateUserData({...userData, credits}))
                                })
                                service.getMyProfile(token).then(res => {
                                    const {credits} = res
                                    dispatch(setFreeCredits(credits))
                                })
                                if(userData?.is_email_verified === 0 && userData?.prompt_careers?.length > 0) {
                                    dispatch(updateEmailModal(true))
                                }
                            }
                            
                        }).finally(() => {
                            setLoad(false)
                            setText('')
                        })
                    }
                })
            }
        }

        if(type === 'mail') {
            if(e.target?.files) {
                const files = Array.from(e.target.files)
                if(files?.length > 0 && token && (id && typeof id === 'string')) {
                    const resList: any = []
                    files.forEach((file: string | Blob) => {
                        const data = new FormData()
                        data.append('category_id', '3')
                        data.append('image', file)
                        resList.push(service.addProfileImage(data, token))
                    })
                    setLoad(true)
                    Promise.all(resList).then(res => {
                        const filtered = res?.filter(i => i.id).map(i => i.id)
                        service.sendMail_text({
                            letter_id: Number(id),
                            text: text,
                            images: `[${filtered.join(',')}]`
                        }, token).then(r => {
                            // !! нужно включить после того как Даниил поправить модель
                            if(r?.error) {
                                if(r?.error === 'You need to fill in information about yoursel') {
                                    setCr(true)
                                } else {
                                    if(userData?.free_credits && userData?.free_credits < 3) {
                                        dispatch(updateSubsModal(true))
                                    }
                                }
                                
                                // dispatch(updateLimit({
                                //     open: true,
                                //     data: {
                                //         head: locale?.popups?.nocredit_mail_message?.title,
                                //         // text: `${locale?.popups?.nocredit_mail_message?.text_part_1}${currentUser?.name} 
                                //         // ${locale?.popups?.nocredit_mail_message?.text_part_2}${getPrice(actionsPricing, 'SEND_MAIL_MESSAGE')}`
                                //         text: locale?.popups?.nocredit_global_chat
                                //     }
                                // }))
                            } else {
                                onUpdateChat({messageBody: r?.letter?.last_message, dialogBody: r?.letter})
                                service.getMyProfile(token).then(res => {
                                    const {credits} = res
                                    dispatch(setFreeCredits(credits))
                                })
                            }
                        }).finally(() => {
                            setLoad(false)
                            setText('')
                        })
                        
                    })
                }
            }
        }
   
    }


    const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.keyCode === 13 && !(e.keyCode == 13 && e.shiftKey)) {
            e.preventDefault()
            if(text) {
                sendMessage()
            }
        }
    }


    return (
        <div className={styles.lt}>
            <CompReg
                open={cr}
                onCancel={() => setCr(false)}
                />
            {
                load ? (
                    <div className={styles.load}><PulseLoader color='var(--violet)'/></div>
                ) : null
            }
            <div className={`${styles.wrapper} ${load ? styles.disabled : ''}`}>
                {/* <AnimatePresence>
                    {
                        stickers ? (
                            <Stickers 
                                onClose={() => setStickers(false)}
                                onStickerSelect={onStickerSelect}
                                onSmileSelect={onSmileSelect}
                                isOpened={stickers}
                                pos={drawerPos}/>
                        ) : null
                    }   
                </AnimatePresence> */}
                <OutsideClickHandler
                    onOutsideClick={() => setStickers(false)}
                    >
                <Stickers
                    onClose={() => setStickers(false)}
                    onStickerSelect={onStickerSelect}
                    onSmileSelect={onSmileSelect}
                    isOpened={stickers}
                    pos={drawerPos}/>
                </OutsideClickHandler>
                
                <div className={styles.main}>
                    <div className={styles.input}>
                        <TextareaAutosize 
                            onKeyDown={onEnter}
                            maxLength={300}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            maxRows={8}
                            onHeightChange={e => {
                                if(width <= 768) {
                                    setHeight(e + 48)
                                    setDrawerPos(e + 48)
                                } else {
                                    setHeight(e + 44)
                                    setDrawerPos(e + 44)
                                }
                                
                            }}
                            placeholder={`${locale?.chatPage.action.placeholder}...`}
                            />
                    </div>
                    {/* {
                        width <= 768 ? (
                            null
                        ) : (
                            <div className={styles.action}>
                                <div className={styles.item}>
                                    <IconButton
                                        onClick={() => setStickers(s => !s)}
                                        variant={'bordered'}
                                        size={30}
                                        icon={<AiOutlineSmile size={20}/>}
                                        />
                                </div>
                                <div className={styles.item}>
                                    <IconButton
                                        onClick={getGifts}
                                        variant={'bordered'}
                                        size={30}
                                        icon={<AiOutlineGift size={20}/>}
                                        />
                                </div>
                                <div className={`${styles.item} ${styles.upload}`}>
                                    <input 
                                        id='chat_media_upload'
                                        type="file" 
                                        multiple={type === 'mail'}
                                        onChange={uploadMedia}
                                        accept='.png, .jpg, .jpeg'
                                        value=''
                                        />
                                    <IconButton 
                                        fileId='chat_media_upload' 
                                        variant={'bordered'}
                                        size={30}
                                        icon={<AiOutlineCamera size={20}/>}
                                        /> 
                                    
                                </div>
                            </div>
                        )
                    } */}
                     <div className={styles.action}>
                                {/* {
                                    width > 768 && (
                                        <div className={styles.item}>
                                            <IconButton
                                                onClick={() => setStickers(s => !s)}
                                                variant={'bordered'}
                                                size={30}
                                                icon={<AiOutlineSmile size={20}/>}
                                                />
                                        </div>
                                    )
                                } */}
                                {
                                    type === 'mail' && (
                                        <div className={`${styles.item} ${styles.upload}`}>
                                            <input 
                                                id='chat_media_upload'
                                                type="file" 
                                                multiple={type === 'mail'}
                                                onChange={uploadMedia}
                                                accept='.png, .jpg, .jpeg'
                                                value=''
                                                />
                                            <IconButton 
                                                fileId='chat_media_upload' 
                                                variant={'bordered'}
                                                size={30}
                                                icon={<AiOutlineCamera size={20}/>}
                                                /> 
                                            
                                        </div>
                                    ) 
                                }
                                {
                                    type === 'chat' && (
                                        <>
                                              <div className={styles.item}>
                                                        <IconButton
                                                            onClick={() => setStickers(s => !s)}
                                                            variant={'bordered'}
                                                            size={30}
                                                            icon={<AiOutlineSmile size={20}/>}
                                                            />
                                                    </div>
                                            <div className={styles.item}>
                                                <IconButton
                                                    onClick={getGifts}
                                                    variant={'bordered'}
                                                    size={30}
                                                    icon={<AiOutlineGift size={20}/>}
                                                    />
                                            </div>
                                            <div className={`${styles.item} ${styles.upload}`}>
                                                <input 
                                                    id='chat_media_upload'
                                                    type="file" 
                                                    onChange={uploadMedia}
                                                    accept='.png, .jpg, .jpeg'
                                                    value=''
                                                    />
                                                <IconButton 
                                                    fileId='chat_media_upload' 
                                                    variant={'bordered'}
                                                    size={30}
                                                    icon={<AiOutlineCamera size={20}/>}
                                                    /> 
                                                
                                            </div>
                                        </>
                                    )
                                }
                                      
                            </div>
                </div>
                <div className={styles.send}>
                    <IconButton
                        disabled={!text}
                        onClick={sendMessage}
                        size={width <= 768 ? 30: 45}
                        icon={<BsArrowUpShort size={40}/>}
                        />
                </div>
            </div>
        </div>
       
    )
}

export default ChatAction;