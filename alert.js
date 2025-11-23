// alert.js - نظام التنبيهات والإشعارات
class AlertSystem {
    constructor() {
        this.notifications = [];
        this.permission = null;
        this.init();
    }

    async init() {
        await this.requestPermission();
        this.setupEmergencyAlerts();
        this.loadNotifications();
    }

    async requestPermission() {
        if ('Notification' in window) {
            this.permission = Notification.permission;
            
            if (this.permission === 'default') {
                this.permission = await Notification.requestPermission();
            }
        }
    }

    setupEmergencyAlerts() {
        // مراقبة أحداث الطوارئ
        document.addEventListener('emergency', (e) => {
            this.handleEmergency(e.detail);
        });

        // زر الطوارئ السريع
        const emergencyBtn = document.getElementById('emergency-btn');
        if (emergencyBtn) {
            emergencyBtn.addEventListener('click', () => {
                this.triggerEmergencyAlert();
            });
        }
    }

    triggerEmergencyAlert() {
        const emergencyData = {
            type: 'medical',
            location: this.getUserLocation(),
            timestamp: new Date().toISOString(),
            priority: 'high'
        };

        this.sendEmergencyNotification(emergencyData);
        this.callEmergencyServices();
        this.alertNearbyHelpers();
    }

    sendEmergencyNotification(emergency) {
        if (this.permission === 'granted') {
            const notification = new Notification('🚨 حالة طوارئ طبية', {
                body: `تم إرسال تنبيه طوارئ من موقعك الحالي`,
                icon: '/icons/ambulance.png',
                requireInteraction: true,
                actions: [
                    { action: 'call', title: 'اتصال بالإسعاف' },
                    { action: 'cancel', title: 'إلغاء' }
                ]
            });

            notification.onclick = () => {
                window.open('tel:123', '_self');
            };

            this.notifications.push(notification);
        }

        // عرض تنبيه في الصفحة
        this.showPageAlert(emergency);
    }

    showPageAlert(emergency) {
        const alertHTML = `
            <div class="emergency-alert active">
                <div class="alert-header">
                    <span class="alert-icon">🚨</span>
                    <h3>حالة طوارئ طبية</h3>
                    <button class="alert-close" onclick="this.parentElement.parentElement.remove()">✕</button>
                </div>
                <div class="alert-body">
                    <p>تم إرسال تنبيه إلى خدمات الطوارئ</p>
                    <div class="alert-actions">
                        <button onclick="alertSystem.callAmbulance()" class="btn-alert btn-call">📞 الإسعاف (123)</button>
                        <button onclick="alertSystem.callPolice()" class="btn-alert btn-police">🚓 الشرطة (122)</button>
                        <button onclick="alertSystem.shareLocation()" class="btn-alert btn-share">📍 مشاركة الموقع</button>
                    </div>
                </div>
                <div class="alert-timer">
                    <p>جاري توجيه المساعدة إليك...</p>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', alertHTML);
    }

    callAmbulance() {
        window.open('tel:123', '_self');
    }

    callPolice() {
        window.open('tel:122', '_self');
    }

    shareLocation() {
        if (navigator.share) {
            navigator.share({
                title: 'موقعي للطوارئ',
                text: 'أحتاج مساعدة عاجلة في هذا الموقع',
                url: window.location.href
            });
        } else {
            alert('مشاركة الموقع: ' + window.location.href);
        }
    }

    async callEmergencyServices() {
        // محاكاة呼叫 الخدمات الطارئة
        const services = [
            { name: 'الإسعاف', number: '123' },
            { name: 'الشرطة', number: '122' },
            { name: 'الدفاع المدني', number: '180' }
        ];

        for (const service of services) {
            await this.logEmergencyCall(service);
        }
    }

    async logEmergencyCall(service) {
        const callLog = {
            service: service.name,
            number: service.number,
            timestamp: new Date().toISOString(),
            status: 'initiated'
        };

        // حفظ سجل الاتصال
        this.saveCallLog(callLog);
        
        // محاكاة انتظار الاستجابة
        await this.delay(1000);
        
        callLog.status = 'completed';
        this.updateCallLog(callLog);
    }

    alertNearbyHelpers() {
        // تنبيه المتطوعين القريبين
        const helpers = this.findNearbyHelpers();
        helpers.forEach(helper => {
            this.sendHelperAlert(helper);
        });
    }

    findNearbyHelpers() {
        // محاكاة إيجاد متطوعين قريبين
        return [
            { name: 'متطوع 1', distance: '0.5 كم', phone: '01000000001' },
            { name: 'متطوع 2', distance: '0.8 كم', phone: '01000000002' }
        ];
    }

    sendHelperAlert(helper) {
        console.log(`تنبيه إلى ${helper.name} على بعد ${helper.distance}`);
        // في التطبيق الحقيقي، إرسال رسالة أو إشعار
    }

    // إشعارات عادية
    showNotification(title, message, type = 'info') {
        const notification = {
            id: Date.now().toString(),
            title,
            message,
            type,
            timestamp: new Date().toISOString(),
            read: false
        };

        this.notifications.unshift(notification);
        this.saveNotifications();
        this.displayNotification(notification);
    }

    displayNotification(notification) {
        const notificationHTML = `
            <div class="notification ${notification.type}" data-id="${notification.id}">
                <div class="notification-icon">
                    ${this.getNotificationIcon(notification.type)}
                </div>
                <div class="notification-content">
                    <h4>${notification.title}</h4>
                    <p>${notification.message}</p>
                    <small>${this.formatTime(notification.timestamp)}</small>
                </div>
                <button class="notification-close" onclick="alertSystem.dismissNotification('${notification.id}')">
                    ✕
                </button>
            </div>
        `;

        const container = document.getElementById('notifications-container');
        if (container) {
            container.insertAdjacentHTML('afterbegin', notificationHTML);
        }
    }

    getNotificationIcon(type) {
        const icons = {
            'info': 'ℹ️',
            'success': '✅',
            'warning': '⚠️',
            'error': '❌',
            'emergency': '🚨'
        };
        return icons[type] || '📢';
    }

    dismissNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.saveNotifications();
        
        const element = document.querySelector(`[data-id="${id}"]`);
        if (element) {
            element.remove();
        }
    }

    loadNotifications() {
        const saved = localStorage.getItem('notifications');
        if (saved) {
            this.notifications = JSON.parse(saved);
            this.displayAllNotifications();
        }
    }

    displayAllNotifications() {
        const container = document.getElementById('notifications-container');
        if (container) {
            container.innerHTML = '';
            this.notifications
                .filter(n => !n.read)
                .forEach(notification => {
                    this.displayNotification(notification);
                });
        }
    }

    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }

    saveCallLog(callLog) {
        const logs = JSON.parse(localStorage.getItem('callLogs')) || [];
        logs.push(callLog);
        localStorage.setItem('callLogs', JSON.stringify(logs));
    }

    updateCallLog(updatedLog) {
        const logs = JSON.parse(localStorage.getItem('callLogs')) || [];
        const index = logs.findIndex(log => 
            log.timestamp === updatedLog.timestamp && 
            log.service === updatedLog.service
        );
        
        if (index !== -1) {
            logs[index] = updatedLog;
            localStorage.setItem('callLogs', JSON.stringify(logs));
        }
    }

    getUserLocation() {
        // محاكاة الحصول على الموقع
        return {
            lat: 25.915,
            lng: 32.763,
            address: 'قوص المركز'
        };
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const alertSystem = new AlertSystem();

// أحداث الطوارئ المخصصة
function triggerEmergency(type, details) {
    const event = new CustomEvent('emergency', {
        detail: { type, ...details }
    });
    document.dispatchEvent(event);
}