import styles from './PremModal.module.scss';
import { FC } from 'react'
import {Modal, Row, Col, ModalFuncProps} from 'antd'
import getClassNames from '@/helpers/getClassNames';
import {AiFillStar} from 'react-icons/ai';
import Button from '@/components/Button/Button';
import { useWindowSize } from 'usehooks-ts';
import Router from 'next/router';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { updatePremModal } from '@/store/actions';

const PremModal:FC<ModalFuncProps> = (props) => {
  const {width} = useWindowSize()
  const dispatch = useAppDispatch()

  const onGoToStore = () => {
    Router.push('/deposit-mb?tab=1')
    dispatch(updatePremModal(false))
  }
  
  return (
    <Modal 
      {...props}
      closeIcon={false}
      footer={null}
      className={getClassNames([styles.wrapper, 'modal no-close-icon'])}>
      <div className={styles.in}>
      <Row gutter={[15,15]}>
        <Col span={24}>
          <div className={styles.title}>
          Required: VIP Status
          </div>
        </Col>
        <Col span={24}>
          <div className={styles.icon}></div>
        </Col>
        <Col span={24}>
          <div className={styles.label}>
            Upon purchase, enjoy these benefits:
          </div>
        </Col>
        <Col span={24}>
          <ul className={styles.list}>
            <li className={styles.item}><span className={styles.star}><AiFillStar/></span> Women will see your premium status.</li>
            <li className={styles.item}><span className={styles.star}><AiFillStar/></span> Exclusive icon for your avatar.</li>
            <li className={styles.item}><span className={styles.star}><AiFillStar/></span> Full filter functionality.</li>
            <li className={styles.item}><span className={styles.star}><AiFillStar/></span> View profiles that added you to favorites.</li>
            <li className={styles.item}><span className={styles.star}><AiFillStar/></span> See who liked you back.</li>
          </ul>
        </Col>
        <Col span={24}>
          <div className={styles.action}>
            <Button
              text='Go to store'
              variant={'gold'}
              middle={width <= 768}
              onClick={onGoToStore}
              />
          </div>
        </Col>
      </Row>
      </div>
    </Modal>
  )
}

export default PremModal;