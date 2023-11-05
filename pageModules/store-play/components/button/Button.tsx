import getClassNames from '@/helpers/getClassNames';
import styles from './Button.module.scss';
import { FC, HTMLProps, PropsWithChildren } from 'react'

type buttonVariant = 'primary' | 'outlined'

interface I extends HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset",
  variant?: buttonVariant,
  isFill?: boolean
}

const Button:FC<PropsWithChildren<I>> = ({
  children,
  variant = 'primary',
  isFill,
  ...restProps
}) => {
  
  const setVariant = () => {
    switch(variant) {
      case 'primary':
        return styles.primary
      case 'outlined':
        return styles.outlined
      default:
        return styles.primary
    }
  }

  return (
    <button
      {...restProps}
      className={getClassNames([styles.wrapper, setVariant(), isFill && styles.fill])}
      >
      {children}
    </button>
  )
}

export default Button;