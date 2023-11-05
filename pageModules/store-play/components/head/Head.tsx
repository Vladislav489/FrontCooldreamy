import styles from './Head.module.scss';
import { FC, PropsWithChildren } from 'react'
import {IoMdArrowForward} from 'react-icons/io'
const Head:FC<PropsWithChildren> = ({
  children
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        {children}
      </div>
      <div className={styles.icon}>
        <IoMdArrowForward/>
      </div>
    </div>
  )
}

export default Head;