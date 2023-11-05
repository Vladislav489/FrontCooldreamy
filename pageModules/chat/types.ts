export type chatItemPropsTypes = {
    // !!test
    favorite?: boolean,
    first_user_id?: number,
    id: number,
    is_ignored_by_first_user?: 0 | 1,
    is_ignored_by_second_user?: 0 | 1,
    last_message?: lastMessageType & lastMailType,
    another_user: chatUserType,
    is_confirmed_user?: 1 | 0
    text?: string,
    active: boolean,
    unread_messages_count?: number
}





export type lastMessageType = {
    chat_id?: number,
    chat_messageable_id?: number,
    chat_messageable_type?: string,
    created_at?: string,
    disabled?: 0 | 1,
    id?: number,
    is_read_by_recepient?: 0 | 1,
    recepient_user_id?: number,
    sender_user_id?: number,
    updated_at?: string,
    chat_messageable?: IMessageable
}

export type lastMailType = {
    chat_id?: number,
    letter_messageable_id?: number,
    letter_messageable_type?: string,
    created_at?: string,
    disabled?: 0 | 1,
    id?: number,
    is_read_by_recepient?: 0 | 1,
    recepient_user_id?: number,
    sender_user_id?: number,
    updated_at?: string,
    letter_messageable?: ILetterable
}







export type IMessageable = {
    created_at?: string,
    updated_at?: string
    gifts?: any[],
    id?: number,
    text?: string | null,
    from_user_id?: number,
    to_user_id?: number,
    thumbnail_url?: string,
    image_url?: string
}


export type ILetterable = {
    created_at?: string,
    gifts?: any[],
    id?: number
    is_payed?: 1 | 0,
    sticker?: any,
    text?: string,
    updated_at?: string
}



export type dialogItemType = {
    chat_id?: number,
    chat_messageable?: IMessageable,
    chat_messageable_id?: number,
    chat_messageable_type?: string,
    created_at?: string,
    disabled?: 1 | 0,
    id: number,
    is_read_by_recepient?: 1 | 0,
    sender_user_id?: number
    me?: boolean,
    updated_at?: string,
    index?: number
}

export type mailItemType = {
    letter_id?: number
    letter_messageable?: ILetterable,
    letter_messageable_id?: number,
    letter_messageable_type?: string,
    created_at?: string,
    disabled?: 1 | 0,
    id?: number,
    is_read_by_recepient?: 1 | 0,
    sender_user_id?: number,
    updated_at?: string,
    sender_user?: chatUserType
}



type chatUserType = {
    avatar_url?: string,
    avatar_url_thumbnail?: string,
    id?: number,
    name?: string,
    age?: number,
    online?: 1 | 0,
    user_avatar_url?: string,
    user_thumbnail_url?: string
}

// диалог (чат лист)
export interface IDialogs {
    dialogsList?: any[],
    activeDialogId?: number,
    updateDialogsPage?: (...args: any[]) => any,
    updateDialogsList?: (...args: any[]) => any,
    totalDialogItemCount?: number,
    filter?: 'all' | 'unread' | 'ignored' | 'favorite'
}

// сообщения в чате
export interface IChat {
    chatList: any[],
    id?: number,
    updateChatListPage: (...args: any[]) => any,
    totalChatItemCount?: number
}





export type chatTabsType = 'chat' | 'mail'


export interface IChatFilterType {
    activeType?: chatTabsType,
    onTypeChange: (type: chatTabsType) => any,

    activeFilter?: string,
    onFilterChange: (value: string) => any
}






export type chatTypes = 'chat' | 'mail'

export type messageStatusTypes = 'send' | 'read' | 'proccess' | 'unread'


export type chatMessageTypes = 
    'App\\Models\\ChatImageMessage' |
    'App\\Models\\ChatTextMessage' |
    'App\\Models\\ChatWinkMessage' | 
    'App\\Models\\ChatGiftMessage' |
    'App\\Models\\ChatStickerMessage'


export type chatMailTypes = 
    'App\\Models\\LetterTextMessage'

export type messageGiftType = {
    id: number | string,
    category?: any,
    credits?: any,
    name?: string,
    picture_url?: string,
}

export type messageStickerType = {
    id: number | string,
    category?: any,
    credits?: any,
    name?: string,
    picture_url?: string,
}

export interface IDialogItem {
    id: number | string
    index?: number
    avatar?: string,
    age?: number | string,
    last_message?: unknown,
    unread_count?: number,
    status?: messageStatusTypes
    isVerified?: boolean,
    isFav?: boolean
}

export interface IMessage {
    id: number | string,
    index?: number,
    type: chatMessageTypes,
    avatar?: string,
    isSelf?: boolean,
    status?: messageStatusTypes

    createdAt?: string,
    updatedAt?: string,

    text?: string | null,
    images: {image?: string, thumbnail?: string}[] | [],
    gifts?: messageGiftType[] | [],
    sticker?: messageStickerType | null,
    isRead?: boolean,

    senderUser?: any
}


export interface IMail {
    id: number | string,
    index?: number,
    type: chatMailTypes,
    avatar?: string,
    name?: string,
    age?: number
    isPayed?: boolean,
    images: {
        image: string, 
        thumbnail: string
        big_thumbnail: string,
        blur: string
    }[] | [],
    gifts?: messageGiftType[] | [],

    createdAt?: string,
    updatedAt?: string,
    sticker?: messageStickerType | null,
    text?: string | null,
    isSelf?: boolean,
    status?: messageStatusTypes
    updateChat?: (...args: any[]) => any,
    updateDialog?: (...args: any[]) => any
}




