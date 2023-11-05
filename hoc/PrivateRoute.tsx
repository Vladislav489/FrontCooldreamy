import { FC, ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useTypesRedux";
import { deauthorize } from "@/helpers/authApi";
import { useAppDispatch } from "@/hooks/useTypesRedux";
import { updateToken, updateUserId, updateSocket, updateUserData } from "@/store/actions";
import Router, { useRouter } from "next/router";
import { useWindowSize } from "usehooks-ts";
import ApiService from "@/service/apiService";
import LOCAL_STORAGE from "@/helpers/localStorage";

const service = new ApiService()

const PrivateRoute:FC<{children?: ReactNode}> = ({
  children
}) => {
  const dispatch = useAppDispatch()
  const {width} = useWindowSize()
  const {pathname} = useRouter()
  const {token} = useAppSelector(s => s)
  const [auth, setAuth] = useState<'SUCCESS' | 'ND' | 'ERROR'>('ND')

  useEffect(() => {
    if(token === null) {
      setAuth('ERROR')
    }
    if(token) {
      setAuth('SUCCESS')
    }
  }, [token])

  useEffect(() => {
    if(auth === 'ERROR') {
      dispatch(updateToken(null))
      dispatch(updateUserId(null))
      dispatch(updateSocket(null))
      dispatch(updateUserData(null))
      deauthorize()

      const subid = Router?.router?.query?.subid
      const af_id = Router?.router?.query?.af_id
      const app_name = Router?.router?.query?.app_name

      const verifyToken = Router?.router?.query?.token
      const userId = Router?.router?.query?.user_id

      console.log('VERIFY TOKEN:', verifyToken)
      console.log('USER_ID:', userId)

      if(verifyToken && userId) {
        service.authAfterVerify({token: verifyToken, user_id: userId}).then(res => {
          if(res?.token) {
            LOCAL_STORAGE?.setItem('cooldate-web-token', res?.token)
            LOCAL_STORAGE?.setItem('cooldate-web-user-id', res?.id)
            dispatch(updateToken(res?.token))
            dispatch(updateUserId(res?.id))

            if(pathname === '/start' || pathname === '/' || pathname === '/signup') {
              if(width <= 768) Router.push('/feed')
              if(width > 768) Router.push('/search')
            }
          }
        })
      }

      if(subid && !af_id && app_name) {
        Router.push(`/start?subid=${subid}&af_id=${af_id}&app_name=${app_name}`)
      } else if (subid && af_id && app_name) {  
        Router.push(`/start?subid=${subid}&app_name=${app_name}&af_id=${af_id}`)
      } else {
        if(pathname !== '/login' && !userId && !verifyToken) {
          Router.push('/start')
        }
      } 
    }

    if(auth === 'SUCCESS') {
      if(pathname === '/start' || pathname === '/' || pathname === '/signup') {
        if(width <= 768) Router.push('/feed')
        if(width > 768) Router.push('/search')
      }
    }

  }, [auth, pathname])

  if(auth === 'SUCCESS' && !(pathname === '/start' || pathname === '/' || pathname === '/signup')) return <>{children}</>
  if(auth === 'ERROR' && (pathname === '/start' || pathname === '/' || pathname === '/signup' || pathname === '/login')) return <>{children}</>
  return null
}

export default PrivateRoute;