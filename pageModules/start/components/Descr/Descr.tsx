import styles from './Descr.module.scss';
import { FC } from 'react';
import Container from '@/components/Container/Container';
import img from '@/public/assets/images/descr-img.png';
import Image from 'next/image';
import {Row, Col} from 'antd';
import {motion} from 'framer-motion';
import { item } from '@/helpers/variantsOrderAnim';
import { useAppSelector } from '@/hooks/useTypesRedux';
import parse from 'html-react-parser';

const Descr:FC = () => {
    const {locale} = useAppSelector(s => s)


    return (
        <div className={styles.wrapper}>
            <Container>
                <motion.div 
                    variants={{
                        hidden: { opacity: 1},
                        visible: {
                        opacity: 1,
                        transition: {
                            delayChildren: 1,
                            staggerChildren: 0.1,
                        }
                        }

                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                    className={styles.inner}>
                    <div className={styles.content}>
                        <Col span={24}>
                            <Row gutter={[25, 25]}>
                                <Col span={24}>
                                    <motion.h2 variants={item} className="block-title">{locale?.startPage?.start_what_title}</motion.h2>
                                </Col>
                                <Col span={24}>
                                    <motion.div variants={item} className={styles.text}>
                                        {parse(locale?.startPage?.start_what_text)}
                                    </motion.div>
                                </Col>
                                <Col span={24}>
                                    <motion.div variants={item} className={styles.ex}>
                                        {locale?.startPage?.start_what_ex}
                                    </motion.div>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                    <motion.div variants={item} className={styles.img}>
                        <div className={styles.el}>
                            <Image 
                                placeholder={'blur'}
                                src={img} 
                                alt="dating"/>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </div>
    )
}

export default Descr;