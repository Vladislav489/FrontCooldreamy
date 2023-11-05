import styles from './ChatPricing.module.scss';
import { useAppSelector } from '@/hooks/useTypesRedux';

const ChatPricing = () => {
    const {locale, actionsPricing} = useAppSelector(s => s)

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>{locale?.chatPage.pricing.title}</div>
            <div className={styles.body}>
                {
                    actionsPricing?.length > 0 && actionsPricing?.map(i => (
                        <div key={i.id} className={styles.item}>{i.name}: {i.price}</div>
                    ))
                }
            </div>
        </div>
    )
}


export default ChatPricing;