import styles from './PromoBadge.module.scss';
import { Row, Col } from 'antd';
import Button from '@/components/Button/Button';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Router from 'next/router';


const PromoBadge = () => {
    const {locale} = useAppSelector(s => s)

    return (
        <div className={styles.wrapper}>
            <Row gutter={[8, 8]}>
                <Col span={24}>
                    <div className={styles.label}>
                        {locale?.chatPage.premium.label}
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <Button
                            onClick={() => Router.push('/deposit-mb?tab=2')}
                            text={locale?.chatPage.premium.btn}
                            variant={'white'}
                            small
                            />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default PromoBadge;