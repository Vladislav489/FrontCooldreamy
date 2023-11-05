import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";

const Notfound = () => {
    return (
        <Container>
            <MainLayout>
                <Sidebar/>
                <div style={{width: '100%'}}>
                    <h1>404 not found</h1>
                </div>
            </MainLayout>
        </Container>
    )
}

export default Notfound;