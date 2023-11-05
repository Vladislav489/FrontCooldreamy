import styles from './Pagination.module.scss';
import {Pagination as Pag} from 'antd';
import { PaginationProps } from 'antd';
import {FC} from 'react';

const Pagination:FC<PaginationProps> = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <Pag
                    {...props}
                    />
            </div>
        </div>
    )
}

export default Pagination;