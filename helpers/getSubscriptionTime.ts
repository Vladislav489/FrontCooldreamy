


export const getSubscriptionTime = (minutes: number): string => {
    if (minutes > 0 && minutes < 60) return `${minutes} minutes`
    if (minutes >= 60 && minutes < 1440) return `${Math.floor(minutes / 60)} hour ${getSubscriptionTime(minutes % 60)}`
    if (minutes >= 1440) return `${Math.floor(minutes / 60 / 24)} days ${getSubscriptionTime(minutes % 1440)}`
    return '';
}