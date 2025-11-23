// location.js
class LocationService {
    constructor() {
        this.currentLocation = null;
    }

    async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject('المتصفح لا يدعم تحديد الموقع');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.currentLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    resolve(this.currentLocation);
                },
                (error) => {
                    const errorMessages = {
                        1: 'تم رفض الإذن لتحديد الموقع',
                        2: 'تعذر الحصول على الموقع',
                        3: 'انتهت المهلة'
                    };
                    reject(errorMessages[error.code] || 'حدث خطأ غير معروف');
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                }
            );
        });
    }

    // حساب المسافة بين موقعين
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // نصف قطر الأرض بالكيلومتر
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    // الحصول على أقرب الخدمات
    async getNearestServices(services) {
        try {
            const location = await this.getCurrentLocation();
            
            return services.map(service => {
                if (service.lat && service.lng) {
                    const distance = this.calculateDistance(
                        location.lat, location.lng,
                        service.lat, service.lng
                    );
                    return { ...service, distance };
                }
                return service;
            }).sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
            
        } catch (error) {
            console.error('Error getting location:', error);
            return services;
        }
    }
}

const locationService = new LocationService();

// دالة لتحديد الموقع وعرض النتائج
async function findNearestServices() {
    const services = [
        { name: "مستشفى قوص", lat: 25.915, lng: 32.763, type: "hospital" },
        { name: "صيدلية الرجاء", lat: 25.917, lng: 32.765, type: "pharmacy" }
    ];

    const nearestServices = await locationService.getNearestServices(services);
    
    let resultsHTML = '<h3>أقرب الخدمات لك:</h3>';
    nearestServices.forEach(service => {
        resultsHTML += `
            <div style="padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 5px;">
                <strong>${service.name}</strong>
                ${service.distance ? `<br><small>على بعد ${service.distance.toFixed(1)} كم</small>` : ''}
            </div>
        `;
    });

    // عرض النتائج
    document.body.insertAdjacentHTML('beforeend', `
        <div id="locationResults" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 10000;">
            ${resultsHTML}
            <button onclick="document.getElementById('locationResults').remove()" style="margin-top: 10px; padding: 8px 15px; background: var(--accent); color: white; border: none; border-radius: 5px;">
                إغلاق
            </button>
        </div>
    `);
}