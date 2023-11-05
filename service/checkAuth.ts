import { deauthorize } from "@/helpers/authApi";
const checkAuth = (res: any) => {
    if(res?.status === 401) {
        deauthorize()
        process?.browser && window.location.replace('/start')
    } else {
        return res?.json()
    } 
}
export default checkAuth;