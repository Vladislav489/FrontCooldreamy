export type FaqItemPropsTypes = {
    head: string,
    text: string,
    isOpen: boolean,
    index: number,
    onChange: (index: number) => void
}