import { JsxElement } from "typescript";

export interface InputPropsTypes extends React.HTMLProps<HTMLInputElement> {
    error?: boolean | string,
    valid?: boolean,
    beforeIcon?: React.ReactNode,
    wrapperStyle?: React.CSSProperties,
    afterIcon?: React.ReactNode
}