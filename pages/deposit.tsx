import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from '@/pageModules/deposit/components/Main/Main';
import { useWindowSize } from "usehooks-ts";
import PrivateRoute from "@/hoc/PrivateRoute";

const DepositPage = () => {
    const {width} = useWindowSize()

    // useEffect(() => {
    //     if(width <= 768 && width !== 0) {
    //         Router.replace('/deposit-mb')
    //     }
    // }, [width])

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

export default DepositPage;