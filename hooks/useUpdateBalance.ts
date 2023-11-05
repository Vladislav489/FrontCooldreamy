import ApiService from "@/service/apiService"
import { useAppDispatch, useAppSelector } from "./useTypesRedux"
import { setCredits, updateUserData } from "@/store/actions"
import { setFreeCredits } from "@/store/actions"

const service = new ApiService()


const useUpdateBalance = () => {
  const dispatch = useAppDispatch()
  const {userData, token} = useAppSelector(s => s)
  
  const updateBalance = () => {
    if(token && userData) {
      service.getCredits(token).then(credits => {
        // dispatch(updateUserData({...userData, credits}))
        dispatch(setCredits(credits))
      })
      service.getMyProfile(token).then(res => {
          const {credits} = res
          dispatch(setFreeCredits(credits))
      })
    }
  }

  return updateBalance;
}

export default useUpdateBalance;