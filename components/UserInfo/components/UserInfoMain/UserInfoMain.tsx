import styles from './UserInfoMain.module.scss';
import {FC, useEffect} from 'react';
import Badge from '@/components/Badge/Badge';
import { Row, Col } from 'antd';
import { IUser } from '@/models/IUser';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';

const service = new ApiService()

const UserInfoMain:FC<IUser> = (props) => {
    const {locale} = useAppSelector(s => s)

    const {
        about_self,
        prompt_careers,
        prompt_relationships,
        prompt_finance_states,
        prompt_targets,
        prompt_want_kids,
        prompt_interests
    } = props
    



    return (
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            {locale?.profilePage.info.about}
                        </div>
                        <div className={styles.text} style={{color: about_self ? 'var(--text)' : 'var(--red)'}}>
                        {about_self ? about_self : 'Unspecified'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Interest
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_interests?.length > 0 ? (
                                    prompt_interests?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge size={30} style={{background: 'var(--violet)'}} icon={item?.icon}/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {locale?.global?.placeholders?.nd}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
               <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            {locale?.profilePage.info.target}
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_targets?.length > 0 ? (
                                    prompt_targets?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge size={30} style={{background: 'var(--violet)'}} icon={item?.icon}/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {locale?.global?.placeholders?.nd}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            {locale?.profilePage.info.finance}
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_finance_states?.length > 0 ? (
                                    prompt_finance_states?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge size={30} style={{background: 'var(--violet)'}} icon={item?.icon}/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {locale?.global?.placeholders?.nd}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            {locale?.profilePage.info.career}
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_careers?.length > 0 ? (
                                    prompt_careers?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge size={30} style={{background: 'var(--violet)'}} icon={item?.icon}/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {locale?.global?.placeholders?.nd}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            {locale?.profilePage.info.relationship}
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_relationships?.length > 0 ? (
                                    prompt_relationships?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge size={30} style={{background: 'var(--violet)'}} icon={item?.icon}/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {locale?.global?.placeholders?.nd}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            {locale?.profilePage.info.kids}
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_want_kids?.length > 0 ? (
                                    prompt_want_kids?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge size={30} style={{background: 'var(--violet)'}} icon={item?.icon}/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {locale?.global?.placeholders?.nd}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserInfoMain;