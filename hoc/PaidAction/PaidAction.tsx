import {FC, ReactNode, useEffect, useState} from 'react';
import { useAppSelector } from '@/hooks/useTypesRedux';
import LimitModal from '@/popups/LimitModal/LimitModal';
import styles from './PaidAction.module.scss';

interface I {
    children?: ReactNode,

    actionType: actionTypes
    
}
// 1 = STANDART
// 2 = SUBSCRIBE
// 3 = PREMIUM
// 4 = SUBSCRIBE/PREMIUM
type userTypes = 1 | 2 | 3 | 4

// 1 = PAID
// 2 = PREMIUM
// 3 = COND PAID
type actionTypes = 1 | 2 | 3



const PaidAction:FC<I> = ({
    children,
    actionType
}) => {
    const {userData} = useAppSelector(s => s)
    const {is_premium, gender, } = userData || {}

    const [userType, setUserType] = useState<userTypes>()


    //modal states 
    const [modal, setModal] = useState(false)
    const [head, setHead] = useState('')
    const [text, setText] = useState('')
    const [action, setAction] = useState({link: '', label: ''})
    


    useEffect(() => {
        if(is_premium === 1) {
            setUserType(3)
        }
        if(is_premium === 0) {
            setUserType(1)
        }
    }, [is_premium])    


    const onBlocked = () => {
        if(userType) {
            if(userType === 1) {

            }
        }
    }

    const onCloseModal = () => {
        setModal(false)
        setHead('')
        setText('')
        setAction({link: '', label: ''})
    }


    return (
        <>
            <LimitModal
                open={modal}
                onCancel={onCloseModal}
                />
            <div className={styles.wrapper}>
                {
                    
                }
            </div>
        </>
    )
}

export default PaidAction;