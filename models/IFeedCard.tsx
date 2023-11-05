import { StaticImageData } from "next/image";

interface IFeedCard {
    age?: number,
    user_avatar_url?: string,
    avatar_url?: string,
    avatar_url_thumbnail: string
    birthday?: string,
    country?: string,
    id: number,
    name?: string,
    state?: string,
    user_thumbnail_url?: string,
    
    
}

export default IFeedCard;