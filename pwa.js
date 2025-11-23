// pwa.js - Progressive Web App Features
class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        // إعداد Service Worker
        this.registerServiceWorker();
        
        // إعداد Install Prompt
        this.setupInstallPrompt();
        
        // إضافة زر التثبيت
        this.addInstallButton();
        
        // تتبع الإحصائيات
        this.trackStatistics();
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }
    }

    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });
    }

    addInstallButton() {
        const installBtn = `
            <div id="installButton" style="display: none; position: fixed; bottom: 80px; left: 20px; z-index: 1000;">
                <button onclick="pwaInstaller.installApp()" 
                        style="background: #4caf50; color: white; border: none; padding: 12px 20px; border-radius: 50px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                    <i class="fas fa-download" style="margin-left: 8px;"></i>
                    تثبيت التطبيق
                </button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', installBtn);
    }

    showInstallButton() {
        const installBtn = document.getElementById('installButton');
        if (installBtn) {
            installBtn.style.display = 'block';
        }
    }

    async installApp() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                this.showNotification('تم تثبيت التطبيق بنجاح!', 'success');
                document.getElementById('installButton').style.display = 'none';
            }
            
            this.deferredPrompt = null;
        }
    }

    trackStatistics() {
        // تتبع عدد الزيارات
        let visitCount = parseInt(localStorage.getItem('visitCount') || '0');
        visitCount++;
        localStorage.setItem('visitCount', visitCount.toString());

        // تتبع الاتصالات
        document.addEventListener('click', (e) => {
            if (e.target.closest('a[href^="tel:"]')) {
                let callCount = parseInt(localStorage.getItem('callCount') || '0');
                callCount++;
                localStorage.setItem('callCount', callCount.toString());
            }
        });
    }

    showNotification(message, type) {
        // نفس دالة الإشعارات السابقة
    }
}

const pwaInstaller = new PWAInstaller();