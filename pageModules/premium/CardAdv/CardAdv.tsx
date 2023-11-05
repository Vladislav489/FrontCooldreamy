import Button from '@/components/Button/Button';
import styles from './CardAdv.module.scss';
import {AiFillStar} from 'react-icons/ai'
import * as _ from 'lodash';

const CardAdv = ({
    list, 
    selected, 
    onSelect, 
    onAccept, 
    load
}: {
    list?: any[], 
    selected: any, 
    onSelect: any, 
    onAccept: (...args: any[]) => any, 
    load: boolean
}) => {
   
    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.title}>
                    Premium status
                </div>
                <div className={styles.icon}>
                    <div className={styles.icon_img}></div>
                </div>
                <div className={styles.body}>
                    <div className={styles.head}>
                        Buy Premium and 
                        chat without limits
                    </div>
                    <div className={styles.text}>
                    With a subscription, enjoy unlimited chat and free allowances for sending photos and videos.
                    </div>
                    <div className={styles.list}>
                        {
                            (list && list?.length > 0) && (
                                list?.map((i, index) => {
                                    if(index === 0) {
                                        return (
                                            <div 
                                                onClick={() => onSelect({value: i?.id, type: 'subscription'})}
                                                className={styles.item} key={i?.id}>
                                                <div className={styles.onetime}><span><AiFillStar/></span>SALE</div>
                                                <input type="radio" checked={i?.id == selected?.value && selected?.type == 'subscription'}/>
                                                <label className={styles.label} htmlFor="">
                                                    <div className={styles.value}>
                                                    {_.round(i?.duration / 1440, 2)} <br/>
                                                    days
                                                    </div>
                                                    <div className={styles.info}>
                                                        <span>Photos: {i?.count_watch_or_send_photos}</span>
                                                        <span>Videos: {i?.count_watch_or_send_video}</span>
                                                    </div>
                                                    <div className={styles.price}>
                                                    <span>$</span>{i?.price} 
                                                    </div>
                                                    {/* <div className={styles.dsc}>
                                                    Экономия 36%
                                                    </div> */}
                                                </label>
                                            </div>
                                        )
                                    } else {    
                                        return (
                                            <div 
                                                onClick={() => onSelect({value: i?.id, type: 'subscription'})}
                                                className={styles.item} key={i?.id}>
                                                <input type="radio" checked={i?.id == selected?.value && selected?.type == 'subscription'}/>
                                                <label className={styles.label} htmlFor="">
                                                    <div className={styles.value}>
                                                    {_.round(i?.duration / 1440, 2)} <br/>
                                                    days
                                                    </div>
                                                    <div className={styles.info}>
                                                        <span>Photos: {i?.count_watch_or_send_photos}</span>
                                                        <span>Videos: {i?.count_watch_or_send_video}</span>
                                                    </div>
                                                    <div className={styles.price}>
                                                    <span>$</span>{i?.price} 
                                                    </div>
                                                    {/* <div className={styles.dsc}>
                                                    Экономия 36%
                                                    </div> */}
                                                </label>
                                            </div>
                                        )
                                    }
                                    
                                })
                            )
                        }
                    </div>
                </div>
                <div className={styles.action}>
                    <Button
                        load={load && selected?.type === 'subscription'}
                        variant={'default'}
                        onClick={onAccept}
                        fill
                        disabled={selected?.type !== 'subscription'}
                        text={'Buy Premium'}
                        />
                </div>
            </div>
        </div>
    )
}


export default CardAdv;