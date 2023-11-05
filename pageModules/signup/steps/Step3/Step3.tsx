import { FC } from 'react';
import styles from './Step3.module.scss';
import {motion} from 'framer-motion';
import SelectCard from '@/components/SelectCard/SelectCard';
import { IPromptSelect } from '../../types';
import { useAppSelector } from '@/hooks/useTypesRedux';
import {useState, useEffect} from 'react';

const Step3:FC<IPromptSelect> = ({
    list,
    selectedList,
    setSelectedList
}) => {
    const {locale} = useAppSelector(s => s)
    const [error, setError] = useState(false)

    useEffect(() => {
        if(selectedList && selectedList?.length >= 5) {
            setError(true)
        } else {
            setError(false)
        }
    }, [selectedList])


    return (
        <motion.div 
            initial={{
                y: '20px',
                scale: 0.8,
                opacity: 0
            }}
            animate={{
                y: 0,
                scale: 1,
                opacity: 1
            }}
            transition={{type: 'spring', stiffness: 400, damping: 17 }}
            className={styles.wrapper}>
            
            <h3 className={styles.head}>
                {locale?.signupPage.steps.step_3.title}
            </h3>
            <div className={`${styles.count} ${error ? styles.error : ''}`}>Selected: {selectedList ? selectedList?.length : 0}/5</div>
            <div className={styles.list}>
                {
                    list?.map((item,index) => (
                        <div className={styles.item} key={index}>
                            <SelectCard
                                disabled={!selectedList?.find(i => Number(i) === Number(item.id)) && selectedList?.length === 5}
                                image={item?.icon}
                                label={item.text}
                                value={item.id.toString()}
                                onSelect={() => {
                                    if(selectedList?.find(i => Number(i) === Number(item.id))) {
                                        setSelectedList((s:any[]) => {
                                            const r = s;
                                            const rm = s.splice(r.findIndex(r => Number(r) === Number(item.id)), 1)
                                            return [...r]
                                        })
                                    } else {
                                        if(selectedList && selectedList?.length < 5) {
                                            setSelectedList((s: any[]) => [...s, Number(item.id)])
                                        }
                                    }
                                }}
                                isSelect={selectedList?.find(i => Number(i) === Number(item.id)) ? true : false}
                            />
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default Step3;