// notifications.js
class NotificationManager {
    constructor() {
        this.permission = null;
        this.init();
    }

    async init() {
        if ('Notification' in window) {
            this.permission = Notification.permission;
            
            if (this.permission === 'default') {
                this.permission = await Notification.requestPermission();
            }
        }
    }

    showNotification(title, options = {}) {
        if (this.permission === 'granted') {
            const notification = new Notification(title, {
                icon: 'https://cdn-icons-png.flaticon.com/512/2069/2069571.png',
                badge: 'https://cdn-icons-png.flaticon.com/512/2069/2069571.png',
                ...options
            });

            notification.onclick = () => {
                window.focus();
                notification.close();
            };
        }
    }

    // إشعار طوارئ
    showEmergencyAlert(serviceName, phoneNumber) {
        this.showNotification(`🚑 طوارئ ${serviceName}`, {
            body: `اتصل الآن: ${phoneNumber}`,
            requireInteraction: true,
            tag: 'emergency'
        });
    }

    // إشعار اتصال
    showCallNotification(doctorName, phone) {
        this.showNotification(`📞 اتصل بالدكتور ${doctorName}`, {
            body: `اضغط للاتصال: ${phone}`,
            actions: [
                { action: 'call', title: 'اتصال' },
                { action: 'cancel', title: 'إلغاء' }
            ]
        });
    }
}

// استخدام الإشعارات
const notificationManager = new NotificationManager();

// دالة مساعدة للاتصال
function makeCall(phoneNumber) {
    window.open(`tel:${phoneNumber}`, '_self');
    notificationManager.showNotification('جاري الاتصال...', {
        body: `الاتصال بالرقم: ${phoneNumber}`
    });
}