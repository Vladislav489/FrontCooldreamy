export type tabsPropsTypes = {
    tabs: tabItemPropsTypes[],
    activeTab?:string,
    onChange: (...args: any[]) => void
}

export type tabItemPropsTypes = {
    label?:string,
    id:string
}