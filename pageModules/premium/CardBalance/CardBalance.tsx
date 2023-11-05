import styles from './CardBalance.module.scss';
import Button from '@/components/Button/Button';


const CardBalance = ({list, selected, onSelect, onAccept, load}: {list?: any[], selected: any, onSelect: any, onAccept: (...args: any[]) => any, load: boolean}) => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.title}>Credit balance.</div>
                <div className={styles.icon}>
                    <div className={styles.icon_img}></div>
                </div>
                <div className={styles.body}>
                    <div className={styles.head}>Purchases on the site</div>
                    <div className={styles.text}>
                    You can use credits to gift presents, stickers, and much more.
                    </div>
                    <div className={styles.list}>
                        {
                            (list && list?.length > 0) && list?.map(i => (
                                <div
                                    onClick={() => onSelect({value: i?.id, type: 'credit'})}
                                    className={styles.item} key={i?.id}>
                                    <input type="radio" checked={i?.id == selected?.value && selected?.type == 'credit'}/>
                                    <label className={styles.label}>
                                        <div className={styles.value}><span>{i?.credits}</span> credits</div>
                                        <div className={styles.price}>${i?.price}</div>
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.action}>
                    <Button
                        text={'Buy credits'}
                        fill
                        load={load && selected?.type === 'credit'}
                        disabled={selected?.type !== 'credit'}
                        onClick={onAccept}
                        />    
                </div> 
            </div>
        </div>
    )
}

export default CardBalance;