import { MotionStyle, VariantLabels, TargetAndTransition } from "framer-motion";
import { HTMLProps } from "react";


export type ButtonVariants = 'default' | 'danger' | 'simple' | 'bordered' | 'white' | 'gold' | 'green' | 'black'; 


export type ButtonPropsTypes = {
    text?: string,
    variant?: ButtonVariants,
    onClick?: React.ReactEventHandler | (() => void) | undefined;
    disabled?: boolean,
    style?: MotionStyle,
    before?: React.ReactNode | undefined,
    after?: React.ReactNode | undefined,
    hover?: VariantLabels | TargetAndTransition | null,
    fill?: boolean,
    small?: boolean,
    middle?: boolean,
    load?: boolean,
    className?: string,
    type?: 'submit' | 'reset' | 'button' | undefined
}

