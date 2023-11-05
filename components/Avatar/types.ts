import { StaticImageData } from "next/image"

export type avatarPropsTypes = {
    image?: string | StaticImageData,
    size?: number,
    round?: boolean,
    wrapperStyle?: React.CSSProperties,
    style?: React.CSSProperties,
    verified?: boolean,
    onClick?: (...args:any[]) => any
}