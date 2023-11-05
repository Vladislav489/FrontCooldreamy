import styles from './List.module.scss';
import { FC, ReactNode } from 'react'
import Head from '../head/Head';
import { ListItem } from '../item/Item';
import Item from '../item/Item';
const List = ({
  head,
  list
}: {
  head?: ReactNode,
  list?: ListItem[]
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <Head>
          {head}
        </Head>
      </div>
      <div className={styles.list}>
        {
          list?.map((i, index) => (
            <div key={index} className={styles.item}>
              <Item {...i}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List;