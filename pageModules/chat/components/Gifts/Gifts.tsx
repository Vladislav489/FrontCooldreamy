import styles from './Gifts.module.scss';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import {useState, useEffect, useCallback} from 'react';
import Button from '@/components/Button/Button';
import {AiOutlineGift} from 'react-icons/ai';
import GiftMainCard from '@/components/GiftMainCard/GiftMainCard';
import {AnimatePresence} from 'framer-motion';
import { useWindowSize } from 'usehooks-ts';
import {FiChevronLeft} from 'react-icons/fi'


const service = new ApiService()




const Gifts = ({
    pb,
    onSend,
    onClose
}: {
    pb: number,
    onSend: (list: any[]) => any,
    onClose: (...args: any[]) => any
}) => {
    const {width} = useWindowSize()
    const {token, locale} = useAppSelector(s => s);
    const [list, setList] = useState<any[]>([])
    const [selected, setSelected] = useState<number[]>([])


    useEffect(() => {
        if(token) {
            service.getGifts(token).then(res => {
                setList(res)
            })
        }
    }, [token]) 


    const selectItem = (type: 'remove' | 'add', id: number) => {
        if(type === 'add') {
            setSelected(s => [...s, id])
        }
        if(type === 'remove') {
            setSelected(s => s?.filter(f => f !== id))
        }
    }


    const onSubmit = useCallback(() => {
        if(selected?.length > 0) {
            // const mod = `[${selected.join(',')}]`
            onSend(selected)
            onClose()
        }
    }, [selected, onSend])


    return (
        <div className={`${styles.wrapper}`} style={{height: `calc(100% - ${pb}px)`}}>
            <div className={styles.list}>
                <div className={styles.top}>
                    <Button
                        onClick={onClose}
                        before={<FiChevronLeft/>}
                        middle
                        variant={'simple'}
                        text={locale?.global.back_btn}
                        />
                </div>
                {
                    list?.map((item,index) => (
                        <div className={styles.item} key={index}>
                            <GiftMainCard
                                price={item?.credits}
                                onSelect={selectItem}
                                active={selected?.find(i => i === item.id) ? true : false}
                                id={item?.id}
                                label={item?.name}
                                image={item?.picture_url}
                                />
                        </div>
                    ))
                }
            </div>
            <AnimatePresence>
                {
                    selected?.length > 0 ? (
                        <div 
                            className={styles.action}>
                            <Button
                                middle={width <= 768}
                                onClick={onSubmit}
                                after={<AiOutlineGift/>}
                                text={`Buy ${selected?.length} ${selected?.length > 1 ? 'gifts' : 'gift'}`}
                            />
                        </div>  
                    ) : null
                }
            </AnimatePresence>
            
           
        </div>
    )
}

export default Gifts;