import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import 'swiper/css';
import '@/styles/styles.scss';
import type { AppProps } from 'next/app'
import {Provider} from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import MainWrapper from '@/components/MainWrapper/MainWrapper';
import store from '@/store/store';
import 'react-toastify/dist/ReactToastify.css';
import CheckAuth from '@/hoc/CheckAuth';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/locale/ru_RU';
import enUs from 'antd/locale/en_US'
import WcLoader from '@/components/WcLoader/WcLoader';
import { useRouter } from 'next/router';
import 'moment/locale/ru'
import moment from 'moment';
import { useWindowSize } from 'usehooks-ts';
import Navbar from '@/components/Navbar/Navbar';
import Head from 'next/head';
import notificationRequestPermission from '@/helpers/notificationRequestPermission';
import swRegister from '@/helpers/swRegister';
import Script from 'next/script';
import getClassNames from '@/helpers/getClassNames';


if(process?.browser) {
	const vh = process?.browser && window.innerHeight / 100;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter()
	const {locale} = router
	const [wc, setWc] = useState(true)
	const {width} = useWindowSize()
	const [sw, setSw] = useState<ServiceWorkerRegistration | null>(null)
	

	
	useEffect(() => {
		moment.locale(locale === 'ru' ? 'ru' : 'en')
		setWc(false)
	}, [locale])

	const routeChangeStart = (url: any) => {
		if(url === '/start' || url === '/') {
			setWc(true)
		}
	}
	const routeChangeEnd = () => {
		setWc(false)
	}
	

	// useEffect(() => {
	// 	swRegister({
	// 		path: '/sw.js',
	// 		onRegistered: (serviceWorker) => {
	// 			if(serviceWorker === null) {
	// 				//ServiceWorker not supported
	// 				return;
	// 			}
	// 			notificationRequestPermission(permissionStatus => {
	// 				if(permissionStatus === 'granted') {
						
	// 				}
	// 			})
	// 		}
	// 	})
	// }, [])
	



	// useEffect(() => {
	// 	if(router) {
	// 		router.events.on('routeChangeStart', routeChangeStart)
	// 		router.events.on('routeChangeComplete', routeChangeEnd)
	// 	}
		
	// 	return () => {
	// 		router && router?.events?.off('routeChangeStart', routeChangeStart)
	// 		router && router?.events?.off('routeChangeStart', routeChangeEnd)
	// 	}
	// },[router])


	useEffect(() => {
		if(router?.pathname === '/unavailable') {
			document.body.classList.add('unavailable')
		} else {
			document.body.classList.remove('unavailable')
		}
	}, [router])
	return (
		<Provider store={store}>
			
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
				<title>Cool Dreamy</title>
				
			</Head>
			<Script
				strategy="afterInteractive"
				id='gtm-1'
				>
				{
					`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-59CJTBH');`
				}
				</Script>
			<ConfigProvider locale={locale === 'ru' ? ruRu : enUs}>
					<MainWrapper>	
						{/* <AnimatePresence>
							{(wc && router?.pathname !== '/store-play') && <WcLoader/>}
						</AnimatePresence> */}
						<ToastContainer limit={width <= 768 ? 1 : 5}/>
						{
							(width > 768 && router?.pathname !== '/unavailable' && router?.pathname !== '/store-play') && <Header/>
						}
						<main className={getClassNames([(router?.pathname !== '/start' && router?.pathname !== '/') && 'main-wp', router?.pathname === '/store-play' && 'main-white'])} ><Component {...pageProps} /></main>
						{router?.pathname !== '/store-play' && <Navbar/>}
						{
							(width > 768 
							&& !router?.pathname?.includes('/chat') 
							&& router?.pathname !== '/unavailable' && router?.pathname !== '/store-play')
							&& <Footer/>
						}
					</MainWrapper>		
			</ConfigProvider>

		</Provider>

	)
}


export default App;