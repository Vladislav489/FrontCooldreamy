import Button from '@/components/Button/Button';
import styles from './CardAdv.module.scss';
import {AiFillStar} from 'react-icons/ai'
import * as _ from 'lodash';
import {getSubscriptionTime} from "@/helpers/getSubscriptionTime";
import {useEffect} from "react";

const CardAdv = ({
    list, 
    selected, 
    onSelect, 
    onAccept, 
    load,
    onClick,
    title,
    subtitle,
    description,
    submitText
}: {
    list?: any[], 
    selected: any, 
    onSelect: any, 
    onAccept: (...args: any[]) => any, 
    load: boolean,
    onClick?: any,
    title?: string,
    subtitle?: string,
    description?: string,
    submitText?: string
}) => {

    useEffect(() => {
        console.log('list', list)
        if (list && list.length > 0) {
            console.log('work', list[0].stripe_id)
            onSelect({value: list[0]?.stripe_id, type: 'subscription'})
        }
    }, [list]);

    useEffect(() => {
        console.log('Selected', selected)
    }, [selected]);
   
    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.title}>
                    {title ?? 'Premium status'}
                </div>
                <div className={styles.icon}>
                    <div className={styles.icon_img}></div>
                </div>
                <div className={styles.body}>
                    <div className={styles.head}>
                        {
                            subtitle ?? 'Buy Premium and chat without limits'
                        }
                    </div>
                    <div className={styles.text}>
                       {
                        description ?? 'With a subscription, enjoy unlimited chat and free allowances for sending photos and videos.'
                       }
                    </div>
                    <div className={styles.list}>
                        {
                            (list && list?.length > 0) && (
                                list?.map((i, index) => {
                                    if(index === 0) {
                                        return (
                                            <div 
                                                onClick={() => onSelect({value: i?.stripe_id, type: 'subscription'})}
                                                className={styles.item} key={i?.id}>
                                                <div className={styles.onetime}><span><AiFillStar/></span>SALE</div>
                                                <input type="radio" checked={i?.stripe_id == selected?.value && selected?.type == 'subscription'}/>
                                                <label className={styles.label} htmlFor="">
                                                    <div className={styles.value}>
                                                        {getSubscriptionTime(i?.duration)}
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
                                                onClick={() => onSelect({value: i?.stripe_id, type: 'subscription'})}
                                                className={styles.item} key={i?.id}>
                                                <input type="radio" checked={i?.stripe_id == selected?.value && selected?.type == 'subscription'}/>
                                                <label className={styles.label} htmlFor="">
                                                    <div className={styles.value}>
                                                        {getSubscriptionTime(i?.duration)}
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
                        onClick={onClick ?? onAccept}
                        fill
                        disabled={selected?.type !== 'subscription'}
                        text={submitText??'Buy Premium'}
                        />
                </div>
            </div>
        </div>
    )
}


export default CardAdv;