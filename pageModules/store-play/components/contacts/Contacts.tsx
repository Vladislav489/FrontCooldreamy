import getClassNames from '@/helpers/getClassNames';
import styles from './Contacts.module.scss';
import { FC, useRef, useState } from 'react'
import {CgChevronDown} from 'react-icons/cg';
import {BiWorld} from 'react-icons/bi';


const Contacts:FC<any> = () => {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)



  return (
    <div className={styles.wrapper}>
      <div 
        onClick={() => setIsOpen(s => !s)}
        className={getClassNames([styles.head, isOpen && styles.active])}>
        <div className={styles.label}>
          Kontakdaten des Entwicklers
        </div>
        <div className={styles.icon}>
          <CgChevronDown/>
        </div>
      </div>
      <div className={styles.body} style={{height: isOpen ? bodyRef?.current?.scrollHeight : 0}} ref={bodyRef}>
        <div className={getClassNames([styles.item])}>
          <div className={styles.icon}>
            <BiWorld/>
          </div>
          <div className={styles.body}>
            <div className={styles.label}>Website</div>
          </div>
        </div>  
        <div className={getClassNames([styles.item])}>

        </div>
        <div className={getClassNames([styles.item])}>

        </div>
        <div className={getClassNames([styles.item])}>

        </div>
      </div>
    </div>
  )
}

export default Contacts;