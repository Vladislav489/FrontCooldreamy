import styles from './EditModalRegion.module.scss';
import {Modal, Row, Col} from 'antd';
import {FC, useState, useEffect} from 'react';
import { IEditModal } from '../type';
import ApiService from '@/service/apiService';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import SelectDef from '@/components/SelectDef/SelectDef';
import { selectOptionType } from '@/components/SelectDef/types';
import Button from '@/components/Button/Button';
import notify from '@/helpers/notify';
import { updateUserData } from '@/store/actions';

const service = new ApiService()

interface I extends IEditModal {
    stateInit?: string
    countryInit?: string
}


const EditModalRegion:FC<I> = (props) => {
    const dispatch = useAppDispatch()
    const {onCancel, head, stateInit, countryInit} = props
    const {token, locale} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)
    const [country, setCountry] = useState<selectOptionType | null>(null)
    const [state, setState] = useState<selectOptionType>()



    const [countryList, setCountryList] = useState<selectOptionType[]>([])
    const [stateList, setStateList] = useState<selectOptionType[]>([])

    const onClose = () => {
        onCancel && onCancel()
    }


    useEffect(() => {
        service.getCountries().then(res => {
            setCountryList(res?.map((i: any) => ({value: i?.id, label: i?.title})))
        })
    }, [])

    useEffect(() => {
        if(country) {
            service.getStates(Number(country?.value)).then(res => {
                setStateList(res?.map((i: any) => ({value: i?.id, label: i?.title})))
            })
        } else {
            setStateList([])
        }
    }, [country])




    // // ** определить страну если она уже выдрана
    // useEffect(() => {
    //     if(props?.country && countryList?.length > 0) {
    //         const f = countryList.find(i => i.label === props?.country)
    //         if(f) setCountry(f)
    //     }
    // }, [props, countryList])

    // // ** определить регион если изначально выбрана страна
    // useEffect(() => {
    //     if(props?.state && stateList?.length > 0) {
    //         const f = stateList.find(i => i.label === props?.state)
    //         if(f) setState(f)
    //     } 
    // }, [props, stateList])


    useEffect(() => {
        if(!country) {
            setState(undefined)
        }
    }, [country])
    
    


    // ** получить список регионов после выбора страны
    useEffect(() => {
        if(country?.id && token) {
            service.getStates(country?.id).then(res => {
                setStateList(res?.map((i: any) => ({id: i.id, value: i.id.toString(), label: i.title})))
            })
        }
    }, [country, token])


    const onSave = () => {
        if(token) {
            setLoad(true)
            const body = {
                state: state?.label ? state?.label : null,
                country: country?.label ? country?.label : null
            }
            service.updateMyProfile(body, token).then(res => {
                
                if(res?.id) {
                    notify(locale?.global?.notifications?.success_edit_profile, 'SUCCESS')
                    dispatch(updateUserData(res))
                    onClose()
                } else {
                    notify(locale?.global?.notifications?.error_default, 'ERROR')
                }
            }).finally(() => {
                setLoad(false)
            })
        }
    }

    useEffect(() => {
        if(countryList?.length > 0 && countryInit && !country) {
            const findInitCountry = countryList?.find(i => i?.label === countryInit)
            console.log(findInitCountry)
            if(findInitCountry) {
                setCountry(findInitCountry)
            } else setCountry(null)
        }
        if(stateInit && countryList?.length > 0 && stateList?.length > 0) {
            const findInitState = stateList?.find(i => i?.label === stateInit)
            if(findInitState) {
                setState(findInitState)
            } else setState(undefined)
        }
    }, [countryList, countryInit, stateInit, stateList, country])



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
                        <Row gutter={[20,20]}>
                            <Col span={24}>
                                <SelectDef
                                    label='Select country'
                                    width={'100%'}
                                    placeholder='Country'
                                    list={countryList}
                                    value={country?.label}
                                    onChange={(e, v) => {
                                        setCountry(v)
                                    }}
                                    />
                            </Col>
                            {
                                country && stateList?.length > 0 ? (
                                    <Col span={24}>
                                        <SelectDef
                                            label='Select state'
                                            width={'100%'}
                                            placeholder='State'
                                            list={stateList}
                                            value={state?.label}
                                            onChange={(e, v) => {
                                                setState(v)
                                            }}
                                            />
                                    </Col>
                                ) : null
                            }
                        </Row>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <Row gutter={[15,15]}>
                            <Col span={12}>
                                <Button
                                    onClick={onClose}
                                    style={{width: '100%'}}
                                    text='Cancel'
                                    variant={'danger'}
                                    />
                            </Col>
                            <Col span={12}>
                                <Button
                                    // disabled={}
                                    load={load}
                                    onClick={onSave}
                                    style={{width: '100%'}}
                                    text='Save'
                                    />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}

export default EditModalRegion;