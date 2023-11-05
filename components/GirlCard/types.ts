export type girlCardTypeOld = {
    image?: any,
    verified?: boolean,
    online?: boolean,
    name?: string,
    location?: string,
    photoCount?: number,
    age?: string | number,
    link?: URL
}


export type girlCardType = {
    age?: number,
    avatar_url?: string | URL,
    avatar_url_thumbnail?: string | URL,
    birthday?: string,
    country?: string,
    created_at?: string,
    id: number,
    name?: string,
    online?: 1 | 0,
    state?: string,
    winkable?: 1 | 0
}