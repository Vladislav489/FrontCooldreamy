import {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { useIdleTimer } from 'react-idle-timer'
import { pusherConfigType } from '@/helpers/getChannels';
import getChannels from '@/helpers/getChannels';
import Script from 'next/script';
import { 
	updateNewMail, 
	updateNewMessage, 
	updateCurrentProfileId, 
	updateSocket, 
	updateUserData, 
	updateUnreadChatCount, 
	updateSoonModal, 
	increaseUnreadChatCount, 
	updateSympCountData, 
	incSympWathces, 
	incSympLikes, 
	updatePremiumData, 
	inccreaseUnreadMailCount, 
	updateUnreadMailCount, 
	updatePremModal,
	updateSubsModal,
	setCredits,
	updateCurrentSub,
	updateCurrentVip,
	updateEmailModal
} from '@/store/actions';
import notify from '@/helpers/notify';
import ApiService from '@/service/apiService';
import chatMessageTypeVariants from '@/helpers/messageVariants';
import LinesEllipsis from 'react-lines-ellipsis';
import ProfileModal from '@/popups/ProfileModal/ProfileModal';
import { useRouter } from 'next/router';
import { updateLocale, updatePricing, updateLimit } from '@/store/actions';
import ru from '@/locales/ru';
import en from '@/locales/en';
import LimitModal from '@/popups/LimitModal/LimitModal';
import SoonModal from '@/popups/SoonModal/SoonModal';
import { BASE_DOMAIN, BASE_WS_HOST, TEST_DOMAIN, TEST_WS_HOST } from '@/service/endpoints';
import styles from './MainWrapper.module.scss';
import socketEvents from '@/helpers/socketEvents';
import UserTitle from '../UserTitle/UserTitle';
import Link from 'next/link';
import PremModal from '@/popups/PremModal/PremModal';
import SubsModal from '@/popups/SubsModal/SubsModal';
import useCheckDevice from '@/hooks/useCheckDevice';
import VerifyEmailModal from '@/popups/VerifyEmailModal/VerifyEmailModal';
import EditModalText from '@/pageModules/profile/modals/EditModals/EditModalText/EditModalText';

const service = new ApiService()


const MainWrapper = ({
    children
}: {children?: React.ReactNode}) => {
	const {locale, pathname, push, asPath, query} = useRouter()
	const dispatch = useAppDispatch()
    const {
			token, 
			userId, 
			socketChannel, 
			userData, 
			currentProfileId, 
			limit, 
			unreadChatCount, 
			newMessage, 
			newMail, 
			soonModal,
			premModal,
			subsModal,
			emailModal
		} = useAppSelector(s => s);
	const lc = useAppSelector(s => s.locale)
	const userDevice = useCheckDevice()

	const [pusherConfig, setPusherConfig] = useState<pusherConfigType | null>(null)
	const [emailEditModal, setEmailEditModal] = useState(false)


	const idle = useIdleTimer({
		onIdle: () => window.location.reload(),
		timeout: 7200000,
	})

	// useEffect(() => {
	// 	if(token && query && typeof query?.token === 'string') {
	// 		service.verifyEmail(token, query?.token).then(res => {
	// 			if(res === 200) {
	// 				notify(lc?.global?.notifications?.success_email_verify, 'SUCCESS')
	// 				service.getMyProfile(token).then(userData => {
	// 					dispatch(updateUserData(userData))
	// 				})
	// 			} else {
	// 				notify(lc?.global?.notifications?.error_email_verify, 'ERROR')
	// 			}
	// 		})
	// 	}
	// }, [token, query])

	

	useEffect(() => {
		if(locale === 'ru') {
			dispatch(updateLocale(ru))
		}
		if(locale === 'en') {
			dispatch(updateLocale(en))
		}
	}, [locale])


	useEffect(() => {
		if(window?.navigator?.language) {
			if(window?.navigator?.language === 'ru') {
				if(asPath) {
					// push(asPath, undefined, {locale: 'ru'})
					push(asPath, undefined, {locale: 'en'})
				}
			} else {
				if(asPath) {
					push(asPath, undefined, {locale: 'en'})
				}
			}
		}
	}, [])

	
	useEffect(() => {
		if(token) {
			// setPusherConfig(
			// 	{
			// 		key: 's3cr3t',
			// 		wsHost: BASE_WS_HOST,
			// 		authEndpoint: BASE_DOMAIN + 'broadcasting/auth',
			// 		cluster: 'mt1',
			// 		encrypted: true,
			// 		forceTLS: false,
			// 		wsPort: 6001,
			// 		wssPort: 6001,
			// 		disableStats: true,
			// 		enabledTransports: ['ws', 'wss'],
			// 		auth: {
			// 			headers: {
			// 				Authorization: 'Bearer ' + token,
			// 			}
			// 		}
			// 	}
			// )
			service.getMyProfile(token).then(res => {
				const {
					credits,
					...other
				} = res
				dispatch(updateUserData({...other, free_credits: credits}))
			})
			service.getActionPricing(token).then(res => {
				dispatch(updatePricing(res))
			})
			service.getPremiumStatus(token).then(res => {
				if(res?.status === 'success') {
					dispatch(updatePremiumData({is_premium: true}))
				}
			})
			service.getCredits(token).then(res => {
				dispatch(setCredits(res))
			})
			service.getCurrentSub(token).then(res => {
				if(res?.id) {
					dispatch(updateCurrentSub(res))
				} else {
					dispatch(updateCurrentSub(null))
				}
			})
			service.getCurrentVip(token).then(res => {
				if(res?.id) {
					dispatch(updateCurrentVip(res))
				} else {
					dispatch(updateCurrentVip(null))
				}
			})
		}
	}, [token])

	// useEffect(() => {
	// 	if(pusherConfig && userId && !socketChannel) {
	// 		const channels = getChannels(pusherConfig).private(`App.User.${userId}`);
	// 		dispatch(updateSocket(channels))
	// 		channels.subscribed(() => {
	// 			// notify(lc?.global?.notifications?.success_socket, 'SUCCESS')
	// 			console.log('[WebSocket]: CONNECTED')
	// 		})
	// 		channels?.error(() => {
	// 			// notify(lc?.global?.notifications?.error_socket, 'ERROR')
	// 			console.log('[WebSocket]: DISCONNECTED')
	// 		})
	// 	}
	// }, [pusherConfig, userId, socketChannel])

	const getIndicators = () => {
		if(token) {
			service.getUnreadCount(token).then(res => {
				dispatch(updateUnreadChatCount(res?.count_chat_messages))
				dispatch(updateUnreadMailCount(res?.count_letter_messages))
			})
			service.getFeedFilterCount(token).then(res => {
				dispatch(updateSympCountData(res))
			})
		}
	}


	useEffect(() => {
		let tm:any;
		if(token) {
			getIndicators()
			tm = setInterval(getIndicators, 4000)
		}
	}, [token])


	// useEffect(() => {
	// 	if(newMessage) {
	// 		dispatch(increaseUnreadChatCount())
	// 	}
	// }, [newMessage])

	// useEffect(() => {
	// 	if(newMail) {
	// 		dispatch(inccreaseUnreadMailCount())
	// 	}
	// }, [newMail])
	

	// useEffect(() => {
	// 	if(socketChannel) {
	// 		//?? получение сообщений
	// 		notify('asdadas', 'AVATAR')
  //     socketChannel?.listen(socketEvents?.eventNewChatMessage, (data: any) => {
	// 			dispatch(updateNewMessage(data))
	// 			const avatar = data?.chat_message?.sender_user?.user_avatar_url;
	// 			const name = data?.chat_message?.sender_user?.name;
	// 			const age = data?.chat_message?.sender_user?.age;
	// 			const chatId = data?.chat_message?.chat_id

	// 			switch(data?.chat_message?.chat_messageable_type) {
	// 				case chatMessageTypeVariants.messageText:
	// 					notify(<Link href={`/chat/${chatId}?type=chat`}>
	// 						<UserTitle style={{color: 'var(--violet)'}} username={name} age={age}/>
	// 						<LinesEllipsis text={data?.chat_message?.chat_messageable?.text} maxLine={2}/>
	// 					</Link>, 'AVATAR', avatar)
	// 					// showPush(`${name}, ${age}`, {body: data?.chat_message?.chat_messageable?.text})
	// 					break;
	// 				case chatMessageTypeVariants.messageGift:
	// 					notify(<Link href={`/chat/${chatId}?type=chat`}>
	// 						<UserTitle style={{color: 'var(--violet)'}} username={name} age={age}/>
	// 						{lc?.global?.notifications?.get_gift}
	// 					</Link>, 'AVATAR', avatar)
	// 					break;
	// 				case chatMessageTypeVariants.messageImage:
	// 					notify(<Link href={`/chat/${chatId}?type=chat`}>
	// 						<UserTitle style={{color: 'var(--violet)'}} username={name} age={age}/>
	// 						{lc?.global?.notifications?.get_pic}
	// 					</Link>, 'AVATAR', avatar)
	// 					break;
	// 				case chatMessageTypeVariants.messageSticker:
	// 					notify(<Link href={`/chat/${chatId}?type=chat`}>
	// 						<UserTitle style={{color: 'var(--violet)'}} username={name} age={age}/>
	// 						{lc?.global?.notifications?.get_sticker}
	// 					</Link>, 'AVATAR', avatar)
	// 					break;
	// 				case chatMessageTypeVariants.messageWink:
	// 					notify(<Link href={`/chat/${chatId}?type=chat`}>
	// 						<UserTitle style={{color: 'var(--violet)'}} username={name} age={age}/>
	// 						{lc?.global?.notifications?.get_wink}
	// 					</Link>, 'AVATAR', avatar)
	// 					break;
	// 				default:
	// 					return null
	// 			}
  //     })
			
	// 		socketChannel?.listen(socketEvents?.eventSympathy, (data: any) => {
	// 			const avatar = data?.userData?.user_thumbnail_url || data?.userData?.user_avatar_url
	// 			if(data?.type === 'WATCH') {
	// 				dispatch(incSympWathces())
	// 			}
	// 			if(data?.type === 'LIKE') {
	// 				dispatch(incSympLikes())
	// 			}
	// 		})
	// 		socketChannel?.listen(socketEvents?.eventNewMailMessage, (data: any) => {
				
	// 			dispatch(updateNewMail(data))
	// 			const avatar = data?.letter_message?.sender_user?.user_thumbnail_url;
	// 			const name = data?.letter_message?.sender_user?.name;
	// 			const age = data?.letter_message?.sender_user?.age;
	// 			const chatId = data?.letter_message?.chat_id
				
	// 			if(data) {
	// 				notify(<Link href={`/chat/${chatId}?type=mail`}>
	// 				<UserTitle style={{color: 'var(--violet)'}} username={name} age={age}/>
	// 				New mail
	// 				{
	// 					data?.letter_message?.letter_messageable?.text ? (
	// 						<div style={{color: '#aaa', fontSize: 12, lineHeight: '16px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%'}}>{data?.letter_message?.letter_messageable?.text}</div>
	// 					) : null
	// 				}
	// 				</Link>, 'AVATAR', avatar)
	// 			}
	// 		})
  //   }
	// }, [socketChannel])


	// useEffect(() => {
	// 	let displayMode = 'browser tab';
	// 	if (window.matchMedia('(display-mode: standalone)').matches) {
	// 		displayMode = 'standalone';
	// 	}
	// 	if(displayMode === 'standalone') {
			
	// 	}
		
	// }, [])


    return (
        <>
			<LimitModal
				open={limit?.open}
				head={limit?.data?.head}
				text={limit?.data?.text}
				action={{
					label: limit?.data?.action?.label,
					link: limit?.data?.action?.link
				}}
				onCancel={() => dispatch(updateLimit({open: false}))}
				/>
			<PremModal 
				open={premModal}
				onCancel={() => dispatch(updatePremModal(false))}
				/>
			<SubsModal
				open={subsModal}
				onCancel={() => dispatch(updateSubsModal(false))}
				/>
			<ProfileModal
				onCancel={() => dispatch(updateCurrentProfileId(null))}
				open={currentProfileId ? true : false}
				/>
			<SoonModal
				open={soonModal}
				onCancel={() => dispatch(updateSoonModal(false))}
				/>
				<VerifyEmailModal
				open={emailModal}
				onCancel={() => dispatch(updateEmailModal(false))}
				onOpenEdit={() => setEmailEditModal(true)}
				/>
				<EditModalText
					editItemType={'email'}
					onCancel={() => setEmailEditModal(false)}
					open={emailEditModal}
					head='Edit e-mail'
					/>
        <div className={styles.wrapper}>
				{children}
			</div>
        </>
    )
}


export default MainWrapper;