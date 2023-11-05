import { useRef, useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import { ComponentOptionsType as FancyboxOptionsType } from "@fancyapps/ui/types/Fancybox/options";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import styles from './FancyboxWrapper.module.scss';


const FancyboxWrapper = (props: {
    children?: React.ReactNode,
    delegate?: string,
    options?: Partial<FancyboxOptionsType>
}) => {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current;

        const delegate = props.delegate || "[data-fancybox]";
        const options = props.options || {};

        NativeFancybox.bind(container, delegate, options);

        return () => {
        NativeFancybox.unbind(container);
        NativeFancybox.close();
        };
    }, [])

    return <div className={styles.wrapper} ref={containerRef}>{props.children}</div>;
}


export default FancyboxWrapper;


