import { useAppSelector } from "@/hooks/useTypesRedux";
import { useState } from "react";
import styles from './OnlyPremium.module.scss';
import LimitModal from "@/popups/LimitModal/LimitModal";



const OnlyPremium = ({
    children,
}: {
    children?: React.ReactNode
}) => {
    const {premiumData} = useAppSelector(s => s)
    const [modal, setModal] = useState(false)


    const onClick = () => {
        if(premiumData?.is_premium === false) {
            setModal(true)
        } else {
            return;
        }
    }

    return (
        <>
            <LimitModal
                open={modal}
                onCancel={() => setModal(false)}
                head="Limitation"
                text="Functionality available only in 'Premium subscription'"
                />
            <div className={styles.wrapper} onClick={onClick}>
            {
                premiumData?.is_premium === false ? (
                    <div className={styles.blocked}></div>
                ) : null
            }
            {children}
        </div>
        </>
        
    )
}

export default OnlyPremium;