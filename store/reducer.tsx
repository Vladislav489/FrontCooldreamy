import { PusherPrivateChannel } from "laravel-echo/dist/channel";
import { IUser } from "@/models/IUser";
import ru from "@/locales/ru";
import en from "@/locales/en";

import { ILocale } from "@/models/ILocale";
import LOCAL_STORAGE from "@/helpers/localStorage";


export interface IGlobalState {
    userId: string | { [property: string]: string; } | null | undefined,
    token: string | { [property: string]: string; } | null | undefined,
    socketChannel: PusherPrivateChannel | null,
    userData: IUser | null,
    isMenuOpen: boolean,
    currentProfileId: number | null,
    currentProfileUuid: string | null

    newMessage: any,
    newMail: any,
    locale: ILocale,

    actionsPricing: any[],


    limit: {
        open?: boolean,
        data?: {
            head?: string,
            text?: string,
            action?: {
                link?: string,
                label?: string
            }
        } | null
    },

    unreadChatCount: number,
    unreadMailCount: number

    soonModal: boolean,

    sympCountData: {
        count_likes: number,
        count_mutual: number,
        count_my_likes: number,
        count_watches: number
    },

    premiumData: {
        is_premium: boolean,
    },

    premModal: boolean,
    subsModal: boolean,

    currentSub: any,
    currentVip: any,

    registerData:any,

    credits: number,

    conversData: any,
    emailModal:boolean

}


export const globalState: IGlobalState = {
    userId: process?.browser && LOCAL_STORAGE?.getItem('cooldate-web-user-id') ? LOCAL_STORAGE.getItem('cooldate-web-user-id') : null,
    token: process?.browser && LOCAL_STORAGE?.getItem('cooldate-web-token') ? LOCAL_STORAGE.getItem('cooldate-web-token') : null,
    socketChannel: null,
    userData: null,
    isMenuOpen: false,
    newMessage: null,
    newMail: null,
    currentProfileId: null,
    currentProfileUuid: null,
    locale: en,
    actionsPricing:[],
    limit: {
        open: false,
    },
    unreadChatCount: 0,
    unreadMailCount: 0,
    soonModal: false,
    sympCountData: {
        count_likes: 0,
        count_mutual: 0,
        count_my_likes: 0,
        count_watches: 0
    },
    premiumData: {
        is_premium: false
    },
    premModal: false,
    subsModal: false,
    currentSub: null,
    currentVip: null,
    registerData: null,
    credits: 0,
    conversData: null,
    emailModal: false
}

const reducer = (state = globalState, action: any) => {
    switch(action.type) {
        case 'UPDATE_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'UPDATE_SOCKET':
            return {
                ...state,
                socketChannel: action.socket
            }
        case 'UPDATE_USER_ID':
            return {
                ...state,
                userId: action.id
            }
        case 'UPDATE_USER_DATA':
            return {
                ...state,
                userData: action.data
            }
        case 'UPDATE_MENU':
            return {
                ...state,
                isMenuOpen: action.value
            }

        case 'UPDATE_NEW_MESSAGE':
            return {
                ...state,
                newMessage: action.data
            }
        case 'UPDATE_NEW_MAIL':
            return {
                ...state,
                newMail: action.data
            }
        case 'UPDATE_CURRENT_PROFILE_ID':
            return {
                ...state,
                currentProfileId: action.data
            }
        case 'UPDATE_CURRENT_PROFILE_UIID':
            return {
                ...state,
                currentProfileUuid: action.data
            }
        case 'UPDATE_LOCALE': {
            return {
                ...state,
                locale: action.data
            }
        }
        case 'UPDATE_PRICING':
            return {
                ...state,
                actionsPricing: action.data
            }
        case 'UPDATE_LIMIT':
            return {
                ...state,
                limit: action.data
            }
        case 'UPDATE_UNREAD_CHAT_COUNT':
            return {
                ...state,
                unreadChatCount: action.data
            }
        case 'DECREASE_UNREAD_CHAT_COUNT':
            return {
                ...state,
                unreadChatCount: state.unreadChatCount > 0 ? state.unreadChatCount - 1 : 0
            }
        case 'INCREASE_UNREAD_CHAT_COUNT':
            return {
                ...state,
                unreadChatCount: state.unreadChatCount + 1
            }
        case 'DECREASE_UNREAD_MAIL_COUNT':
            return {
                ...state,
                unreadMailCount: state.unreadMailCount > 0 ? state.unreadMailCount - 1 : 0
            }
        case 'INCREASE_UNREAD_MAIL_COUNT':
            return {
                ...state,
                unreadMailCount: state.unreadMailCount + 1
            }
        case 'UPDATE_UNREAD_MAIL_COUNT':
            return {
                ...state,
                unreadMailCount: action.data
            }
        case 'UPDATE_SOON_MODAL':
            return {
                ...state,
                soonModal: action.data
            }

        case 'UPDATE_SYMP_COUNT_DATA':
            return {
                ...state,
                sympCountData: action.data
            }
        case 'DEC_SYMP_LIKES':
            return {
                ...state,
                sympCountData: {
                    ...state.sympCountData,
                    count_likes: 0
                }
            }
        case 'INC_SYMP_LIKES':
            return {
                ...state,
                sympCountData: {
                    ...state.sympCountData,
                    count_likes: state.sympCountData.count_likes + 1
                }
            }
        case 'DEC_SYMP_WATCHES':
            return {
                ...state,
                sympCountData: {
                    ...state.sympCountData,
                    count_watches: 0
                }
            }
        case 'INC_SYMP_WATCHES':
            return {
                ...state,
                sympCountData: {
                    ...state.sympCountData,
                    count_watches: state.sympCountData.count_watches + 1
                }
            }
        case 'UPDATE_PREMIUM_DATA':
            return {
                ...state,
                premiumData: action.data
            }
        case 'UPDATE_PREM_MODAL':
            return {
                ...state,
                premModal: action.data
            }
        case 'UPDATE_SUBS_MODAL':
            return {
                ...state,
                subsModal: action.data
            }
        case 'SET_CREDITS':
            return {
                ...state,
                // userData: {...state.userData, credits: action.data}
                credits: action.data
            }
        case 'SET_FREE_CREDITS':
            return {
                ...state,
                userData: {...state.userData, free_credits: action.data}
            }
        case 'UPDATE_CURRENT_SUB':
            return {
                ...state,
                currentSub: action.data
            }
        case 'UPDATE_CURRENT_VIP':
            return {
                ...state,
                currentVip: action.data
            }
        case 'UPDATE_REGISTER_DATA':
            return {
                ...state,
                registerData: action.data
            }
        case 'UPDATE_CONVERS_DATA':
            return {
                ...state,
                conversData: action.data
            }
        case 'UPDATE_EMAIL_MODAL':
            return {
                ...state,
                emailModal: action.data
            }
        default:
            return state;
    }
}

export default reducer;