export type SelectSexPropsTypes = {
    value?: 'male' | 'female',
    shadow?: boolean,
    onSelect: (value: 'male' | 'female') => void,
    isSelf?: boolean
}



