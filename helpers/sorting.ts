import moment from "moment"

export const sortingChatList = (array: any[]) => {
    if(array?.length > 0) {
        return array.sort((a,b) => moment(a?.created_at).valueOf() < moment(b?.created_at).valueOf() ? 1 : -1)
    } else {
        return array;
    }
}

export const sortingMailChatList = (array: any[]) => {
    if(array?.length > 0) {
        return array.sort((a,b) => moment(a?.created_at).valueOf() < moment(b?.created_at).valueOf() ? 1 : -1)
    } else {
        return array;
    }
}

export const sortingDialogList = (array: any[]) => {
    if(array?.length > 0) {
        return [...array].sort((a, b) => moment(a?.updated_at).valueOf() < moment(b?.updated_at).valueOf() ? 1 : -1)
    } else {
        return array
    }
}