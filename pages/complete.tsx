import Body from "@/pageModules/complete/components/Body/Body";
import PrivateRoute from "@/hoc/PrivateRoute";
import { useAppSelector } from "@/hooks/useTypesRedux";
import { useEffect } from "react";
import Router from "next/router";

const CompletePage = () => {
  const {userData} = useAppSelector(s => s)

  useEffect(() => {
    if(userData?.prompt_career_id) Router.back()
  }, [userData?.prompt_career_id])

  return (
    <PrivateRoute>
      <Body/>
    </PrivateRoute>
  )
}

export default CompletePage;