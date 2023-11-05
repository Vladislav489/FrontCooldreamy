import styles from './List.module.scss';
import {Row, Col} from 'antd';
import GirlCard from '@/components/GirlCard/GirlCard';
import { sympGroupTypes } from './types';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const List = ({list, type, setPage, total}: {list: any[], type: sympGroupTypes, setPage?: (...args: any[]) => any, total?: number}) => {
    const {ref, inView} = useInView()
    const [loadMore, setLoadMore] = useState(false)
    

    useEffect(() => {
        list?.length === total ? setLoadMore(false) : setLoadMore(true)
    }, [list, total])

    useEffect(() => {
        setLoadMore(false)
    }, [type])



    useEffect(() => {
        if(loadMore && inView) {
            setPage && setPage((s: number) => s + 1)
            setLoadMore(false)
        }
    }, [inView, loadMore, setPage])


    return (
        <div className={styles.wrapper}>
            <Row gutter={[12,12]}>
                {
                    list && list?.map((item,index) => (
                        <Col
                            sm={8} 
                            md={6} 
                            span={12} 
                            key={index}>
                            <GirlCard
                                {...item}
                                />
                        </Col>
                    ))
                }
            </Row>
            {
                (list && list?.length > 0) && (
                    loadMore && (
                        <div ref={ref} className={styles.loader}></div>
                    ) 
                )
            }
        </div>
    )
}

export default List;