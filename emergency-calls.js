// emergency-calls.js - نظام الاتصالات الطارئة المتقدم
class EmergencyCalls {
    constructor() {
        this.emergencyContacts = {
            // أرقام الطوارئ الرسمية
            ambulance: { number: '123', name: 'الإسعاف', icon: '🚑', color: '#e74c3c' },
            police: { number: '122', name: 'الشرطة', icon: '🚓', color: '#3498db' },
            fire: { number: '180', name: 'المطافئ', icon: '🚒', color: '#e67e22' },
            // أرقامك الشخصية للدعم
            myNumber: { number: '01153546426', name: 'أمين ناجح', icon: '👨‍💻', color: '#2ecc71' },
            myWhatsapp: { number: '01153546426', name: 'واتساب أمين', icon: '💚', color: '#25D366' }
        };
        
        this.callHistory = JSON.parse(localStorage.getItem('emergencyCalls')) || [];
        this.init();
    }

    init() {
        this.createEmergencyPanel();
        this.setupQuickDial();
        this.loadCallHistory();
    }

    createEmergencyPanel() {
        const panelHTML = `
            <div id="emergency-panel" class="emergency-panel">
                <div class="emergency-header">
                    <h3>🚨 الاتصالات الطارئة</h3>
                    <button class="panel-close">✕</button>
                </div>
                
                <div class="emergency-contacts">
                    ${Object.entries(this.emergencyContacts).map(([key, contact]) => `
                        <div class="emergency-contact" data-type="${key}">
                            <div class="contact-icon" style="background: ${contact.color}">
                                ${contact.icon}
                            </div>
                            <div class="contact-info">
                                <h4>${contact.name}</h4>
                                <span>${contact.number}</span>
                            </div>
                            <div class="contact-actions">
                                <button class="btn-call" onclick="emergencyCalls.makeCall('${contact.number}')">
                                    📞
                                </button>
                                ${key.includes('Whatsapp') ? `
                                    <button class="btn-whatsapp" onclick="emergencyCalls.openWhatsapp('${contact.number}')">
                                        💚
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="emergency-actions">
                    <button class="emergency-btn" onclick="emergencyCalls.triggerFullEmergency()">
                        🚨 طوارئ كاملة
                    </button>
                    <button class="location-btn" onclick="emergencyCalls.shareLocation()">
                        📍 مشاركة الموقع
                    </button>
                </div>

                <div class="call-history">
                    <h4>سجل الاتصالات</h4>
                    <div id="history-list"></div>
                </div>
            </div>

            <style>
                .emergency-panel {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 90%;
                    max-width: 400px;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    z-index: 10000;
                    display: none;
                }

                .emergency-panel.show {
                    display: block;
                    animation: emergencySlideIn 0.4s ease-out;
                }

                .emergency-header {
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                    color: white;
                    padding: 20px;
                    border-radius: 20px 20px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .emergency-header h3 {
                    margin: 0;
                    font-size: 1.3em;
                }

                .panel-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                }

                .emergency-contacts {
                    padding: 20px;
                    max-height: 400px;
                    overflow-y: auto;
                }

                .emergency-contact {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    margin: 10px 0;
                    background: #f8f9fa;
                    border-radius: 15px;
                    transition: all 0.3s;
                }

                .emergency-contact:hover {
                    transform: translateX(5px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }

                .contact-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    margin-left: 15px;
                }

                .contact-info {
                    flex: 1;
                }

                .contact-info h4 {
                    margin: 0 0 5px 0;
                    color: #2c3e50;
                }

                .contact-info span {
                    color: #7f8c8d;
                    font-size: 14px;
                }

                .contact-actions {
                    display: flex;
                    gap: 10px;
                }

                .contact-actions button {
                    width: 40px;
                    height: 40px;
                    border: none;
                    border-radius: 50%;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .btn-call {
                    background: #27ae60;
                    color: white;
                }

                .btn-whatsapp {
                    background: #25D366;
                    color: white;
                }

                .emergency-actions {
                    padding: 0 20px 20px;
                    display: grid;
                    gap: 10px;
                }

                .emergency-btn, .location-btn {
                    padding: 15px;
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .emergency-btn {
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                    color: white;
                }

                .location-btn {
                    background: #3498db;
                    color: white;
                }

                .emergency-btn:hover, .location-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                }

                .call-history {
                    padding: 20px;
                    border-top: 1px solid #ecf0f1;
                }

                .call-history h4 {
                    margin: 0 0 15px 0;
                    color: #2c3e50;
                }

                .history-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    margin: 5px 0;
                    background: #f8f9fa;
                    border-radius: 8px;
                    font-size: 14px;
                }

                .history-number {
                    font-weight: bold;
                    color: #2c3e50;
                }

                .history-time {
                    color: #7f8c8d;
                    font-size: 12px;
                }

                @keyframes emergencySlideIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -60%);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%);
                    }
                }

                /* زر الطوارئ العائم */
                .emergency-float-btn {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    box-shadow: 0 8px 30px rgba(231, 76, 60, 0.4);
                    z-index: 9999;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            </style>
        `;

        document.body.insertAdjacentHTML('beforeend', panelHTML);
        this.createFloatButton();
    }

    createFloatButton() {
        const floatBtn = document.createElement('button');
        floatBtn.className = 'emergency-float-btn';
        floatBtn.innerHTML = '🚨';
        floatBtn.onclick = () => this.showPanel();
        
        document.body.appendChild(floatBtn);
    }

    showPanel() {
        const panel = document.getElementById('emergency-panel');
        panel.classList.add('show');
        
        document.querySelector('.panel-close').onclick = () => {
            panel.classList.remove('show');
        };
    }

    makeCall(number) {
        this.logCall(number, 'call');
        
        if(confirm(`هل تريد الاتصال بـ ${number}؟`)) {
            window.open(`tel:${number}`, '_self');
        }
    }

    openWhatsapp(number) {
        this.logCall(number, 'whatsapp');
        const message = 'أحتاج مساعدة عاجلة! 🚨';
        window.open(`https://wa.me/20${number}?text=${encodeURIComponent(message)}`, '_blank');
    }

    triggerFullEmergency() {
        // طوارئ كاملة - الاتصال بجميع الأرقام
        if(confirm('🚨 تنبيه! هذا سيحدث اتصالات طارئة متعددة. هل أنت متأكد؟')) {
            Object.values(this.emergencyContacts).forEach(contact => {
                if(!contact.number.includes('01153546426')) { // استثناء رقمك
                    this.makeCall(contact.number);
                }
            });
            
            this.sendEmergencySMS();
            this.notifyAuthorities();
        }
    }

    shareLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
                const message = `🚨 موقعي للطوارئ: ${locationUrl}`;
                
                // مشاركة عبر الواتساب
                window.open(`https://wa.me/201153546426?text=${encodeURIComponent(message)}`, '_blank');
            }, error => {
                alert('تعذر الوصول إلى الموقع. يرجى التحقق من الإعدادات.');
            });
        }
    }

    logCall(number, type) {
        const callLog = {
            number,
            type,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('ar-EG'),
            time: new Date().toLocaleTimeString('ar-EG')
        };
        
        this.callHistory.unshift(callLog);
        
        // حفظ آخر 50 اتصال فقط
        this.callHistory = this.callHistory.slice(0, 50);
        localStorage.setItem('emergencyCalls', JSON.stringify(this.callHistory));
        
        this.updateCallHistory();
    }

    updateCallHistory() {
        const historyList = document.getElementById('history-list');
        if (!historyList) return;

        historyList.innerHTML = this.callHistory.map(call => `
            <div class="history-item">
                <div>
                    <span class="history-number">${call.number}</span>
                    <div class="history-time">${call.date} - ${call.time}</div>
                </div>
                <span style="color: ${call.type === 'call' ? '#27ae60' : '#25D366'}">
                    ${call.type === 'call' ? '📞' : '💚'}
                </span>
            </div>
        `).join('');
    }

    loadCallHistory() {
        this.updateCallHistory();
    }

    sendEmergencySMS() {
        // محاكاة إرسال رسائل طوارئ
        console.log('🚨 إرسال رسائل طوارئ إلى الجهات المختصة...');
        
        const emergencyData = {
            type: 'full_emergency',
            timestamp: new Date().toISOString(),
            location: 'يتم تحديده...',
            contacts: Object.values(this.emergencyContacts).map(c => c.number)
        };
        
        localStorage.setItem('lastEmergency', JSON.stringify(emergencyData));
    }

    notifyAuthorities() {
        // إشعار افتراضي للسلطات
        const notification = new Notification('🚨 تنبيه طوارئ', {
            body: 'تم إرسال إشعار طوارئ إلى الجهات المختصة',
            icon: '/icons/emergency.png',
            requireInteraction: true
        });
    }
}

// تشغيل النظام
const emergencyCalls = new EmergencyCalls();