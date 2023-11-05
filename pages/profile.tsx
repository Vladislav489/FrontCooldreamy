import Container from "@/components/Container/Container"
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import UserLayout from "@/components/UserLayout/UserLayout";
import UserCard from "@/pageModules/user/components/UserCard/UserCard";
import Button from "@/components/Button/Button";
import UserInfo from "@/pageModules/profile/components/UserInfo/UserInfo";
import { useAppSelector } from "@/hooks/useTypesRedux";
import UserCardMob from "@/pageModules/profile/components/UserCardMob/UserCardMob";
import { useWindowSize } from "usehooks-ts";
import {Row, Col} from 'antd';

import PrivateRoute from "@/hoc/PrivateRoute";
import { 
    StatusCredits, 
    StatusPremium, 
    StatusVip 
} from "@/components/donateStatus/donateStatus";
import Router from "next/router";

const Profile = () => {
    const {userData, locale} = useAppSelector(s => s)
    const {width} = useWindowSize()

    return (
        <PrivateRoute>
            <Container>
            <MainLayout>
                <Sidebar/>
                <UserLayout
                    side={
                        width <= 1000 ? (
                            <UserCardMob {...userData}/>
                        ) : (
                            <UserCard
                                {...userData}
                                >
                                <Row gutter={[10,10]}>
                                    <Col span={24}>
                                        <Button
                                            disabled
                                            text={locale?.profilePage.images.verify_btn}
                                            style={{
                                                padding: '8px 10px',
                                                fontSize: 18,
                                                lineHeight: '27px',
                                                width: '100%'
                                            }}
                                            />
                                    </Col>
                                    {
                                        userData?.prompt_careers && userData?.prompt_careers.length === 0 && (
                                            <Col span={24}>
                                                <Button
                                                    onClick={() => Router.push('/complete')}
                                                    text="Complete registration"
                                                    style={{
                                                        padding: '8px 10px',
                                                        fontSize: 18,
                                                        lineHeight: '27px',
                                                        width: '100%'
                                                    }}
                                                    hover={null}
                                                    variant={'white'}
                                                    />
                                            </Col>
                                        )
                                    }
                                    <Col span={24}>
                                        {/* VIP */}
                                        <StatusPremium/>
                                    </Col>
                                    <Col span={24}>
                                        {/* PREMIUM */}
                                        <StatusVip/>
                                    </Col>
                                    <Col span={24}>
                                        {/* CREDITS */}
                                        <StatusCredits/>
                                    </Col>
                                </Row>
                            </UserCard>
                        )
                    }
                    main={
                        <UserInfo
                            {...userData}
                            />
                    }
                    />
            </MainLayout>
        </Container>
        </PrivateRoute>
    )
}

export default Profile;