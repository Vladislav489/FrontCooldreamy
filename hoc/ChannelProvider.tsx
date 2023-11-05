import Echo from "laravel-echo"
import { ReactNode, createContext, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useTypesRedux";

type TChannels = Echo | undefined

const ChannelsContext = createContext<TChannels>(undefined)


const ChannelProvider = ({

}: {
    children?: ReactNode,
}) => {
    const {token, userId} = useAppSelector(s => s)
    const [channels, setChannels] = useState<TChannels>(undefined)

    useEffect(() => {
        
    })


    return (
        <ChannelsContext.Provider value={channels}>

        </ChannelsContext.Provider>
    )
}

export default ChannelProvider;