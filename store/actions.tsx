import { ILocale } from "@/models/ILocale";
import { IUser } from "@/models/IUser";
import { PusherPrivateChannel, Channel } from "laravel-echo/dist/channel";


export const updateToken = (token: string | { [property: string]: string; } | null | undefined) => ({type: 'UPDATE_TOKEN', token: token})
export const updateSocket = (socket: PusherPrivateChannel | Channel |  null) => ({type: 'UPDATE_SOCKET', socket: socket})
export const updateUserId = (id: string | { [property: string]: string; } | number | null | undefined) => ({type: 'UPDATE_USER_ID', id: id})
export const updateUserData = (data: IUser | null) => ({type: 'UPDATE_USER_DATA', data})
export const updateMenu = (value: boolean) => ({type: 'UPDATE_MENU', value})
export const updateCurrentProfileId = (data:number | null) => ({type: 'UPDATE_CURRENT_PROFILE_ID', data}) 
export const updateCurrentProfileUiid = (data:string | null) => ({type: 'UPDATE_CURRENT_PROFILE_UIID', data}) 


export const updateNewMessage = (data: any) => ({type: 'UPDATE_NEW_MESSAGE', data})
export const updateNewMail = (data: any) => ({type: 'UPDATE_NEW_MAIL', data})

export const updateLocale = (data: ILocale) => ({type: 'UPDATE_LOCALE', data})

export const updatePricing = (data: any[]) => ({type: 'UPDATE_PRICING', data})


export const updateLimit = (data: {
    open?: boolean, 
    data?: {
        head?: string, 
        text?: string, 
        action?: {
            link?: string,
            label?: string
        }
    }
}) => ({type: "UPDATE_LIMIT", data})


export const updateUnreadChatCount = (data: number) => ({type: 'UPDATE_UNREAD_CHAT_COUNT', data})
export const decreaseUnreadChatCount = () => ({type: 'DECREASE_UNREAD_CHAT_COUNT'})
export const increaseUnreadChatCount = () => ({type: 'INCREASE_UNREAD_CHAT_COUNT'})

export const updateUnreadMailCount = (data: number) => ({type: 'UPDATE_UNREAD_MAIL_COUNT', data})
export const decreaseUnreadMailCount = () => ({type: 'DECREASE_UNREAD_MAIL_COUNT'})
export const inccreaseUnreadMailCount = () => ({type: 'INCREASE_UNREAD_MAIL_COUNT'})


export const updateSympCountData = (data: any) => ({type: "UPDATE_SYMP_COUNT_DATA", data})

export const decSympLikes = () => ({type: 'DEC_SYMP_LIKES'})
export const incSympLikes = () => ({type: 'INC_SYMP_LIKES'})
export const decSympWathces = () => ({type: "DEC_SYMP_WATCHES"})
export const incSympWathces = () => ({type: 'INC_SYMP_WATCHES'})



export const updateSoonModal = (data: boolean) => ({type:'UPDATE_SOON_MODAL', data})
export const updatePremiumData = (data: any) => ({type: 'UPDATE_PREMIUM_DATA', data})

export const updatePremModal = (data: any) => ({type: 'UPDATE_PREM_MODAL', data})
export const updateSubsModal = (data: any) => ({type: 'UPDATE_SUBS_MODAL', data})

export const setCredits = (data:any) => ({type:'SET_CREDITS', data})
export const setFreeCredits = (data:any) => ({type: 'SET_FREE_CREDITS', data})
export const updateCurrentSub = (data:any) => ({type: 'UPDATE_CURRENT_SUB', data})
export const updateCurrentVip = (data:any) => ({type:'UPDATE_CURRENT_VIP', data})
export const updateRegisterData = (data:any) => ({type: 'UPDATE_REGISTER_DATA', data})

export const updateConversData = (data:any) => ({type: 'UPDATE_CONVERS_DATA', data})

export const updateEmailModal = (data:boolean) => ({type: 'UPDATE_EMAIL_MODAL', data})