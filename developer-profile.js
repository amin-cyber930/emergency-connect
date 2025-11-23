// developer-profile.js - معلومات المطور
const developerInfo = {
    name: "أمين ناجح أبو الفتوح صابر",
    email: "amin.weqena2@gmail.com", 
    phone: "+20 10 111 82784",
    location: "قوص، قنا، مصر",
    education: "طالب في المدرسة الفنية للتكنولوجيا التطبيقية بقنا",
    
    // روابطك الشخصية
    social: {
        linkedin: "https://www.linkedin.com/in/amin-nageh-6ba79a349",
        facebook: "https://www.facebook.com/amin.nageh.khalaf",
        github: "https://github.com"
    }
};

// إضافة قسم المطور في الصفحة
function addDeveloperSection() {
    const sectionHTML = `
        <section id="developer" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4rem 5%; text-align: center;">
            <div class="section-header">
                <h2>👨‍💻 المطور</h2>
                <p>${developerInfo.name}</p>
            </div>
            
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px;">
                    <h3>${developerInfo.name}</h3>
                    <p>${developerInfo.education}</p>
                    
                    <div style="margin: 2rem 0;">
                        <p><i class="fas fa-envelope"></i> ${developerInfo.email}</p>
                        <p><i class="fas fa-phone"></i> ${developerInfo.phone}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${developerInfo.location}</p>
                    </div>

                    <div style="margin-top: 2rem;">
                        <h4>وسائل التواصل</h4>
                        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem;">
                            <a href="${developerInfo.social.linkedin}" target="_blank" style="color: white; font-size: 1.5rem;">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="${developerInfo.social.facebook}" target="_blank" style="color: white; font-size: 1.5rem;">
                                <i class="fab fa-facebook"></i>
                            </a>
                            <a href="${developerInfo.social.github}" target="_blank" style="color: white; font-size: 1.5rem;">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // إضافة القسم قبل الفوتر
    const footer = document.querySelector('footer');
    if (footer) {
        footer.insertAdjacentHTML('beforebegin', sectionHTML);
    }
}

// تحديث الفوتر باسمك
function updateFooter() {
    const footer = document.querySelector('footer .copyright');
    if (footer) {
        footer.innerHTML = `
            <p>© 2025 Emergency Connect - جميع الحقوق محفوظة</p>
            <p>تم التطوير بواسطة <strong>${developerInfo.name}</strong></p>
            <p>${developerInfo.email} | ${developerInfo.phone}</p>
        `;
    }
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    addDeveloperSection();
    updateFooter();
});