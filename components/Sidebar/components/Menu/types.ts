export type menuItemType = {
    label: string,
    root?: string,
    link: string | undefined,
    icon: React.ReactNode,
    badge: number,
    onClick: (...args: any[]) => void,
    isActive?: boolean,

}