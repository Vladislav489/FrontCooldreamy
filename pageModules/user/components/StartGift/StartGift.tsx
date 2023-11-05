import styles from './StartGift.module.scss';
import { Row, Col } from 'antd';
import GiftCard from '@/components/GiftCard/GiftCard';
import {FC, useState, useEffect} from 'react';
import { startGiftPropsType } from './types';
import Button from '@/components/Button/Button';
import {HiOutlineGift} from 'react-icons/hi';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import { updateLimit, updateEmailModal, updateSubsModal } from '@/store/actions';
import CompReg from '@/popups/CompReg/CompReg';
import notify from '@/helpers/notify';
import useUpdateBalance from '@/hooks/useUpdateBalance';

const service = new ApiService()
const StartGift:FC<startGiftPropsType> = ({
    id
}) => {
    const dispatch = useAppDispatch()
    const {locale, token, userData} = useAppSelector(s => s)
    const updateBalance = useUpdateBalance()
    const [gift, setGift] = useState<any>(null)
    const [load, setLoad] = useState(false)
    const [cr, setCr] = useState(false)

    useEffect(() => {
        if(token) {
            service.getGifts(token).then(res => {
                setGift(res?.find((i: any) => i.id == 12))
            })
        }
    }, [token])

    const sendGiftMessage = () => {
        if(token) {
            setLoad(true)
            service.sendMessage_gift({gifts: [12], user_id: id}, token).then(res => {
                if(res?.error) {
                    if(res?.error === 'You need to fill in information about yoursel') {
                        setCr(true)
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
                        updateBalance()
                    }
                } else {
                    // onUpdateChat({messageBody: res?.chat?.last_message, dialogBody: res?.chat})
                    // service.getCredits(token).then(credits => {
                    //     dispatch(updateUserData({...userData, credits}))
                    // })
                    notify('You send a gift', 'SUCCESS')
                    if(userData?.is_email_verified === 0 && userData?.prompt_careers?.length > 0) {
                        dispatch(updateEmailModal(true))
                    }
                }
                
            }).finally(() => setLoad(false))
        }
    }

    return (
        <div className={styles.card}>
            {/* <GiftModal
                open={true}
                onCancel={() => setModal(false)}
                /> */}
             <CompReg
                open={cr}
                onCancel={() => setCr(false)}
                />
            <Row gutter={[12,12]}>
                <Col span={24}>
                    <div className={styles.head}>
                        {locale?.global?.start_gift.title}
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.body}>
                        <GiftCard
                            price={gift?.credits}
                            image={gift?.picture_url}
                            />
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <Button
                            style={{
                                padding: '8px 10px',
                                fontSize: 18,
                                lineHeight: '27px',
                                width: '100%'
                            }}
                            text={locale?.global?.start_gift.btn}
                            variant={'bordered'}
                            onClick={sendGiftMessage}
                            load={load}
                            after={<HiOutlineGift/>}
                            />
                    </div>
                </Col>
            </Row>
            
        </div>
    )
}

export default StartGift;