import styles from './SubsModal.module.scss';
import { FC } from 'react'
import {Modal, ModalFuncProps, Row, Col} from 'antd'
import getClassNames from '@/helpers/getClassNames';
import Button from '@/components/Button/Button';
import { useWindowSize } from 'usehooks-ts';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { updateSubsModal } from '@/store/actions';
import Router from 'next/router';

const SubsModal:FC<ModalFuncProps> = (props) => {
  const {width} = useWindowSize()
  const dispatch = useAppDispatch()

  const onGoToStore = () => {
    Router.push('/deposit-mb')
    dispatch(updateSubsModal(false))
  }

  return (
    <Modal
      {...props}
      footer={null}
      className={getClassNames([styles.wrapper, 'modal', 'no-close-icon'])}
      >
      <div className={styles.in}>
        <Row gutter={[15,15]}>
          <Col span={24}>
            <div className={styles.title}>
            Premium Status
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.icon}></div>
          </Col>
          <Col span={24}>
            <div className={styles.label}>
              Activate Premium Status and chat without limitations!
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.text}>
              For an enhanced chatting experience, purchase Premium access and communicate without limitations. With Premium, you can also send and receive photos and videos for free.
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.action}>
              <Button
                text='Go to store'
                middle={width <= 768}
                onClick={onGoToStore}
                style={{background: 'linear-gradient(180deg, #AC6DEC 0%, #EC82FF 100%)'}}
                />
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

export default SubsModal;