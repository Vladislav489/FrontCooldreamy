import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";

// const nonSecureWindow:any = window.navigator

const useCheckDevice = () => {
  const {width} = useWindowSize()
  const [userMedia, setUserMedia] = useState<'MOBILE' | 'DESKTOP' | 'PWA' | null>(null)
  const [isPwa, setIsPwa] = useState<boolean | null>(null)

  // const isInStandaloneMode = () =>(window.matchMedia('(display-mode: standalone)').matches) || (nonSecureWindow.standalone) || document.referrer.includes('android-app://');


  useEffect(() => {
    if(width !== 0) {
      if(width  <= 768) setUserMedia('MOBILE')
      if(width > 768) setUserMedia('DESKTOP')
      // setIsPwa(isInStandaloneMode())
    }
  }, [width])
  return {
    userMedia,
    isPwa
  }
}

export default useCheckDevice;