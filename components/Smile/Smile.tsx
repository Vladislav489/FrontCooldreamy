import styles from './Smile.module.scss';
import {FC,memo} from 'react';
import {motion} from 'framer-motion';


const SmileComponent:FC<{
    code: string,
    label: string
    onSelect?: (code: string) => void
}> = ({
    label,
    code,
    onSelect
}) => {

    const handleSelect = () => {
        onSelect && onSelect(label)
    }


    return (
        <motion.div 
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.8}}
            transition={{type: 'spring', duration: .5}}
            onClick={handleSelect} className={styles.wrapper}>
            {label}
        </motion.div>
    )
}

const Smile = memo(SmileComponent)
export default Smile;