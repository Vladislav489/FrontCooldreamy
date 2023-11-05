import styles from './Tabs.module.scss';
import { FC } from 'react'
import { Row, Col } from 'antd';
import getClassNames from '@/helpers/getClassNames';
import Router from 'next/router';

interface I {
  activeTab?: string,
  onChange: (id: string) => any
}

const Tabs:FC<I> = ({
  activeTab,
  onChange
}) => {
  return (
    <div className={styles.wrapper}>
      <button 
        onClick={() => Router.push('/deposit-mb?tab=1')}
        className={getClassNames([styles.item, styles.premium, activeTab == '1' && styles.active])}>
        <div className={styles.icon}></div>
        <div className={styles.label}>VIP</div>
      </button>
      <button 
            onClick={() => Router.push('/deposit-mb?tab=2')}
            className={getClassNames([styles.item, styles.subscribe, activeTab == '2' && styles.active])}>
            <div className={styles.icon}></div>
            <div className={styles.label}>Premium</div>
          </button>
          <button 
            onClick={() => Router.push('/deposit-mb?tab=3')}
            className={getClassNames([styles.item, styles.credits, activeTab == '3' && styles.active])}>
            <div className={styles.icon}></div>
            <div className={styles.label}>Credits</div>
          </button>
    </div>
  )
}

export default Tabs;