import styles from './Last.module.scss';
import { FC } from 'react';
import mainImg from '@/public/assets/images/last-img.png';
import {Row, Col} from 'antd';
import Button from '@/components/Button/Button';
import Container from '@/components/Container/Container';
import Image from 'next/image';
import {motion} from 'framer-motion';
import { container, item } from '@/helpers/variantsOrderAnim';
import { useWindowSize } from 'usehooks-ts';
import { useAppSelector } from '@/hooks/useTypesRedux';
import parse from 'html-react-parser';
import Router from 'next/router';
import img from '@/public/assets/images/start-last-img.png';
import goToTop from '@/helpers/goToTop';




const Last:FC = () => {
    const {locale} = useAppSelector(s => s)
    const {width} = useWindowSize()


    return (
        <div className={styles.wrapper}>
            <Container>
                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                    className={styles.inner}>
                    <div className={styles.content}>
                        <Col span={24}>
                            <Row gutter={[25, 25]}>
                                <Col span={24}>
                                    <motion.h2 variants={item} className="block-title">{locale?.startPage?.start_meet_title}</motion.h2>
                                </Col>
                                <Col span={24}>
                                    <motion.div variants={item} className={styles.text}>
                                        {parse(locale?.startPage?.start_meet_text)}
                                    </motion.div>
                                </Col>
                                <Col span={24}>
                                    <motion.div className={styles.action} variants={item}>
                                        <Button
                                            onClick={goToTop}
                                            middle={width <= 768}
                                            text={locale?.startPage?.start_meet_btn}
                                            />
                                    </motion.div>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                    <div className={styles.img}>
                        <div className={styles.el}>
                            <Image
                                src={img}
                                alt=''
                                />
                        </div>
                    </div>
                </motion.div>
            </Container>
            
        </div>
    )
}

export default Last;