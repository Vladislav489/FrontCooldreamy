import styles from './FooterPart.module.scss';
import { FC } from 'react';
import Link from 'next/link';
import { FooterPartPropsTypes } from './types';
import {motion} from 'framer-motion';

import { item } from '@/helpers/variantsOrderAnim';

const FooterPart:FC<FooterPartPropsTypes> = ({
    list,
    head
}) => {
    return (
        <motion.div variants={item} className={styles.part}>
            <h3 className={styles.head}>{head}</h3>
            <ul className={styles.list}>
                {
                    list?.map((item, index) => (
                        <li className={styles.item} key={index}>
                            <Link href={item.link}>{item.label}</Link>
                        </li>
                    ))
                }
            </ul>
        </motion.div>
    )
}

export default FooterPart;