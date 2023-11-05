import { FC } from 'react';
import styles from './Step7.module.scss';
import {motion} from 'framer-motion';
import SelectCard from '@/components/SelectCard/SelectCard';
import { IPromptSelect } from '../../types';
import { useAppSelector } from '@/hooks/useTypesRedux';


const Step7:FC<IPromptSelect> = ({
    list,
    selectedList,
    setSelectedList
}) => {
    const {locale} = useAppSelector(s => s)

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
                {locale?.signupPage.steps.step_7.title}
            </h3>
            <div className={styles.list}>
                {
                    list?.map((item,index) => (
                        <div className={styles.item} key={index}>
                            <SelectCard
                                image={item?.icon}
                                label={item.text}
                                value={item.id.toString()}
                                onSelect={() => {
                                    setSelectedList([item.id])
                                }}
                                isSelect={selectedList && Number(selectedList[0]) === item.id ? true : false}
                            />
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default Step7;