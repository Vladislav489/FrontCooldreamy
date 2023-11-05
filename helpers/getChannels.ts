import Pusher from 'pusher-js';
import Echo from 'laravel-echo';


export type pusherConfigType = {
    key: string,
    cluster: string,
    authEndpoint: string,
    wsHost: string,
    encrypted: boolean,
    forceTLS: boolean,
    wsPort: number,
    wssPort: number,
    disableStats: boolean,
    enabledTransports: any,
    auth: {
        headers: {
            Authorization: string
        }
    }
}

const getChannels = (pusherConfig: pusherConfigType) => {
    const client = new Pusher(pusherConfig.key, pusherConfig)
  
    const channels = new Echo({
      broadcaster: "pusher",
      client: client,
    })
    return channels
}

export default getChannels;