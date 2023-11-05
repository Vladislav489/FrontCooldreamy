import styles from './styles.module.scss';
import {FC, useEffect, useState} from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import { useAppSelector } from '@/hooks/useTypesRedux';
import CreditsInfoModal from '../CreditsInfoModal/CreditsInfoModal';
const ChatCountAvilableMessages:FC = () => {
    const {userData} = useAppSelector(s => s)
    const [modal, setModal] = useState(false)

    return (
        <div className={styles.wrapper}>
            <CreditsInfoModal
                open={modal}
                onCancel={() => setModal(false)}
                />
            <div className={styles.badge}>
                <div className={styles.label}>Доступно сообщений: {userData?.free_credits ? Math.floor(userData?.free_credits / 3) : 0} </div>
                <div className={styles.info} onClick={() => setModal(true)}>
                    <AiOutlineInfoCircle/>
                </div>
            </div>
        </div>
    )
}

export default ChatCountAvilableMessages;