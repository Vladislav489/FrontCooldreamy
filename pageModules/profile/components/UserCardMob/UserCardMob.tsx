import styles from './UserCardMob.module.scss';
import Image from 'next/image';
import { IUser } from '@/models/IUser';
import {FC} from 'react';
import UserTitle from '@/components/UserTitle/UserTitle';
import {Row, Col} from 'antd';
import UserLocation from '@/components/UserLocation/UserLocation';
import Button from '@/components/Button/Button';
import {motion} from 'framer-motion';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Router from 'next/router';
import { StatusCredits, StatusPremium, StatusVip } from '@/components/donateStatus/donateStatus';
import placeholder from '@/public/assets/images/avatar-placeholder.png'

interface I extends IUser {
    children?: React.ReactNode
}

const UserCardMob:FC<I> = ({
    user_avatar_url,
    avatar_url_thumbnail,
    name,
    age,
    state,
    country,
    credits,
    is_premium,

    children
}) => {
    const {locale, userData} = useAppSelector(s => s)
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.avatar}>
                <Image
                    width={120}
                    height={120}
                    src={(user_avatar_url && !user_avatar_url?.includes('cooldremy')) ? user_avatar_url : placeholder}
                    loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                    alt=''
                    />  
                </div>
                <div className={styles.body}>
                    <Row gutter={[5,5]}>
                        <Col span={24}>
                            <UserTitle
                                username={name}
                                age={age ? age?.toString() : ''}
                                isOnline
                                />
                        </Col>
                        <Col span={24}>
                            <UserLocation
                                size={12}
                                state={state}
                                country={country}
                                />
                        </Col>
                        {
                            children ? (
                                children
                            ) : (
                                <Col span={24}>
                                    <div className={styles.action}>
                                        <Button
                                            text={locale?.profilePage?.images?.verify_btn}
                                            variant={'simple'}
                                            small
                                            />
                                    </div>
                                </Col>
                            )
                        }
                    </Row>
                </div>
            </div>
            {
                !children && (
                    <div className={styles.action}>
                        {/* <div className={styles.item}>
                            <motion.button
                                onClick={() => Router.push('/deposit')}
                                whileTap={{scale: 0.9}} 
                                transition={{type: 'spring', damping: 17, stiffness: 400}}
                                className={styles.btn}>
                                {locale?.global?.my_card?.balance?.title}: {credits} {locale?.global?.my_card?.balance?.label}
                            </motion.button>
                        </div>
                        {
                            is_premium === 1 && (
                                <div className={styles.item}>
                                    <motion.button 
                                        whileTap={{scale: 0.9}} 
                                        transition={{type: 'spring', damping: 17, stiffness: 400}}
                                        className={styles.btn}>
                                        Premium
                                    </motion.button>
                                </div>
                            )
                        }  */}
                        <Row gutter={[10,10]}>
                            {
                                userData?.prompt_careers && userData?.prompt_careers.length === 0 && (
                                    <Col span={24}>
                                        <Button
                                            text='Complete registration'
                                            variant='white'
                                            onClick={() => Router.push('/complete')}
                                            fill
                                            middle
                                            hover={null}
                                            />
                                    </Col>
                                )
                            }
                            
                            <Col span={24}>
                                <StatusPremium/>
                            </Col>
                            <Col span={24}>
                                <StatusVip/>
                            </Col>
                            <Col span={24}>
                                <StatusCredits/>
                            </Col>
                        </Row>
                    </div>
                )
            }
        </div>
    )
}

export default UserCardMob;