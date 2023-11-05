import styles from './SearchBody.module.scss';
import SearchFilter from '../searchFilter/SearchFilter';
import SearchInfo from '../searchInfo/SearchInfo';
import {Row, Col} from 'antd';
import GirlCard from '@/components/GirlCard/GirlCard';
import Pagination from '@/components/Pagination/Pagination';
import { useState, useEffect,} from 'react';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { selectOptionType } from '@/components/SelectDef/types';
import SearchDrawer from '../searchDrawer/SearchDrawer';
import SkGirlCardList from '@/components/Skeleton/SkGirlCardList/SkGirlCardList';
import { IUser } from '@/models/IUser';


const service = new ApiService();


const SearchBody = () => {
    const {token, userData} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)
   
    const [currentPage, setCurrentPage] = useState(1);

    
    const [targetList, setTargetList] = useState([])
    const [financeList, setFinanceList] = useState([])

    const [state, setState] = useState<{value: string, id: string, label: string} | null | undefined>(null)
    const [country, setCountry] = useState<{value: string, id: string, label: string} | null>({value: 'All', id: 'All', label: 'All'})
    const [age_range_start, setage_range_start] = useState(18)
    const [age_range_end, setage_range_end] = useState(70)

    const [prompt_targets, setprompt_targets] = useState<number[]>([])
    const [prompt_finance_states, setprompt_finance_states] = useState<number[]>([])

    const [filter_type, setfilter_type] = useState<'all' | 'nearby' | 'online' | 'new' | ''>('')

    const [totalFound, setTotalFound] = useState(0);

    const [list, setList] = useState<IUser[]>([])

    const [countriesList, setCountriesList] = useState<selectOptionType[]>([])
    const [statesList, setStatesList] = useState<selectOptionType[]>([])

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const [isFilterChanged, setIsFilterChanged] = useState(false)

    useEffect(() => {
        if(!country) {
            setCountry({value: 'All', id: 'All', label: 'All'})
        }
    }, [country])

    useEffect(() => {
        if(!state) {
            setState(null)
        }
    }, [state])

    useEffect(() => {
        if(token) {
            service.getAllPrompts(token).then(res => {
                if(res) {
                    setFinanceList(res?.prompt_finance_states?.map((i: any) => ({...i, value: i.id, label: i.text})))
                    setTargetList(res?.prompt_targets?.map((i: any) => ({...i, value: i.id, label: i.text})))
                }
            })
        }
    }, [token])

    const getCountries = () => {
        if(token && userData?.gender) {
            service.getCountriesMod({
                gender: userData?.gender === 'female' ? 'male' : 'female'
            }).then(res => {
                setCountriesList(res?.map((i: any) => ({value: i?.id, id: i.id, label: i?.title})))
            })
        }
    }

    const getStates = (id: number) => {
        if(token && userData?.gender) {
            service.getStatesMod({
                country_id: id,
                gender: userData?.gender === 'female' ? 'male' : 'female'
            }).then(res => {
                setStatesList(res?.map((i: any) => ({value: i?.id, id: i?.id, label: i?.title})))
            })
        }
    }

    useEffect(() => {
        if(country?.id && country?.id !== 'All' && token) {
            getStates && getStates(Number(country?.id))
        }
    }, [token, country])    

    const onSearch = (initPage?: number) => {
        if(currentPage) {
            if(token && currentPage > 0 && filter_type) {
                setLoad(true)
                service.search({
                    page: initPage || currentPage,
                    filter_type: filter_type === 'all' ? undefined : filter_type, 
                    state: state?.label, 
                    country: country?.label == 'All' ? '' : country?.label, 
                    age_range_start, 
                    age_range_end,
                    prompt_targets: `[${prompt_targets?.join(',')}]`, 
                    prompt_finance_states: `[${prompt_finance_states?.join(',')}]`, 
                    per_page: 25
                }, token
                ).then(res => {
                    setTotalFound(res?.total)
                    setList(res?.data)
                }).finally(() => {
                    setLoad(false)
                    setIsFilterChanged(true)
                    setIsDrawerOpen(false)
                })
            }
        }
    }

    useEffect(() => {
        if(token && currentPage) {
            onSearch()
        }
    }, [currentPage, token])

    useEffect(() => {
        if(country !== undefined && age_range_end !== undefined && filter_type !== undefined && state !== undefined && prompt_targets !== undefined && prompt_finance_states !== undefined && token) {
            if(currentPage > 1) {
                setCurrentPage(1)
            }   
            if(currentPage === 1) {
                onSearch(1)
            } 
        }
    }, [token, country, age_range_end, age_range_start, filter_type, state, prompt_finance_states, prompt_targets])

    useEffect(() => console.log(prompt_finance_states), [prompt_finance_states])

    useEffect(() => {
        getCountries()
    }, [token, userData])

    const clearFilter = () => {
        setState(null)
        setCountry(null)
        setStatesList([])
        setage_range_start(18)
        setage_range_end(70)
        setprompt_targets([])
        setprompt_finance_states([])
    }


    


    return (    
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <SearchFilter
                        load={load}
                        targetList={targetList}
                        financeList={financeList}
                        prompt_target_id={prompt_targets}
                        prompt_finance_state_id={prompt_finance_states}
                        age_range_end={age_range_end}
                        age_range_start={age_range_start}
                        setage_range_start={setage_range_start}
                        setage_range_end={setage_range_end}
                        setprompt_target_id={setprompt_targets}
                        setprompt_finance_state_id={setprompt_finance_states}
                        onSearch={onSearch}
                        countries={countriesList}
                        country={country}
                        setCountry={setCountry}
                        states={statesList}
                        clearStates={() => setStatesList([])}
                        state={state}
                        setState={setState}
                        clearFilter={clearFilter}
                        onToggleDrawer={() => setIsDrawerOpen(s => !s)}
                        setCurrentPage={setCurrentPage}
                        />
                </Col>
                <Col span={24}>
                    <SearchInfo
                        total={totalFound}
                        filter_type={filter_type}
                        setfilter_type={setfilter_type}
                        setCurrentPage={setCurrentPage}
                        />
                </Col>
                <Col span={24}>
                    {
                        load ? (
                            <SkGirlCardList count={25}/>
                        ) : (
                            <div className={styles.body}>
                                {
                                    list?.map((item, index) => (
                                        <div
                                            className={styles.item}
                                            key={index}>
                                            <GirlCard
                                                {...item}
                                                />
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </Col>
                {
                    (list?.length > 0 && Math.ceil(totalFound / 25) >= 2) && (
                        <Col span={24}>
                            <Pagination
                                showQuickJumper={false}
                                current={currentPage}
                                total={Math.ceil(totalFound / 25)}
                                defaultPageSize={1}
                                showTitle={false}
                                onChange={e => setCurrentPage(e)}
                                />
                        </Col>
                    )
                }
            </Row>
            <SearchDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onOpen={() => setIsDrawerOpen(true)}
                load={load}
                targetList={targetList}
                financeList={financeList}
                age_range_end={age_range_end}
                age_range_start={age_range_start}
                setage_range_start={setage_range_start}
                setage_range_end={setage_range_end}
                onSearch={onSearch}
                countries={countriesList}
                country={country}
                setCountry={setCountry}
                states={statesList}
                clearStates={() => setStatesList([])}
                state={state}
                setState={setState}
                clearFilter={clearFilter}
                onToggleDrawer={() => setIsDrawerOpen(s => !s)}
                setCurrentPage={setCurrentPage}
                prompt_finance_state_id={prompt_finance_states}
                prompt_target_id={prompt_targets}
                setprompt_finance_state_id={setprompt_finance_states}
                setprompt_target_id={setprompt_targets}
                />
        </div>  
    )
}

export default SearchBody;