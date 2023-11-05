import styles from './StepEx.module.scss';
import {motion} from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import SelectDef from '@/components/SelectDef/SelectDef';
import ApiService from '@/service/apiService';

const service = new ApiService()

const languagesList = [
    {label: 'English', value: 'en'},
    {label: 'Spanish', value: 'es'},
    {label: 'French', value: 'fr'},
    {label: 'Portuguese', value: 'pt'},
    {label: 'German', value: 'de'},
    {label: 'Russian', value: 'ru'},
    {label: 'Italian', value: 'it'},
]

interface IStepEx {
    language?: string,
    country?: any,
    state?: any,

    setLanguage?: (...args: any[]) => any
    setCountry?: (...args: any[]) => any
    setState?: (...args: any[]) => any
}

const StepEx:FC<IStepEx> = ({
    language,
    country,
    state,

    setLanguage,
    setCountry,
    setState
}) => {
    const [countryList, setCountryList] = useState<any[]>([])
    const [regionList, setRegionList] = useState<any[]>([])
    
    useEffect(() => {
        service.getCountries().then(res => {
            setCountryList(res?.map((i: any) => ({value: i?.id, label: i?.title})))
        })
    }, [])

    useEffect(() => {
        if(country) {
            service.getStates(country?.value).then(res => {
                setRegionList(res?.map((i: any) => ({value: i?.id, label: i?.title})))
            })
        } else {
            setRegionList([])
        }
    }, [country])

    return (
        <motion.div 
        initial={{
            y: '20px',
            scale: 0.8,
            opacity: 0
        }}
        animate={{
            y: 0,
            scale: 1,
            opacity: 1
        }}
        transition={{type: 'spring', stiffness: 400, damping: 17 }}
        className={styles.wrapper}>
            <Col span={24}>
                <Row gutter={[25,25]}>
                    <Col span={24}>
                        <SelectDef
                            placeholder='Language'
                            list={languagesList}
                            value={language}
                            onChange={setLanguage}
                            isRound
                            />    
                    </Col>    
                    {
                        (countryList && countryList?.length) > 0 && (
                            <Col span={24}>
                                <SelectDef
                                    onClear={() => setCountry && setCountry(null)}
                                    isRound
                                    value={country?.value}
                                    list={countryList}
                                    placeholder='Country'
                                    onChange={(e, v) => setCountry && setCountry(v)}
                                    />    
                            </Col>    
                        )
                    }
                    {
                        regionList?.length > 0 && (
                            <Col span={24}>
                                <SelectDef
                                    onClear={() => setState && setState(null)}
                                    value={state?.id}
                                    isRound
                                    placeholder='Region'
                                    list={regionList}
                                    onChange={(e,v) => setState && setState(v)}
                                    />
                            </Col>
                        )
                    }    
                </Row>    
            </Col>    
        </motion.div>
    )
}


export default StepEx;