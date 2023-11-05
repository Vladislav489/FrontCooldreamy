import { StaticImageData } from "next/image";

export type userCardPropsTypes = {
    children?: React.ReactNode;
    image: string | StaticImageData,
    verify?: boolean
}