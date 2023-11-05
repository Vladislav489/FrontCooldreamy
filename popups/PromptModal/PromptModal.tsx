import {Modal, ModalFuncProps, Row, Col} from 'antd';
import styles from './PromptModal.module.scss';
import {FC} from 'react';
import Button from '@/components/Button/Button';
import { useAppSelector } from '@/hooks/useTypesRedux';
interface I extends ModalFuncProps {
    text?: string,
    onReject?: (...args: any[]) => any,
    onAccept?: (...args: any[]) => any
}



const PromptModal:FC<I> = (props) => {
    const {text, onReject, onAccept, onCancel} = props;
    const {locale} = useAppSelector(s => s)
    const onClose = () => {
        onCancel && onCancel()
    }

    return (

        <Modal
            {...props}
            footer={false}
            width={600}
            onCancel={onClose}
            className={`${styles.wrapper} modal`}
            centered
            >
            <Row gutter={[50, 50]}>
                <Col span={24}>
                    <div className={styles.text}>
                        {text}
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <Row gutter={[15,15]}>
                            <Col span={12}>
                                <Button
                                    style={{width: '100%'}}
                                    text={locale?.global.yes}
                                    onClick={() => onAccept && onAccept()}
                                    />
                            </Col>
                            <Col span={12}>
                                <Button
                                    style={{width: '100%'}}
                                    variant={'danger'}
                                    text={locale?.global.no}
                                    onClick={() => onReject && onReject()}
                                    />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

        </Modal>
    )
}


export default PromptModal;