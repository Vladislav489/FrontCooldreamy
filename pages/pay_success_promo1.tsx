import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import { useAppSelector } from "@/hooks/useTypesRedux";
import Main from "@/pageModules/pay_success/components/Main/Main";
import ApiService from "@/service/apiService";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PrivateRoute from "@/hoc/PrivateRoute";

const service = new ApiService()

const PaySuccess = () => {
    const {token} = useAppSelector(s => s)    
    const {query} = useRouter()


    useEffect(() => {
        if(query && query?.user_promotion_id && typeof query?.user_promotion_id === 'string' && token) {
            service.activatePay(token, {user_promotion_id: query?.user_promotion_id})
        }
    }, [query, token])


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