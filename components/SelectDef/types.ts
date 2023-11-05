export type selectOptionType = {
    value: string,
    label: string,
    id?: number
}


export type selectDefType = {
    placeholder?: string,
    list: selectOptionType[],
    value?: number | string | any,
    width?: number | string,
    label?: string,
    multiple?: boolean,
    onChange?: (...args: any[]) => any,
    onClear?: (...args: any[]) => any,
    disabled?: boolean,
    clearIcon?: boolean,
    isRound?: boolean,

    customIcon?: React.ReactNode
}