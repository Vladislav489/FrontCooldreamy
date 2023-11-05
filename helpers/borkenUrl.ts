import img from '@/public/assets/images/girl-pl.jpeg'


const brokenUrl = (str: string, gender?: 'male' | 'female') => {
    if(str === 'https://media.cooldreamy.com/60027/ava/thumbnail_10.05.2022,103319.jpg' || str === 'https://media.cooldreamy.com/60017/ava/thumbnail_ö«Γ«03.10.22,181738.jpg' || str === 'https://media.cooldreamy.com/60010/ava/thumbnail_photo_2022-12-2600.47.59.jpeg' || str === 'https://media.cooldreamy.com/60035/ava/thumbnail_ö«Γ«10.08.2022,145200.jpg' || str === 'https://media.cooldreamy.com/60027/ava/thumbnail_10.05.2022,103319.jpg' || str === 'https://media.cooldreamy.com/60003/ava/thumbnail_ö«Γ«27.08.2022,221722.jpg' || str === 'https://media.cooldreamy.com/60010/ava/thumbnail_photo_2022-12-2600.47.59.jpeg' || str === 'https://media.cooldreamy.com/60010/ava/thumbnail_photo_2022-12-2600.47.59.jpeg' || str === 'https://newapi.soultri.site/empty-avatar.png') {
        return gender === 'male' ? 'https://newapi.soultri.site/empty-avatar.png' : img
        
    } else return str
}

export default brokenUrl;