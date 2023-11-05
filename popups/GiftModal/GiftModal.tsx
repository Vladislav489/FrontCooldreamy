import getClassNames from '@/helpers/getClassNames';
import styles from './GiftModal.module.scss';
import { Modal, ModalFuncProps } from 'antd';
import Gifts from '@/pageModules/chat/components/Gifts/Gifts';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import { updateLimit, updateEmailModal } from '@/store/actions';

const service = new ApiService()

interface I extends ModalFuncProps {
    userId?: number | string
}

const GiftModal:FC<I> = (props) => {
    const {token, userData} = useAppSelector(s => s)
    const dispatch = useAppDispatch()
    const {
        userId,
        ...otherProps
    } = props

    const {onCancel} = otherProps

    const sendGiftMessage = (gifts: any[]) => {
        if(gifts && token) {
            service.sendMessage_gift({gifts, user_id: userId}, token).then(res => {
                    
                if(res?.error) {
                    if(res?.error === 'You need to fill in information about yoursel') {
                        // setCr(true)
                    } else {
                        dispatch(updateLimit({
                            open: true,
                            data: {
                                // head: locale?.popups?.nocredit_gift?.title,
                                action: {
                                    label: 'Go to store',
                                    link: '/deposit-mb?tab=3'
                                }
                            }
                        }))
                        // if(userData?.free_credits && userData?.free_credits < 3) {
                        //     dispatch(updateSubsModal(true))
                        // }
                    }
                } else {
                    // onUpdateChat({messageBody: res?.chat?.last_message, dialogBody: res?.chat})
                    // service.getCredits(token).then(credits => {
                    //     dispatch(updateUserData({...userData, credits}))
                    // })
                }
                if(userData?.is_email_verified === 0 && userData?.prompt_careers?.length > 0) {
                    dispatch(updateEmailModal(true))
                }
            })
        }
    }

    return (
        <Modal
            {...props}
            className={getClassNames([styles.wrapper, 'modal'])}
            >
            <Gifts
                pb={0}
                onClose={() => {}}
                onSend={sendGiftMessage}
                />
        </Modal>
    )
}

export default GiftModal