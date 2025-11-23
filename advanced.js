// بحث متقدم في البيانات
class EmergencySearch {
    constructor() {
        this.doctors = [];
        this.pharmacies = [];
        this.services = [];
        this.loadData();
    }

    async loadData() {
        try {
            const [doctorsRes, pharmaciesRes, servicesRes] = await Promise.all([
                fetch('/api/doctors'),
                fetch('/api/pharmacies'),
                fetch('/api/services')
            ]);

            this.doctors = await doctorsRes.json();
            this.pharmacies = await pharmaciesRes.json();
            this.services = await servicesRes.json();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    search(query) {
        const results = {
            doctors: this.doctors.filter(d => 
                d.name.includes(query) || d.specialty.includes(query) || d.location.includes(query)
            ),
            pharmacies: this.pharmacies.filter(p =>
                p.name.includes(query) || p.location.includes(query)
            ),
            services: this.services.filter(s =>
                s.name.includes(query) || s.description.includes(query)
            )
        };
        return results;
    }

    filterBySpecialty(specialty) {
        return this.doctors.filter(d => d.specialty === specialty);
    }

    getNearbyLocations(lat, lng, radius = 10) {
        // دالة بسيطة لحساب المسافات
        const calculateDistance = (lat1, lng1, lat2, lng2) => {
            const R = 6371; // نصف قطر الأرض بالكيلومتر
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLng = (lng2 - lng1) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLng/2) * Math.sin(dLng/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        };

        const allLocations = [...this.doctors, ...this.pharmacies];
        return allLocations.filter(location => {
            if (!location.lat || !location.lng) return false;
            const distance = calculateDistance(lat, lng, location.lat, location.lng);
            return distance <= radius;
        });
    }
}

// نظام الإشعارات
class NotificationSystem {
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
            new Notification(title, {
                icon: '/icons/ambulance-192.png',
                badge: '/icons/badge-72.png',
                ...options
            });
        }
    }

    showEmergencyAlert(service, phone) {
        this.showNotification(`طوارئ: ${service}`, {
            body: `اتصل الآن: ${phone}`,
            requireInteraction: true,
            actions: [
                { action: 'call', title: 'اتصال فوري' },
                { action: 'dismiss', title: 'تجاهل' }
            ]
        });
    }
}

// Service Worker للتخزين المؤقت
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered: ', registration))
            .catch(registrationError => console.log('SW registration failed: ', registrationError));
    });
}

// استخدام الكلاسات
const emergencySearch = new EmergencySearch();
const notifications = new NotificationSystem();

// إضافة شريط البحث ديناميكياً
function addSearchBar() {
    const header = document.querySelector('header nav');
    const searchHTML = `
        <div class="search-container">
            <input type="text" id="globalSearch" placeholder="ابحث عن طبيب، صيدلية، أو خدمة..." />
            <button onclick="performSearch()">
                <i class="fas fa-search"></i>
            </button>
        </div>
    `;
    header.insertAdjacentHTML('beforeend', searchHTML);
}

async function performSearch() {
    const query = document.getElementById('globalSearch').value;
    if (query.length < 2) return;

    const results = await emergencySearch.search(query);
    displaySearchResults(results);
}

function displaySearchResults(results) {
    // عرض نتائج البحث في modal أو قسم مخصص
    console.log('Search results:', results);
}