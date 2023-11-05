import styles from './Stickers.module.scss';
import {useState, useEffect, useCallback} from 'react';
import ApiService from '@/service/apiService';
import Sticker from '@/components/Sticker/Sticker';
import emojiData from '@/helpers/emojiData';
import Smile from '@/components/Smile/Smile';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useRouter } from 'next/router';

const service = new ApiService()
const tabs = [
    {value: 1, label: 'Emoji'},
    {value: 2, label: 'Stickers'},
]

const Stickers = ({
    pos,
    onSmileSelect,
    onStickerSelect,
    isOpened
}: {
    pos?: number,
    onSmileSelect?: (label: string) => any,
    onStickerSelect?: (id: number) => any
    onClose: (...args: any[]) => any,
    isOpened?: boolean
}) => {
    const {token} = useAppSelector(s => s)
    const {query} = useRouter()
    const {type} = query || null

    const [activeTab, setActiveTab] = useState<number>(1)
    const [list, setList] = useState<any[]>()

    

        
    useEffect(() => {
        if(token) {
            service.getStickers(token).then(res => {
                setList(res)
            })
        }
       
    }, [token])


    const switchTabContent = useCallback(() => {
        switch(activeTab) {
            case 1:
                return (
                    <div className={styles.body}>
                    {
                        emojiData?.map((item) => (
                            <div className={styles.item}  key={item.code}>
                                <Smile 
                                    onSelect={onSmileSelect}
                                    label={item.label}
                                    code={item.code}/>
                            </div>
                        ))
                    }
                    </div>
                )
            case 2:
                return (
                    <div className={styles.body}>
                        {
                            list?.map((item) => (
                                <div className={styles.item}  key={item.id}>
                                    <Sticker 
                                        {...item}
                                        onSelect={onStickerSelect}
                                        />
                                </div>
                            ))
                        }
                    </div>
                )
        }
    }, [activeTab, list, onSmileSelect, onStickerSelect])
    
    if(!isOpened) return null

    return (
        <div
            style={{bottom: pos}} 
            className={`${styles.wrapper}`}
            >    
            <div className={styles.in}>
                <div className={styles.tabs}>
                    {
                        tabs?.map((item ,index) => {
                            if(index === 1 && type === 'mail') {
                                return null
                            }
                            return (
                                <div 
                                onClick={() => setActiveTab(item.value)}    
                                className={`${styles.tab} ${activeTab === item.value ? styles.active : ''}`} key={item.value}>{item.label}</div>
                            )
                        })
                    }
                </div>
                {switchTabContent()}
            </div>
            
        </div>
    )
}





export default Stickers;