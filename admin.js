// admin.js - نظام إدارة المحتوى
class AdminPanel {
    constructor() {
        this.isAdmin = localStorage.getItem('adminAuth') === 'true';
        this.init();
    }

    init() {
        if (this.isAdmin) {
            this.showAdminPanel();
        }
        
        // إضافة زر الإدارة في الفوتر
        this.addAdminButton();
    }

    addAdminButton() {
        const adminBtn = `
            <div style="position: fixed; bottom: 20px; left: 20px; z-index: 1000;">
                <button onclick="adminPanel.toggleAdmin()" 
                        style="background: #ff6b6b; color: white; border: none; padding: 10px 15px; border-radius: 50px; cursor: pointer;">
                    <i class="fas fa-cog"></i>
                </button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', adminBtn);
    }

    toggleAdmin() {
        if (!this.isAdmin) {
            this.showLogin();
        } else {
            this.showAdminPanel();
        }
    }

    showLogin() {
        const loginHTML = `
            <div id="adminLogin" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 10000;">
                <h3>دخول الإدارة</h3>
                <input type="password" id="adminPassword" placeholder="كلمة المرور" style="padding: 10px; margin: 10px 0; width: 200px; border: 1px solid #ddd; border-radius: 5px;">
                <br>
                <button onclick="adminPanel.authenticate()" style="background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-right: 10px;">دخول</button>
                <button onclick="document.getElementById('adminLogin').remove()" style="background: #ccc; border: none; padding: 10px 20px; border-radius: 5px;">إلغاء</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', loginHTML);
    }

    authenticate() {
        const password = document.getElementById('adminPassword').value;
        // كلمة مرور بسيطة للتجربة
        if (password === 'admin123') {
            this.isAdmin = true;
            localStorage.setItem('adminAuth', 'true');
            document.getElementById('adminLogin').remove();
            this.showAdminPanel();
            this.showNotification('تم الدخول بنجاح!', 'success');
        } else {
            this.showNotification('كلمة مرور خاطئة!', 'error');
        }
    }

    showAdminPanel() {
        const panelHTML = `
            <div id="adminPanel" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; justify-content: center; align-items: center;">
                <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3>لوحة التحكم - Emergency Connect</h3>
                        <button onclick="document.getElementById('adminPanel').remove()" style="background: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 5px;">✕</button>
                    </div>
                    
                    <div class="admin-section">
                        <h4>إدارة الأطباء</h4>
                        <button onclick="adminPanel.addDoctor()" style="background: var(--primary); color: white; border: none; padding: 8px 15px; border-radius: 5px; margin: 5px;">إضافة طبيب</button>
                        <div id="doctorsList"></div>
                    </div>

                    <div class="admin-section" style="margin-top: 20px;">
                        <h4>الإحصائيات</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; text-align: center;">
                                <h5>عدد الزوار</h5>
                                <p style="font-size: 24px; margin: 0;">${localStorage.getItem('visitCount') || 0}</p>
                            </div>
                            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; text-align: center;">
                                <h5>الاتصالات</h5>
                                <p style="font-size: 24px; margin: 0;">${localStorage.getItem('callCount') || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: 20px; text-align: center;">
                        <button onclick="adminPanel.exportData()" style="background: #4caf50; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin: 5px;">تصدير البيانات</button>
                        <button onclick="adminPanel.clearData()" style="background: #f44336; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin: 5px;">مسح البيانات</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', panelHTML);
        this.loadDoctorsList();
    }

    addDoctor() {
        const doctorForm = `
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 10px;">
                <input type="text" id="docName" placeholder="اسم الطبيب" style="padding: 8px; margin: 5px; width: 100%; border: 1px solid #ddd; border-radius: 5px;">
                <input type="text" id="docSpecialty" placeholder="التخصص" style="padding: 8px; margin: 5px; width: 100%; border: 1px solid #ddd; border-radius: 5px;">
                <input type="text" id="docPhone" placeholder="رقم الهاتف" style="padding: 8px; margin: 5px; width: 100%; border: 1px solid #ddd; border-radius: 5px;">
                <button onclick="adminPanel.saveDoctor()" style="background: var(--primary); color: white; border: none; padding: 8px 15px; border-radius: 5px; margin: 5px;">حفظ</button>
            </div>
        `;
        document.getElementById('doctorsList').insertAdjacentHTML('beforeend', doctorForm);
    }

    saveDoctor() {
        const newDoctor = {
            name: document.getElementById('docName').value,
            specialty: document.getElementById('docSpecialty').value,
            phone: document.getElementById('docPhone').value,
            location: "قوص المركز"
        };

        // حفظ في localStorage
        const doctors = JSON.parse(localStorage.getItem('customDoctors') || '[]');
        doctors.push(newDoctor);
        localStorage.setItem('customDoctors', JSON.stringify(doctors));

        this.showNotification('تم حفظ الطبيب بنجاح!', 'success');
        this.loadDoctorsList();
    }

    loadDoctorsList() {
        const doctors = JSON.parse(localStorage.getItem('customDoctors') || '[]');
        let doctorsHTML = '';
        
        doctors.forEach((doctor, index) => {
            doctorsHTML += `
                <div style="background: white; padding: 10px; margin: 5px 0; border-radius: 5px; border: 1px solid #ddd;">
                    <strong>${doctor.name}</strong> - ${doctor.specialty}<br>
                    <small>${doctor.phone}</small>
                    <button onclick="adminPanel.deleteDoctor(${index})" style="background: #ff6b6b; color: white; border: none; padding: 3px 8px; border-radius: 3px; float: left; font-size: 12px;">حذف</button>
                </div>
            `;
        });

        document.getElementById('doctorsList').innerHTML = doctorsHTML || '<p>لا توجد أطباء مضافة</p>';
    }

    deleteDoctor(index) {
        const doctors = JSON.parse(localStorage.getItem('customDoctors') || '[]');
        doctors.splice(index, 1);
        localStorage.setItem('customDoctors', JSON.stringify(doctors));
        this.loadDoctorsList();
        this.showNotification('تم حذف الطبيب', 'success');
    }

    exportData() {
        const data = {
            doctors: JSON.parse(localStorage.getItem('customDoctors') || '[]'),
            stats: {
                visits: localStorage.getItem('visitCount') || 0,
                calls: localStorage.getItem('callCount') || 0
            }
        };

        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'emergency-connect-data.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    clearData() {
        if (confirm('هل أنت متأكد من مسح جميع البيانات؟')) {
            localStorage.removeItem('customDoctors');
            localStorage.removeItem('visitCount');
            localStorage.removeItem('callCount');
            this.showNotification('تم مسح جميع البيانات', 'success');
            this.loadDoctorsList();
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; 
            padding: 15px 20px; border-radius: 5px; color: white; 
            z-index: 10001; font-weight: bold;
            background: ${type === 'success' ? '#4caf50' : '#f44336'};
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

const adminPanel = new AdminPanel();