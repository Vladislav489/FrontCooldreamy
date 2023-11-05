import styles from './FaqItem.module.scss';
import {motion, AnimatePresence} from 'framer-motion';
import { FC } from 'react';
import { FaqItemPropsTypes } from './types';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
import { item } from '@/helpers/variantsOrderAnim';

const FaqItem:FC<FaqItemPropsTypes> = ({
    head,
    isOpen,
    text,
    index,
    onChange
}) => {

    return (
        <motion.div variants={item} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
            <div onClick={() => {
                if(isOpen) {
                    onChange(0)
                } else {
                    onChange(index)
                }
            }} className={styles.head}>
                <div className={styles.icon}>
                    {
                        isOpen ? (
                            <AiOutlineMinus
                                color='#6862ED'
                                size={20}
                                />
                        ) : (
                            <AiOutlinePlus
                                color='#6862ED'
                                size={20}
                                />
                        )
                    }
                    
                </div>
                <div className={styles.label}>{head}</div>
            </div>
            
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div 
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                        open: { height: "auto", scale: 1 },
                        collapsed: { height: 0, scale: 0 }
                        }}
                        transition={{ type: 'tween'}}
                        className={styles.body}>
                        <div className={styles.text}>
                            <p>
                                {text}
                            </p>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
            
        </motion.div>
    )
}

export default FaqItem