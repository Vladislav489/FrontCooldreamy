import { FC } from 'react';
import styles from './Step10.module.scss';
import {motion} from 'framer-motion';
import Textarea from '@/components/Textarea/Textarea';
import { useAppSelector } from '@/hooks/useTypesRedux';

interface I {
    about: string,
    setAbout: (...args: any[]) => any
}

const Step10:FC<I> = ({
    about,
    setAbout
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

            <div className={styles.head}>
                <h2 className={styles.title}>{locale?.signupPage.steps.step_10.title}</h2>
                <div className={styles.subtitle}>{locale?.signupPage.steps.step_10.text}</div>
            </div>
            <div className={styles.body}>
                <div className={styles.field}>
                    <Textarea
                        minLength={6}
                        height={100}
                        value={about}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAbout(e.target.value)}
                        placeholder={locale?.signupPage.steps.step_10.placeholder}
                        />
                </div>
                <div className={styles.ex}>{locale?.signupPage.steps.step_10.ex}</div>
            </div>
            
        </motion.div>
    )
}

export default Step10;