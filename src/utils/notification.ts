import { LocalNotifications } from '@capacitor/local-notifications';
import { getNextNotificationTime } from './date';

export const scheduleDailyNotification = async (targetHour: number) => {
    const perm = await LocalNotifications.requestPermissions();
    

    if (perm.display !== 'granted') {
        alert('알림 권한이 허용되지 않았어요');
        return;
    }

    await LocalNotifications.schedule({
    notifications: [
        {
            id: 1,
            title: '당신의 N시예요',
            body: '오늘의 조각을 남겨볼까요?',
            schedule: {
                at: getNextNotificationTime(targetHour),
                repeats: true
            }
        }
    ]
    })

}

export const getPendingNotifications = async() => {
    const pending = await LocalNotifications.getPending();
    return pending.notifications;
}

