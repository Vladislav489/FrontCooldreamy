import styles from './UserInfo.module.scss';
import {FC, useState} from 'react';
import { Row, Col } from 'antd';
import UserInfoAction from '../UserInfoAction/UserInfoAction';
import UserImages from '../UserImages/UserImages';
import UserMain from '../UserMain/UserMain';
import { IUser } from '@/models/IUser';
import { useWindowSize } from 'usehooks-ts';
import Button from '@/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import { updateToken, updateUserId, updateSocket } from '@/store/actions';
import LOCAL_STORAGE from '@/helpers/localStorage';
import ApiService from '@/service/apiService';
import Router from 'next/router';
import PromptModal from '@/popups/PromptModal/PromptModal';
import notify from '@/helpers/notify';
const service = new ApiService()

const UserInfo:FC<IUser> = (props) => {
    const dispatch = useAppDispatch()
    const {token, socketChannel, locale} = useAppSelector(s => s)
    const {
        about_self,
        avatar_url,
        avatar_url_big_thumbnail,
        avatar_url_thumbnail,
        birthday,
        country,
        created_at,
        credits,
        disabled,
        email,
        email_verified_at,
        gender,
        id,
        is_confirmed_user,
        is_in_top,
        is_new_avatar,
        is_premium,
        last_online,
        name,
        premium_expire,
        prompt_careers,
        prompt_finance_states,
        prompt_relationships,
        prompt_sources,
        prompt_targets,
        prompt_want_kids,
        state,
        tags,
        top_expire,
        type,
        updated_at,
        profile_photos
    } = props
    const {width} = useWindowSize()
    const [logoutModal, setLogoutModal] = useState(false)

    const onLogout = () => {
        if(token) {
            service.logout(token).then(res => {
                if(res?.message === 'success') {
                    socketChannel?.unsubscribe()

                    dispatch(updateToken(''))
                    dispatch(updateUserId(null))
                    dispatch(updateSocket(null))
                    LOCAL_STORAGE?.removeItem('cooldate-web-user-id')
                    LOCAL_STORAGE?.removeItem('cooldate-web-token')
                    
                    Router.push('/')
                    setLogoutModal(false)
                    window.location.reload()
                } else {
                    notify(locale?.global?.notifications?.error_default, 'ERROR')
                }
            })
        }
    }


    return (
        <div className={styles.wrapper}>
             <PromptModal
                text={locale?.popups.logout.title}
                open={logoutModal}
                onCancel={() => setLogoutModal(false)}
                onAccept={onLogout}
                onReject={() => setLogoutModal(false)}
                />
            <Row gutter={[15,15]}>
                {
                    width > 1000 && (
                        <>
                            <Col span={24}>
                                <UserInfoAction
                                    {...props}
                                    />
                            </Col>       
                        </>
                    )
                }
                <Col span={24}>
                    <UserImages
                        {...props}
                        />
                </Col>
                <Col span={24}>
                    <UserMain {...props}/>
                </Col>
                {
                    width <= 768 && (
                        <Col span={24}>
                            <div className={styles.logout}>
                                <Button
                                    text='Log out'
                                    middle
                                    onClick={() => setLogoutModal(true)}
                                    />
                            </div>
                        </Col>
                    )
                }
            </Row>
        </div>
    )
}

export default UserInfo;