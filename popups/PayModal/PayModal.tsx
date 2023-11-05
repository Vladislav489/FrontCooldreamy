import styles from './PayModal.module.scss';
import {Modal, ModalFuncProps} from 'antd'
import {FC} from 'react';
import { Elements } from "@stripe/react-stripe-js";
import PayForm from '@/pageModules/deposit/components/PayForm/PayForm';
import getClassNames from '@/helpers/getClassNames';

interface customProps {
  secretKey:any,
  stripePromise:any,
  plan:any
}

interface I extends ModalFuncProps {
  customProps: customProps 
}

const PayModal:FC<I> = (props) => {
  
  const {
    customProps,
    ...otherProps
  } = props

  const {
    secretKey,
    stripePromise,
    plan
  } = customProps;

  return (
    <Modal
      {...otherProps}
      width={500}
      footer={false}
      className={getClassNames([styles.wrapper, 'modal'])}
      >
      {
        secretKey && stripePromise && plan && (
          <Elements
              stripe={stripePromise}
              options={{clientSecret: secretKey, locale: 'en'}}
              >
              <PayForm secretKey={secretKey} type={plan?.type} plan={plan?.value}/>
          </Elements>
        )
      }
    </Modal>
  )
}


export default PayModal;