import Button from '@/components/Button/Button';
import styles from './CardPremium.module.scss';
import {AiFillStar} from 'react-icons/ai'
import * as _ from 'lodash'
import { useEffect, useState } from 'react';


interface I {
    list?: any[],
    selected: any,
    onSelect: any,
    onAccept: (...args: any[]) => any,
    load: boolean
}


const CardPremium = ({
    list,
    selected,
    onSelect,

    load,
    onAccept
}: I) => {  
    


    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.title}>VIP Status</div>
                <div className={styles.icon}><div className={styles.icon_img}></div></div>
                <div className={styles.body}>
                    <div className={styles.head}>Unlock all site features:</div>
                    <div className={styles.text}>
                    <ul>
                        <li>Unique avatar badge.</li>
                        <li>Advanced search filter.</li>
                        <li>View profiles that added you to favorites.</li>
                        <li>See profiles that liked you back.</li>
                    </ul>
                    </div>
                    <div className={styles.pricing}>
                        {
                            (list && list?.length > 0) && (
                                list?.map((i:any, index: number) => {
                                    if(index === 0) {
                                        return (
                                            <div 
                                                onClick={() => onSelect({value: i?.id, type: 'premium'})}
                                                className={styles.item} key={i?.id}>
                                                {list?.find(i => i.one_time === 1) && <div className={styles.onetime}><span><AiFillStar/></span>SALE</div>}
                                                <input type="radio" checked={selected?.value == i?.id && selected?.type == 'premium'}/>
                                                <label className={styles.label}>
                                                    <div className={styles.date}>
                                                        <span>
                                                            {i?.duration === 4 && i?.duration / 4}
                                                            {i?.duration < 4 && i?.duration}
                                                            {i?.duration > 4 && i?.duration / 4}
                                                        </span>
                                                        {i?.duration === 4 && 'month'}
                                                        {i?.duration > 4 && 'months'}
                                                        {(i?.duration < 4 && i?.duration > 1) && 'weeks'}
                                                        {(i?.duration === 1) && 'week'}
                                                    </div>
                                                    <div className={styles.price}><span>$</span>{i?.price}</div>
                                                </label>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div 
                                                onClick={() => onSelect({value: i?.id, type: 'premium'})}
                                                className={styles.item} key={i?.id}>
                                                <input type="radio" checked={selected?.value == i?.id && selected?.type == 'premium'}/>
                                                <label className={styles.label}>
                                                    <div className={styles.date}>
                                                        <span>
                                                            {i?.duration === 4 && i?.duration / 4}
                                                            {i?.duration < 4 && i?.duration}
                                                            {i?.duration > 4 && i?.duration / 4}
                                                        </span>
                                                        {i?.duration === 4 && 'month'}
                                                        {i?.duration > 4 && 'months'}
                                                        {(i?.duration < 4 && i?.duration > 1) && 'weeks'}
                                                        {(i?.duration === 1) && 'week'}
                                                    </div>
                                                    <div className={styles.price}><span>$</span>{i?.price}</div>
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
                        variant={'gold'}
                        text='Buy VIP'
                        load={load && selected?.type === 'premium'}
                        onClick={onAccept}
                        disabled={selected?.type !== 'premium'}
                        fill
                        />
                </div>
            </div>
        </div>
    )
}


export default CardPremium;