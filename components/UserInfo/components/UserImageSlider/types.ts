import { StaticImageData } from "next/image"

type imageItem = {
    id?:string,
    image: StaticImageData
}

export type userImageSliderPropsType = {
    list?: imageItem[] | []
}