import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/pageModules/feed/Main/Main";
import Navbar from "@/components/Navbar/Navbar";
import { useWindowSize } from "usehooks-ts";
import PrivateRoute from "@/hoc/PrivateRoute";

const FeedPage = () => {
    const {width} = useWindowSize()

    if(width <= 768) {
        return (
            <PrivateRoute>
                <Container style={{padding: 0}}>
                <MainLayout style={{padding: 0}}>
                    <Main/>
                </MainLayout>
            </Container>
            </PrivateRoute>
        )
    }

    return (
        <PrivateRoute>
            <Container>
            <MainLayout>
                <Sidebar/>
                <Navbar/>
                <Main/>
            </MainLayout>
        </Container>
        </PrivateRoute>

    )
}

export default FeedPage;