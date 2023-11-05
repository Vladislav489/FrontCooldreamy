import styles from './UserImageItem.module.scss';
import Image, { StaticImageData } from 'next/image';
import placeholder from '@/public/assets/images/placeholder.png';
import IconButton from '@/components/IconButton/IconButton';
import {BsTrash} from 'react-icons/bs';


const UserImageItem = ({
    image,
}: {
    image: StaticImageData | string,
}) => {


    return (
        <div className={styles.item}>
           
            
            <Image
                width={150}
                height={150}
                loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''} 
                src={image ? image : placeholder} 
                unoptimized
                alt=""/>
        </div>
    )
}

export default UserImageItem;