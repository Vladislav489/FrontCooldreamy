import styles from './AdvItem.module.scss';
import { FC } from 'react';
import { AdvItemPropsTypes } from './types';
import Image from 'next/image';
import {Row, Col} from 'antd';
import {motion} from 'framer-motion';


const AdvItem: FC<AdvItemPropsTypes> = ({
    label,
    text,
    img
}) => {

    return (
        <div className={styles.item}>
            <Col span={24}>
                <Row gutter={[10,10]}>
                    <Col span={24}>
                        <div className={styles.img}>
                            <motion.div 
                                whileHover={{scale: 1.15}}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}    
                                className={styles.el}>
                                <Image src={img} alt={label}/>
                            </motion.div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <h3 className={styles.label}>{label}</h3>
                    </Col>
                    <Col span={24}>
                        <div className={styles.text}>
                            <p>
                                {text}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Col>
            
            
        </div>
    )
}

export default AdvItem;
