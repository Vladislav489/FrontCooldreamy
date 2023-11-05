import { selectOptionType } from "@/components/SelectDef/types"

export type searchFilterType = {
    load?: boolean,
    targetList: any[],
    financeList: any[],
    age_range_start: number,
    setage_range_start?: (...args: any[]) => any,
    age_range_end: number,
    setage_range_end?: (...args: any[]) => any,
    prompt_target_id?: any[],
    setprompt_target_id?: (...args: any[]) => any,
    prompt_finance_state_id?: any[],
    setprompt_finance_state_id?: (...args: any[]) => any,
    onSearch?: (...args: any[]) => any,


    countries: selectOptionType[],
    setCountry: (...args: any[]) => any, 
    country?: {label: string, value: string, id: string} | null


    states: selectOptionType[],
    clearStates: (...args: any[]) => any
    setState: (...args: any[]) => any,
    state?: {label: string, value: string, id: string} | null,
    clearFilter: (...args: any[]) => any,


    onToggleDrawer: (...args: any[]) => any,

    setCurrentPage?: (...args: any[]) => any
}