import StartPage from "./start";
import PrivateRoute from "@/hoc/PrivateRoute";
const HomePage = () => {
    return (
        <PrivateRoute>
            <StartPage/>
        </PrivateRoute>
    )
}

export default HomePage;