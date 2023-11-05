import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import ChatLayout from "@/pageModules/chat/components/ChatLayout/ChatLayout";
import PrivateRoute from "@/hoc/PrivateRoute";
const ChatPage = () => {
    return (
        <PrivateRoute>
        <Container>
            <MainLayout>
                <Sidebar/>
                <ChatLayout/>
            </MainLayout>
        </Container>
        </PrivateRoute>
    )
}

export default ChatPage;