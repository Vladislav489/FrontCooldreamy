import { StaticImageData } from "next/image"

export type selectCardPropsTypes = {
    image?: StaticImageData,
    label: string,
    onSelect: (e: string) => void,
    isSelect: boolean,
    value: string,
    disabled?: boolean,
    isOnlyLabel?: boolean
}