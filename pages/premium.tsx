import MainLayout from "@/components/MainLayout/MainLayout";
import Container from "@/components/Container/Container";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/pageModules/premium/Main/Main";
import { useWindowSize } from "usehooks-ts";
import { useEffect } from "react";
import PrivateRoute from "@/hoc/PrivateRoute";
import Router from "next/router";

const PremiumPage = () => {
    const {width} = useWindowSize()

    useEffect(() => {
        if(width <= 768 && width !== 0) {
            Router.replace('/deposit-mb')
        }
    }, [width])

    return (
        <PrivateRoute>
            <Container>
            <MainLayout>
                <Sidebar/>
                <Main/>
            </MainLayout>
        </Container>
        </PrivateRoute>
    )
}

export default PremiumPage;