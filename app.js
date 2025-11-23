// app.js - التطبيق الرئيسي
class EmergencyApp {
    constructor() {
        this.user = null;
        this.settings = {};
        this.init();
    }

    init() {
        this.loadUser();
        this.setupNavigation();
        this.loadSettings();
        this.setupServiceWorker();
    }

    loadUser() {
        this.user = JSON.parse(localStorage.getItem('user')) || {
            id: 'guest',
            name: 'زائر',
            location: 'قوص'
        };
    }

    setupNavigation() {
        // إعداد التنقل بين الصفحات
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-page]')) {
                this.loadPage(e.target.getAttribute('data-page'));
            }
        });
    }

    async loadPage(pageName) {
        try {
            const response = await fetch(`/pages/${pageName}.html`);
            const html = await response.text();
            document.getElementById('main-content').innerHTML = html;
            
            // تحميل الـJS الخاص بالصفحة
            await this.loadPageScript(pageName);
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW failed'));
        }
    }
}

const app = new EmergencyApp();