import styles from './Footer.module.scss';
import { FC } from 'react';
import Container from '../Container/Container';
import Image from 'next/image';
import logo from '@/public/assets/images/logo-big.svg';
import FooterPart from './components/FooterPart/FooterPart';
import { FooterPartPropsTypes } from './components/FooterPart/types';
import { useAppSelector } from '@/hooks/useTypesRedux';



const Footer:FC = () => {
    const {locale} = useAppSelector(s => s)

    const footerList: FooterPartPropsTypes[] = [
        // {
        //     head: locale?.global?.footer?.menu?.part_1?.title,
        //     list: [
        //         {label: locale?.global?.footer?.menu?.part_1?.list?.item_1, link: '/'},
        //         {label: locale?.global?.footer?.menu?.part_1?.list?.item_2, link: '/'},
        //     ]
        // },
        {
            head: locale?.global?.footer?.menu?.part_2?.title,
            list: [
                {label: locale?.global?.footer?.menu?.part_2?.list?.item_1, link: '/articles/payment'},
                {label: locale?.global?.footer?.menu?.part_2?.list?.item_2, link: '/articles/safety'},
            ]
        },
        {
            head: locale?.global?.footer?.menu?.part_3?.title,
            list: [
                {label: locale?.global?.footer?.menu?.part_3?.list?.item_1, link: '/articles/privacy'},
                {label: locale?.global?.footer?.menu?.part_3?.list?.item_2, link: '/articles/licence'},
                {label: locale?.global?.footer?.menu?.part_3?.list?.item_3, link: '/articles/rules'},
            ]
        }
    ]

    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.inner}>
                    <div className={styles.main}>
                        <div className={styles.logo}>
                            <Image
                                src={logo}
                                alt={'Cool Date'}
                                />
                        </div>
                        <div className={styles.body}>
                            {
                                footerList?.map((item, index) => (
                                    <div className={styles.item} key={index}>
                                        <FooterPart
                                            head={item.head}
                                            list={item.list}
                                            />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.ex}>
                        Copyright © 2022.All Rights Reserved
                    </div>
                </div>
            </Container>
        </footer>        
    )
}

export default Footer;