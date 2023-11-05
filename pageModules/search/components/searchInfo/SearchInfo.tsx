import styles from './SearchInfo.module.scss';
import {FC, useState, useEffect} from 'react';
import { searchInfoType } from './types';
import { tabItemPropsTypes } from '../../types';
import { useAppSelector } from '@/hooks/useTypesRedux';



const SearchInfo:FC<searchInfoType> = ({
    total,
    filter_type,
    setfilter_type,
    setCurrentPage
}) => {
    const {locale} = useAppSelector(s => s)
    const [activeId, setActiveId] = useState<string>('1');

    const tabs:tabItemPropsTypes[] = [
        {label: locale?.searchPage.filter.tabs.all, id: '1'},
        {label: locale?.searchPage.filter.tabs.near, id: '2'},
        {label: locale?.searchPage.filter.tabs.new, id: '3'},
        {label: locale?.searchPage.filter.tabs.online, id: '4'},
    ]
    
    
    useEffect(() => {
        if(activeId && setfilter_type) {
            switch(activeId) {
                case '1':
                    setfilter_type('all')
                    break;
                case '2':
                    setfilter_type('nearby')
                    break;
                case '3':
                    setfilter_type('new')
                    break;
                case '4':
                    setfilter_type('online')
                    break;
                default:
                    setfilter_type('all')
                    break;
            }
        }
    }, [activeId, setfilter_type])


    return (
        <div className={styles.wrapper}>
            <div className={styles.value}>
                
            </div>
            <div className={styles.tabs}>
                {
                    tabs?.map((item, index) => (
                        <button 
                            key={index} 
                            onClick={() => {
                                if(setCurrentPage) {
                                    // setCurrentPage(0)
                                    // setCurrentPage(1)
                                }  
                                setActiveId(item.id)
                            }}
                            className={`${styles.item} ${activeId === item.id ? styles.active : ''}`}>
                                {item.label}
                            </button>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchInfo;