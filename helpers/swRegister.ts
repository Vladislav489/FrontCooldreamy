interface I {
    path: string
    onRegistered?: (sw: ServiceWorkerRegistration | null) => any,
}
const swRegister = async ({onRegistered, path}: I) => {
    if('serviceWorker' in navigator) {
        const sw = await navigator.serviceWorker.register(path)
        onRegistered && onRegistered(sw)
        return sw;
    } else {
        console.log('[SW]: not supported')
        onRegistered && onRegistered(null)
        return null
    }
}
export default swRegister;