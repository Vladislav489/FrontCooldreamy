import styles from './Textarea.module.scss';
import {FC} from 'react';
import { TextareaPropsType } from './types';


const Textarea:FC<TextareaPropsType> = (props) => {

    const {height = 200, resize = false} = props;


    return (
        <textarea 
            style={{...props.style, height, resize:resize ? 'vertical' : 'none'}} 
            {...props} 
            className={styles.wrapper}/>
    )
}


export default Textarea;