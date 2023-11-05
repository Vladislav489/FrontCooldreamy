import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import styles from '@/pageModules/footer/FooterPage.module.scss';
import {useAppSelector} from "@/hooks/useTypesRedux";
import ApiService from "@/service/apiService";
const service = new ApiService()
import {useEffect, useRef} from "react";

const PrivatePage = () => {
    const {token} = useAppSelector(s => s)
    const spanRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        service.getArticle(token , 'privacy_policy').then(res => {
            if (res) {
                if (spanRef.current) {
                    spanRef.current.innerHTML = res.text_en;
                }
            }
        })
    }, [spanRef, token]);

    return (
        <Container>
            <MainLayout>
                {/* <Sidebar/> */}
                <div className={styles.wrapper}>
                    <div className={styles.body} ref={spanRef}/>
                </div>
            </MainLayout>
        </Container>
    )
}

export default PrivatePage;