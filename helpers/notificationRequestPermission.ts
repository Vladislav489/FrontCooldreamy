const notificationRequestPermission = (onResult: (permissionResult: NotificationPermission) => any) => {
    if(Notification.permission !== 'granted') {
        Notification.requestPermission(res => {
            onResult(res)
        })
    } else {
        onResult(Notification.permission)
    }
}
export default notificationRequestPermission;