import Hero from "@/pageModules/start/components/Hero/Hero";
import Steps from "@/pageModules/start/components/Steps/Steps";
import Descr from "@/pageModules/start/components/Descr/Descr";
import Adv from "@/pageModules/start/components/Adv/Adv";
import Last from "@/pageModules/start/components/Last/Last";
import Faq from "@/pageModules/start/components/Faq/Faq";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useWindowSize } from "usehooks-ts";
import { useAppSelector } from "@/hooks/useTypesRedux";
import Head from "next/head";
import Header from "@/components/Header/Header";
import Find from "@/pageModules/start/components/Find/Find";
import PrivateRoute from "@/hoc/PrivateRoute";
import TopBtn from "@/components/TopBtn/TopBtn";


const StartPage: React.FC = () => {
    const {width} = useWindowSize()
    const {token} = useAppSelector(s => s)

    return (
        <PrivateRoute>
            <Header/>
            {
                token && width <= 768 ? (
                    <Sidebar/>
                ) : null
            }
            <Hero/>
            {
                width > 768 && (
                    <>
                        <Steps/>
                        <Descr/>
                        <Find/>
                        <Adv/>
                        <Last/>
                        <Faq/>
                        <TopBtn/>
                    </>
                )
            }
        </PrivateRoute>
    )
}

export default StartPage;