import IFeedCard from "@/models/IFeedCard";

interface ICard extends IFeedCard {
    onLike?: (...args: any[]) => any,
    onCancel?: (...args: any[]) => any,
    index: number,
    setCanceling: (...args: any) => any
    setLiking: (...args: any) => any,
    liking: boolean,
    canceling: boolean,
}


export interface cardPropsType {
    card: ICard,
    leaveX: {id: any, x: any} | null,
    setLeaveX: (...args: any[]) => any
    active?: boolean,
    removeCard: (...args: any[]) => any,
    disable: boolean,
    setDisable: (...args:any[]) => any
}