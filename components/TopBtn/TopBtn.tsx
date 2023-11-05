import IconButton from '../IconButton/IconButton';
import styles from './TopBtn.module.scss';
import  {FiChevronUp} from 'react-icons/fi';

import { FC, useEffect, useState } from 'react'

const TopBtn:FC<any> = () => {
  const [show, setShow] = useState(false)

  const checkScroll = () => {
    const main = document.documentElement.querySelector('main')
    if((main && main.scrollTop > 100) || document.documentElement.scrollTop > 100) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', checkScroll)
    document.documentElement.querySelector('main')?.addEventListener('scroll', checkScroll)

    return () => {
      document.removeEventListener('scroll', checkScroll)
      document.documentElement.querySelector('main')?.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const goToTop = () => {
    document.documentElement.scrollTo(0,0)
    document.documentElement.querySelector('main')?.scrollTo(0,0)
  }


  if(show) {
    return (
      <div className={styles.wrapper}>
        <IconButton
          onClick={goToTop}
          variant={'default'}
          icon={<FiChevronUp/>}
          />
      </div>
    )
  }

  return null
}

export default TopBtn;