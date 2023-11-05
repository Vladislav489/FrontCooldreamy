import { MotionStyle, VariantLabels, TargetAndTransition } from "framer-motion";
import { CSSProperties } from "react";

export interface iconButtonPropsType {
    icon?: React.ReactNode,
    variant?: iconButtonVariants,
    size?: number,
    onClick?: (...args: any[]) => any,
    style?: CSSProperties,
    disabled?: boolean,
    fileId?: string
    // hover?: VariantLabels | TargetAndTransition,
}

export type iconButtonVariants = 'danger' | 'default' | 'transparent' | 'bordered' | 'simple';