import { StaticImageData } from "next/image"

export type giftCardPropsType = {
    image?: StaticImageData | string,
    badgeValue?: number,
    label?: string,
    onSelect?: (...args: any[]) => any,
    price?: string,
    id?: number,
    active?: boolean
}