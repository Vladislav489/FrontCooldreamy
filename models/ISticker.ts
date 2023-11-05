export interface ISticker {
    category?: null,
    created_at?: string,
    credits?: null,
    id: number,
    name?: string,
    picture_url: string,
    updated_at?: string,
    onSelect?: (id: number) => void
}