import {Modal, Row, Col} from 'antd';
import {FC, useEffect, useState} from 'react';
import { IEditModal } from '../type';
import styles from './EditModalPl.module.scss';
import Button from '@/components/Button/Button';
import SelectCard from '@/components/SelectCard/SelectCard';
import { editItemT } from '@/pageModules/profile/components/UserMain/UserMain';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import notify from '@/helpers/notify';
import { updateUserData } from '@/store/actions';

const service = new ApiService()

interface I extends IEditModal {
    promptList: any[],
    activeIds?: any[],
    maxSelect?: number
}


const EditModalPl:FC<I> = (props) => {
    const {token, locale} = useAppSelector(s => s)
    const dispatch = useAppDispatch()
    const [load, setLoad] = useState(false)
    const {
        head, 
        activeIds, 
        promptList, 
        onCancel, 
        editItemType,
        maxSelect
    } = props;
    const [activeList, setActiveList] = useState<any[]>([])

    const [isUnitSelect, setIsUnitSelect] = useState(false)

    useEffect(() => {
        activeIds && activeIds?.length > 0 ? setActiveList(activeIds?.map(i => i.id)) : setActiveList([])
    }, [activeIds])


    const onClose = () => {
        setActiveList([])
        onCancel && onCancel()
    }


    useEffect(() => {
        if(editItemType === 'kids' || editItemType === 'rl' || editItemType === 'finance') {
            setIsUnitSelect(true)
        } else {
            setIsUnitSelect(false)
        }
    }, [editItemType])


    const onSave = (type: editItemT | '') => {
        if(type && token) {
            setLoad(true)
            if(type === 'target') {
                service.updateMyProfile({prompt_targets: `[${activeList?.join(',')}]`}, token).then(res => {
                    if(res?.id) {
                        notify(locale?.global?.notifications?.success_edit_profile, 'SUCCESS')
                        const {
                            credits,
                            ...other
                        } = res
                        dispatch(updateUserData({...other, free_credits: credits}))
                        onClose()
                    } else {
                        notify(locale?.global?.notifications?.error_default, 'ERROR')
                    }
                }).finally(() => {
                    setLoad(false)
                })
            }
            if(type === 'finance') {
                service.updateMyProfile({prompt_finance_states: `[${activeList?.join(',')}]`}, token).then(res => {
                    if(res?.id) {
                        notify(locale?.global?.notifications?.success_edit_profile, 'SUCCESS')
                        const {
                            credits,
                            ...other
                        } = res
                        dispatch(updateUserData({...other, free_credits: credits}))
                        onClose()
                    } else {
                        notify(locale?.global?.notifications?.error_default, 'ERROR')
                    }
                }).finally(() => {
                    setLoad(false)
                })
            }
            if(type === 'career') {
                service.updateMyProfile({prompt_careers: `[${activeList?.join(',')}]`}, token).then(res => {
                    if(res?.id) {
                        notify(locale?.global?.notifications?.success_edit_profile, 'SUCCESS')
                        const {
                            credits,
                            ...other
                        } = res
                        dispatch(updateUserData({...other, free_credits: credits}))
                        onClose()
                    } else {
                        notify(locale?.global?.notifications?.error_default, 'ERROR')
                    }
                }).finally(() => {
                    setLoad(false)
                })
            }
            if(type === 'kids') {
                service.updateMyProfile({prompt_want_kids: `[${activeList?.join(',')}]`}, token).then(res => {
                    if(res?.id) {
                        notify(locale?.global?.notifications?.success_edit_profile, 'SUCCESS')
                        const {
                            credits,
                            ...other
                        } = res
                        dispatch(updateUserData({...other, free_credits: credits}))
                        onClose()
                    } else {
                        notify(locale?.global?.notifications?.error_default, 'ERROR')
                    }
                }).finally(() => {
                    setLoad(false)
                })
            }
            if(type === 'rl') {
                service.updateMyProfile({prompt_relationships: `[${activeList?.join(',')}]`}, token).then(res => {
                    if(res?.id) {
                        notify(locale?.global?.notifications?.success_edit_profile, 'SUCCESS')
                        const {
                            credits,
                            ...other
                        } = res
                        dispatch(updateUserData({...other, free_credits: credits}))
                        onClose()
                    } else {
                        notify(locale?.global?.notifications?.error_default, 'ERROR')
                    }
                }).finally(() => {
                    setLoad(false)
                })
            }
            if(type === 'interest') {
                service.updateMyProfile({prompt_interests: `[${activeList?.join(',')}]`}, token).then(res => {
                    if(res?.id) {
                        notify(locale?.global?.notifications?.success_edit_profile, 'SUCCESS')
                        const {
                            credits,
                            ...other
                        } = res
                        dispatch(updateUserData({...other, free_credits: credits}))
                        onClose()
                    } else {
                        notify(locale?.global?.notifications?.error_default, 'ERROR')
                    }
                }).finally(() => {
                    setLoad(false)
                })
            }
        }
    }

    const onSelect = (id: any) => {
        if(maxSelect === 1) {
            if(activeList == id) {
                setActiveList([])
            } else {
                setActiveList([id])
            }
        } else {
            const find = activeList?.find(i => i == id)
            if(find) {
                setActiveList(s => s.filter(s => s != id))
            } else {
                setActiveList(s => [...s, id])
            }
        }
           
    }

    return (
        <Modal
            {...props}
            width={700}
            footer={false}
            onCancel={onClose}
            className={`modal ${styles.wrapper}`}
            >
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <h3 className={styles.head}>{head}</h3>
                </Col>
                <Col span={24}>
                    <div className={styles.body}>
                        {
                            promptList?.map((item,index) => (
                                <div className={styles.item} key={index}>
                                    <SelectCard  
                                        disabled={!(activeList?.find(i => item?.id == i)) && activeList?.length === maxSelect}  
                                        image={item?.icon}
                                        label={item?.text}
                                        value={item?.id?.toString()}
                                        onSelect={() => onSelect(item?.id)}
                                        isSelect={activeList?.find(i => item?.id == i)}
                                    />
                                   
                                </div>
                            ))
                        }
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <Row gutter={[15,15]}>
                            <Col span={12}>
                                <Button
                                    style={{width: '100%'}}
                                    text='Cancel'
                                    variant={'danger'}
                                    onClick={onClose}
                                    />
                            </Col>
                            <Col span={12}>
                                <Button
                                    load={load}
                                    disabled={activeList?.length === 0}
                                    style={{width: '100%'}}
                                    text='Save'
                                    onClick={() => onSave(editItemType)}
                                    />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}


export default EditModalPl;