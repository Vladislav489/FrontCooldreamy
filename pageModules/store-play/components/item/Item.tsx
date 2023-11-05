import Image from 'next/image';
import styles from './Item.module.scss';

import { FC } from 'react'

export interface ListItem {
  img?: any,
  name?: string,
  size?: number
}

const Item:FC<ListItem> = ({
  img,
  name,
  size
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.img}>
        <Image
          src={img}
          placeholder='blur'
          alt=''
          />
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.size}>{size} MB</div>
    </div>
  )
}

export default Item;