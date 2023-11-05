import PrivateRoute from "@/hoc/PrivateRoute"
import Container from "@/components/Container/Container"
import MainLayout from "@/components/MainLayout/MainLayout"
import Main from "@/pageModules/auth/components/Main/Main"

const LoginPage = () => {
  return (
    <PrivateRoute>
      <Container>
        <MainLayout>
          <Main/>
        </MainLayout>
      </Container>
    </PrivateRoute>
  )
}

export default LoginPage;