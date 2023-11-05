import { ReactNode, useEffect } from "react";
import Router from "next/router";
import { useRouter } from "next/router";


const UnvWrapper = ({children}: {children:ReactNode}) => {
    const {pathname, asPath, push} = useRouter()
    useEffect(() => {
        if(pathname !== '/unavailable' && pathname !== '/') {
            push('/unavailable')
        }
    }, [pathname, push])

    if(pathname === '/unavailable') {
        return <>{children}</>
    }
    return null
}

export default UnvWrapper