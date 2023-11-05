import styles from './SearchDrawer.module.scss';
import {FC, useState} from 'react'
import IconButton from '@/components/IconButton/IconButton';
import {GrClose} from 'react-icons/gr';
import {Row, Col} from 'antd';
import SelectDef from '@/components/SelectDef/SelectDef';
import Button from '@/components/Button/Button';
import { searchFilterType } from '../searchFilter/types';
import { useAppSelector } from '@/hooks/useTypesRedux';
import PremModal from '@/popups/PremModal/PremModal';
import getClassNames from '@/helpers/getClassNames';
import OutsideClickHandler from 'react-outside-click-handler';

interface I extends searchFilterType {
    isOpen: boolean,
    onClose: (...args: any[]) => any
    onOpen: (...args: any[]) => any,

    setCurrentPage?: (...args: any[]) => any
}

const SearchDrawer:FC<I> = ({
    isOpen,
    onClose,
    onOpen,

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
    const {locale, premiumData} = useAppSelector(s => s)
    const [limitModal, setLimitModal] = useState(false)

    const [targetIsOpen, setTargetIsOpen] = useState(false)
    const [financeIsOpen, setFinanceIsOpen] = useState(false)

    const onLayerClick = (e: any) => {
        if(e.target.dataset.layer === 'true') {
            onClose()
        }
    }

    return (
        <div data-layer onClick={onLayerClick} className={`${styles.wrapper} ${isOpen ? styles.active : ''}`}>
                <PremModal
                open={limitModal}
                onCancel={() => setLimitModal(false)}
                />
            <div className={styles.in}>
                <div className={styles.head}>
                    <div className={styles.title}>{locale?.searchPage?.filter?.title}</div>
                    <div className={styles.close}>
                        <IconButton
                            onClick={onClose}
                            size={15}
                            icon={<GrClose/>}
                            variant={'transparent'}
                            />
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.body}>
                        <Row gutter={[10,10]}>
                            <Col span={12}>
                                <SelectDef
                                    label={locale?.searchPage.filter.list.filter_country.label}
                                    placeholder={locale?.searchPage.filter.list.filter_country.placeholder ?? ''}
                                    onChange={(e,v) => {
                                        setCountry(v)
                                    }}
                                    onClear={() => {
                                        clearStates()
                                        setState(null)
                                    }}
                                    list={countries}
                                    value={country?.value}
                                    />
                            </Col>
                            <Col span={12}>
                                {/* {
                                    states?.length > 0 && (
                                        <div className={styles.item}>
                                            <SelectDef
                                                label={locale?.searchPage.filter.list.filter_state.label}
                                                // width={230}
                                                onChange={(e, v) => {
                                                    setState(v)
                                                }}
                                                placeholder={locale?.searchPage.filter.list.filter_state.placeholder ?? ''}
                                                list={states}
                                                onClear={() => {
                                                    setState('')
                                                }}
                                                />
                                        </div>
                                    
                                    )
                                } */}
                                <div className={getClassNames([styles.item, states?.length === 0 && styles.disabled ])}>
                                    <SelectDef
                                        label={locale?.searchPage.filter.list.filter_state.label}
                                        // width={230}
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
                            </Col>
                            <Col span={12}>
                                <OutsideClickHandler
                                    onOutsideClick={() => setTargetIsOpen(false)}
                                    >
                                    <SelectDef
                                        // disabled={premiumData?.is_premium === 1}
                                        list={targetList}
                                        onChange={(e, v) => {
                                            if(premiumData?.is_premium === true) {
                                                setprompt_target_id && setprompt_target_id(e)
                                            } else {
                                                setLimitModal(true)
                                            }
                                            setTargetIsOpen(false)
                                        }}
                                        placeholder={'Not specified'}
                                        label={locale?.searchPage.filter.list.filter_target.label}
                                        value={prompt_target_id}
                                        multiple
                                        customIcon={true}
                                        onFocus={() => setTargetIsOpen(true)}
                                        open={targetIsOpen}
                                        />
                                </OutsideClickHandler>
                            </Col>
                            <Col span={12}>
                                <OutsideClickHandler
                                    onOutsideClick={() => setFinanceIsOpen(false)}
                                    >
                                    <SelectDef
                                        list={financeList}
                                        onChange={(e, v) => {
                                            if(premiumData?.is_premium === true) {
                                                setprompt_finance_state_id && setprompt_finance_state_id(e)
                                            } else {
                                                setLimitModal(true)
                                            }
                                            setFinanceIsOpen(false)
                                        }}
                                        value={prompt_finance_state_id}
                                        placeholder={'Not specified'}
                                        label={locale?.searchPage.filter.list.filter_finance.label}
                                        // width={230}
                                        multiple
                                        customIcon={true}
                                        open={financeIsOpen}
                                        onFocus={() => setFinanceIsOpen(false)}
                                        /> 
                                </OutsideClickHandler>
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.action}>
                        <Row gutter={[10,10]}>
                            <Col span={24}>
                                <div className={styles.item}>
                                    <Button
                                        text={locale?.searchPage.filter.action.search_btn ?? ''}
                                        middle
                                        onClick={() => {
                                            setCurrentPage && setCurrentPage(0)
                                            onClose()
                                        }}
                                        load={load}
                                        />
                                </div>
                            </Col>
                            <Col span={24}>
                                <div className={styles.item}>
                                    <Button
                                        onClick={clearFilter}
                                        text={locale?.searchPage.filter.action.clear ?? ''}
                                        middle
                                        variant={'bordered'}
                                        />
                                </div>
                            </Col>
                            
                        </Row>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default SearchDrawer;


