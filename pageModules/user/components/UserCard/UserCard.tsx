import styles from './UserCard.module.scss';
import { Row, Col } from 'antd';
import Image from 'next/image';
import {FC} from 'react';
import { userCardPropsTypes } from './types';
import {BsCheck2} from 'react-icons/bs';
import Link from 'next/link';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useRouter } from 'next/router';
import { IUser } from '@/models/IUser';
import placeholder from '@/public/assets/images/avatar-placeholder.png';
import { useState } from 'react';

const service = new ApiService()

interface IUserCard extends IUser {
    children?: React.ReactNode,

}


const UserCard:FC<IUserCard> = ({
    children,
    avatar_url,
    user_avatar_url,
    avatar_url_thumbnail
}) => {
    const {token} = useAppSelector(s => s)

    const [imgLoaded, setImgLoaded] = useState(false)




    return (
        <div className={styles.wrapper}>
            <Row gutter={[12,12]}>
                <Col span={24}>
                    <div className={styles.main}>
                        {/* {
                            verify ? (
                                <div className={styles.verif}>
                                    Фото проверено
                                    <BsCheck2/>
                                </div>
                            ) : null
                        } */}
                        <div className={`${styles.img} ${imgLoaded ? styles.active : ''}`}>
                            <Image 
                                className={styles.img_el}
                                loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                src={(user_avatar_url && !user_avatar_url?.includes('api.cooldremy.com')) ? user_avatar_url : placeholder}
                                width={275}
                                onLoadingComplete={() => setImgLoaded(true)}
                                height={285}
                                unoptimized
                                alt=""/>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    {children}
                </Col>
            </Row>
        </div>
    )
}

export default UserCard;