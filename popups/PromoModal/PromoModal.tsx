import { FC, useEffect, useState } from 'react';
import styles from './PromoModal.module.scss';
import {Modal, ModalFuncProps} from 'antd'
import Button from '@/components/Button/Button';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import Router from 'next/router';


const service = new ApiService()

const PromoModal:FC<ModalFuncProps> = (props) => {
    const {
        onCancel,
        open
    } = props
    const {token} = useAppSelector(s => s)
    const [data, setData] = useState<any>(null)


    const onClose = () => {
        onCancel && onCancel()
    }


    useEffect(() => {
        if(open && token) {
            service.getPromo(token).then(res => {
                if(res?.data?.length > 0) {
                    setData(res?.data[0]?.promotion)
                } 
            })
        }
        if(!open) {
            setData(null)
        }
    }, [open, token])


    return (
        <Modal 
            {...props}
            footer={false}
            width={472}
            centered
            onCancel={onClose}
            className={`modal ${styles.wrapper}`}>
            <div className={styles.in}>
                <div className={styles.body}>
                    <div className={styles.head}>
                        First time offer
                    </div>
                    <div className={styles.timer}>
                    11:59:52
                    </div>
                    <div className={styles.old_price}></div>
                    <div className={styles.price}></div>
                    <div className={styles.action}>
                        <Button
                            text='Buy'
                            middle
                            onClick={() => Router.push('/deposit-mb')}
                            />
                    </div>
                </div>
            </div>
        </Modal>
    )
}


export default PromoModal;