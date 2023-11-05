const showPush = (title: string, options?: NotificationOptions) => {
    if(Notification.permission !== 'denied') {
        navigator.serviceWorker.getRegistration('/sw.js').then(sw => {
            sw && sw?.showNotification(title, options)
        })
    }
}


export default showPush;