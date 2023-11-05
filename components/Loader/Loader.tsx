import styles from './Loader.module.scss';
import { PulseLoader } from 'react-spinners';
import { loaderType } from './type';
import {FC} from 'react';

const Loader:FC<loaderType> = ({
    color = 'var(--violet)',
    size = 15
}) => {

    return (
        <div className={styles.wrapper}>
            <PulseLoader size={size} color={color}/>
        </div>
    )
}

export default Loader;