import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Main from "@/pageModules/pay_success/components/Main/Main";
import PrivateRoute from "@/hoc/PrivateRoute";
const PaySuccess = () => {
    return (
        <PrivateRoute>
            <Container>
            <MainLayout>
                <div style={{width: '100%'}}>
                    <Main/>
                </div>
            </MainLayout>
        </Container>
        </PrivateRoute>
    )
}

export default PaySuccess;