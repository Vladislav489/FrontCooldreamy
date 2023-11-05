export type tabsPropsType = {
    onChange: (...args: any[]) => any,
    list: tabItemType[] | any[],
    activeItem?: number | string,
    style?: React.CSSProperties,
    activeColor?: string,
    defaultColor?: string,
    tabItemStyle?: React.CSSProperties
}


export type tabItemType = {
    id: number | string,
    badge?: number,
    label: string,
}