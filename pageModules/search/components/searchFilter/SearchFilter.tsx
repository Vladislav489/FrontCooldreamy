import styles from './SearchFilter.module.scss';
import SelectDef from '@/components/SelectDef/SelectDef';
import Button from '@/components/Button/Button';
import {VscSettings} from 'react-icons/vsc';
import { useState } from 'react';
import { Row, Col } from 'antd';
import RangeSlider from '@/components/RangeSlider/RangeSlider';
import {FC, useEffect} from 'react';
import { searchFilterType } from './types';
import { useWindowSize } from 'usehooks-ts';
import { useAppSelector } from '@/hooks/useTypesRedux';
import LimitModal from '@/popups/LimitModal/LimitModal';
import PremModal from '@/popups/PremModal/PremModal';




const SearchFilter:FC<searchFilterType> = ({
    targetList, 
    financeList,
    age_range_start,
    age_range_end,
    prompt_target_id,
    prompt_finance_state_id,
    
    setage_range_start,
    setage_range_end,
    setprompt_target_id,
    setprompt_finance_state_id,

    onSearch,
    load,


    countries,
    country,
    setCountry,

    states,
    state,
    setState,
    clearStates,

    clearFilter,
    onToggleDrawer,

    setCurrentPage
}) => {

    const [showAll, setShowAll] = useState<boolean>(false);
    const {width} = useWindowSize()
    const {locale, userData, premiumData} = useAppSelector(s => s)
    const [limitModal, setLimitModal] = useState(false)
    
    const toggleFilter = () => {
        setShowAll(s => !s)
    }

    useEffect(() => {
        if(width <= 768) setShowAll(false)
    }, [width])
    
    const [localRange, setLocalRange] = useState<[number, number]>([18,70])

    useEffect(() => {
        if(age_range_end && age_range_start) {
            setLocalRange([age_range_start, age_range_end])
        }
    }, [age_range_start, age_range_end])



    return (
        <div className={styles.wrapper}>
            <PremModal
                open={limitModal}
                onCancel={() => setLimitModal(false)}
                />
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.main}>
                        <div className={styles.list}>
                            <div className={styles.item}>
                                <RangeSlider
                                    style={{width: 140}}
                                    min={18}
                                    max={70}
                                    // onChange={e => {
                                    //     setage_range_start && setage_range_start(e[0])
                                    //     setage_range_end && setage_range_end(e[1])
                                    // }}
                                    onChange={e => {
                                        setLocalRange([e[0], e[1]])
                                    }}
                                    onAfterChange={e => {
                                        setage_range_start && setage_range_start(e[0])
                                        setage_range_end && setage_range_end(e[1])
                                    }}
                                    range={true}
                                    // value={[age_range_start,age_range_end]}    
                                    value={[localRange[0], localRange[1]]}
                                    label={locale?.searchPage.filter.list.filter_age.label}
                                    />
                            </div>
                            <div className={styles.item}>
                                <SelectDef
                                    label={locale?.searchPage.filter.list.filter_country.label}
                                    width={230}
                                    placeholder={locale?.searchPage.filter.list.filter_country.placeholder ?? ''}
                                    onChange={(e,v) => {
                                        setCountry(v)
                                    }}
                                    onClear={() => {
                                        clearStates()
                                        setState(null)
                                    }}
                                    value={country?.value}
                                    // list={countries}
                                    list={countries}
                                    />
                            </div>
                            {
                                states?.length > 0 && (
                                    <div className={styles.item}>
                                        <SelectDef
                                            label={locale?.searchPage.filter.list.filter_state.label}
                                            width={230}
                                            onChange={(e, v) => {
                                                setState(v)
                                            }}
                                            placeholder={locale?.searchPage.filter.list.filter_state.placeholder ?? ''}
                                            list={states}
                                            onClear={() => {
                                                setState('')
                                            }}
                                            value={state?.value || null}
                                            />
                                    </div>
                                   
                                )
                            }
                            <div className={styles.item}>
                                <SelectDef
                                    list={targetList}
                                    onChange={(e, v) => {
                                        if(premiumData?.is_premium === true) {
                                            setprompt_target_id && setprompt_target_id(e)
                                        } else {
                                            setLimitModal(true)
                                        }
                                    }}
                                    placeholder={'Not specified'}
                                    label={locale?.searchPage.filter.list.filter_target.label}
                                    width={230}
                                    multiple
                                    value={prompt_target_id}
                                    customIcon={true}
                                    />
                            </div>
                            <div className={styles.item}>
                                <SelectDef
                                    list={financeList}
                                    onChange={(e, v) => {
                                        if(premiumData?.is_premium === true) {
                                            setprompt_finance_state_id && setprompt_finance_state_id(e)
                                        } else {
                                            setLimitModal(true)
                                        }
                                     
                                    }}
                                    placeholder={'Not specified'}
                                    label={locale?.searchPage.filter.list.filter_finance.label}
                                    width={230}
                                    multiple
                                    value={prompt_finance_state_id}
                                    customIcon={true}
                                    />  
                            </div>
                        </div>
                        <div className={styles.action}>
                            {
                                width <= 768 && (
                                    <div className={styles.action_item}>
                                        <Button
                                            before={<VscSettings/>}
                                            variant={'simple'}
                                            text={locale?.searchPage.filter.action.mobile_filter_btn ?? ''}
                                            style={{padding: '8px 35px', fontSize: '18px', lineHeight: '27px', boxShadow: 'none !important'}}
                                            onClick={onToggleDrawer}
                                            />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                {
                    showAll && (
                        <Col span={24}>
                            <div
                                className={styles.ex}>
                                <div className={styles.list}>
                                    
                                </div>
                            </div>
                        </Col>
                    )
                }
            </Row>
            
            
        </div>
    )
}

export default SearchFilter;