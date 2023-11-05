import styles from './UserImageSlider.module.scss';
import {FC} from 'react';
import { IUser } from '@/models/IUser';
import UserImageItem from '@/pageModules/profile/components/UserImageItem/UserImageItem';
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';

const UserImageSlider:FC<IUser> = ({
    profile_photo,
    avatar_url,
    avatar_url_big_thumbnail
}) => {

 

    return (
        <FancyboxWrapper>
            <div className={`${styles.wrapper} horizontal-scroll`}>
                {
                    (avatar_url && avatar_url_big_thumbnail) && (
                        <a data-fancybox="gallery" href={avatar_url} className={styles.item}>
                            <UserImageItem
                                image={avatar_url_big_thumbnail}
                            />
                        </a>
                    )
                }
                {
                    profile_photo?.map((item, index) => (
                        <a data-fancybox="gallery" href={item.image_url} className={styles.item} key={index}>
                            <UserImageItem
                                image={item?.image_url}
                            />
                        </a>
                    ))
                }
            </div>
        </FancyboxWrapper>
    )
}

export default UserImageSlider;