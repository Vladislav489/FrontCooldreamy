import { StaticImageData } from "next/image"

type image = {
    id?: string,
    image: StaticImageData
}

type gift = {
    id?:string,
    count?: number,
    image: StaticImageData
}

type interest = {
    id?: string,
    value?: string,
    icon: StaticImageData
}

export type userInfoPropsType = {
    name?: string,
    age?: number,
    location?: string,
    images?: image[] | [],
    about?: string,
    gifts?: gift[] | [],
    online?: boolean,
    target?: string,
    expenses?: string,
    interests?: interest[] | [],
    personalInfo?: string
}