import styles from './Faq.module.scss';
import { FC } from 'react';
import Container from '@/components/Container/Container';
import {motion} from 'framer-motion';
import Image from 'next/image';
import bg from '@/public/assets/images/faq-bg.png';
import { Row, Col } from 'antd';
import FaqItem from './components/FaqItem/FaqItem';
import { useState } from 'react';
import { FaqItemPropsTypes } from './components/FaqItem/types';
import { container, item } from '@/helpers/variantsOrderAnim';
import { useAppSelector } from '@/hooks/useTypesRedux';







const Faq:FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const {locale} = useAppSelector(s => s)

    const faqItems:FaqItemPropsTypes[] = [
        {head: locale?.startPage?.start_faq_list?.start_faq_item_1?.title, text: locale?.startPage?.start_faq_list?.start_faq_item_1?.text, index: 1, isOpen: false, onChange: () => {}},
        {head: locale?.startPage?.start_faq_list?.start_faq_item_2?.title, text: locale?.startPage?.start_faq_list?.start_faq_item_2?.text, index: 2, isOpen: false, onChange: () => {}},
        {head: locale?.startPage?.start_faq_list?.start_faq_item_3?.title, text: locale?.startPage?.start_faq_list?.start_faq_item_3?.text, index: 3, isOpen: false, onChange: () => {}},
    ]


    return (
        <div className={styles.wrapper}>
            <div className={styles.bg}>
                <Image
                    src={bg}
                    alt={'bg'}
                    />
            </div>
            <Container>
                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView={'visible'}
                    viewport={{once: true}}
                    className={styles.inner}>
                    <Col span={24}>
                        <Row gutter={[40,40]}>
                            <Col span={24}>
                                <motion.h2 variants={item} className='block-title'>{locale?.startPage?.start_faq_title}</motion.h2>
                            </Col>
                            <Col span={24}>
                                <div className={styles.body}>
                                    {
                                        faqItems?.map(item => (
                                            <div className={styles.item} key={item.index}>
                                                <FaqItem
                                                    onChange={setActiveIndex}
                                                    text={item.text}
                                                    head={item.head}
                                                    index={item.index}
                                                    isOpen={activeIndex == item.index}
                                                    />
                                            </div>
                                        ))
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    
                </motion.div>
            </Container>
        </div>
    )
}

export default Faq;