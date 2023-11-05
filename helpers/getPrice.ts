import { paidActionTypes } from "@/models/paidActionTypes"

const getPrice = (priceList: any[], type: paidActionTypes) => {

    if(type === 'SEND_CHAT_MESSAGE') {
        return priceList?.find(i => i.id === 1)?.price
    }

    if(type === 'SEND_MAIL_MESSAGE') {
        return priceList?.find(i => i.id === 2)?.price
    }

    if(type === 'SEND_CHAT_PHOTO') {
        return priceList?.find(i => i.id === 3)?.price
    }

    if(type ===  'SEND_CHAT_VIDEO') {
        return priceList?.find(i => i.id === 4)?.price
    }

    if(type === 'OPEN_CHAT_PHOTO') {
        return priceList?.find(i => i.id === 5)?.price
    }

    if(type === 'OPEN_CHAT_VIDEO') {
        return priceList?.find(i => i.id === 6)?.price
    }

    if(type === 'SEND_CHAT_STICKER') {
        return priceList?.find(i => i.id === 7)?.price
    }

    if(type === 'OPEN_MAIL_TEXT') {
        return priceList?.find(i => i.id === 8)?.price
    }

    if(type === 'OPEN_MAIL_PHOTO') {
        return priceList?.find(i => i.id === 9)?.price
    }

    if(type === 'OPEN_MAIL_VIDEO') {
        return priceList?.find(i => i.id === 10).price
    }
    
    if(type === "SEND_CHAT_GIFT") {
        return priceList?.find(i => i.id === 13).price
    }

    if(type === "SEND_MAIL_GIFT") {
        return priceList?.find(i => i.id === 14).price
    }

    return '{price}'
}

export default getPrice