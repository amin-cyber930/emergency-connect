// developer.js - معلومات صاحب المشروع (محدث)
class DeveloperInfo {
    constructor() {
        this.developer = {
            name: "أمين ناجح أبو الفتوح صابر",
            email: "amin.weqena2@gmail.com", 
            phone: "+20 10 111 82784",
            location: "قوص، قنا، مصر",
            education: "طالب حاسوب ومعلومات - جامعة جنوب الوادي",
            skills: ["Web Development", "UI/UX Design", "Python", "JavaScript"],
            projects: ["Emergency Connect", "مشاريع تخرج تقنية"],
            social: {
                // روابط مباشرة وعاملة
                facebook: "https://facebook.com",
                linkedin: "https://linkedin.com", 
                github: "https://github.com",
                portfolio: "#developer" // رابط داخلي
            }
        };
        
        this.init();
    }

    init() {
        this.addDeveloperSection();
        this.addDeveloperFooter();
        this.setPageTitle();
        this.addSocialLinks();
    }

    addDeveloperSection() {
        const developerHTML = `
            <section id="developer" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4rem 5%; text-align: center;">
                <div class="section-header">
                    <h2>👨‍💻 عن المطور</h2>
                    <p>معلومات عن صاحب ومطور المشروع</p>
                </div>
                
                <div style="max-width: 800px; margin: 0 auto;">
                    <!-- الصورة الشخصية -->
                    <div style="width: 150px; height: 150px; border-radius: 50%; background: rgba(255,255,255,0.2); margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">
                        👨‍💻
                    </div>
                    
                    <!-- المعلومات الأساسية -->
                    <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; backdrop-filter: blur(10px);">
                        <h3 style="margin-bottom: 1rem;">${this.developer.name}</h3>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">
                            <div style="text-align: right;">
                                <p><i class="fas fa-envelope"></i> ${this.developer.email}</p>
                                <p><i class="fas fa-phone"></i> ${this.developer.phone}</p>
                                <p><i class="fas fa-map-marker-alt"></i> ${this.developer.location}</p>
                            </div>
                            <div style="text-align: right;">
                                <p><i class="fas fa-graduation-cap"></i> ${this.developer.education}</p>
                                <p><i class="fas fa-code"></i> ${this.developer.skills.join(" • ")}</p>
                            </div>
                        </div>

                        <!-- المشاريع -->
                        <div style="margin: 2rem 0;">
                            <h4>المشاريع والتطوير</h4>
                            <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 1rem;">
                                ${this.developer.projects.map(project => `
                                    <span style="background: rgba(255,255,255,0.2); padding: 8px 15px; border-radius: 20px; font-size: 0.9rem;">
                                        ${project}
                                    </span>
                                `).join('')}
                            </div>
                        </div>

                        <!-- وسائل التواصل -->
                        <div style="margin-top: 2rem;">
                            <h4>وسائل التواصل</h4>
                            <div class="social-links" style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem;">
                                <a href="${this.developer.social.facebook}" target="_blank" style="color: white; font-size: 1.5rem; text-decoration: none;" title="Facebook">
                                    <i class="fab fa-facebook"></i>
                                </a>
                                <a href="${this.developer.social.linkedin}" target="_blank" style="color: white; font-size: 1.5rem; text-decoration: none;" title="LinkedIn">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                                <a href="${this.developer.social.github}" target="_blank" style="color: white; font-size: 1.5rem; text-decoration: none;" title="GitHub">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="mailto:${this.developer.email}" style="color: white; font-size: 1.5rem; text-decoration: none;" title="Email">
                                    <i class="fas fa-envelope"></i>
                                </a>
                                <a href="${this.developer.social.portfolio}" style="color: white; font-size: 1.5rem; text-decoration: none;" title="Portfolio">
                                    <i class="fas fa-briefcase"></i>
                                </a>
                            </div>
                            <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">
                                اضغط على الأيقونات للتواصل أو زيارة الحسابات
                            </p>
                        </div>

                        <!-- رسالة شخصية -->
                        <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(255,255,255,0.1); border-radius: 10px;">
                            <p style="font-style: italic; line-height: 1.6;">
                                "مطور شغوف بالتكنولوجيا ومساهم في المجتمع التقني. 
                                أسعى دائمًا لتحويل الأفكار إلى واقع ملموس يخدم المجتمع ويحل المشكلات اليومية."
                            </p>
                        </div>

                        <!-- زر الاتصال السريع -->
                        <div style="margin-top: 2rem;">
                            <button onclick="developerInfo.contactDeveloper()" style="background: #4CAF50; color: white; border: none; padding: 12px 25px; border-radius: 25px; font-size: 1rem; cursor: pointer;">
                                <i class="fas fa-paper-plane" style="margin-left: 8px;"></i>
                                تواصل معي الآن
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // إضافة القسم قبل الفوتر
        const footer = document.querySelector('footer');
        footer.insertAdjacentHTML('beforebegin', developerHTML);
    }

    addSocialLinks() {
        // إضافة روابط السوشيال ميديا في الفوتر
        const footerSocial = document.querySelector('footer .social-links');
        if (footerSocial) {
            footerSocial.innerHTML = `
                <a href="${this.developer.social.facebook}" target="_blank" title="Facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="${this.developer.social.linkedin}" target="_blank" title="LinkedIn">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="${this.developer.social.github}" target="_blank" title="GitHub">
                    <i class="fab fa-github"></i>
                </a>
                <a href="mailto:${this.developer.email}" title="Email">
                    <i class="fas fa-envelope"></i>
                </a>
            `;
        }
    }

    addDeveloperFooter() {
        const originalFooter = document.querySelector('footer .copyright');
        if (originalFooter) {
            originalFooter.innerHTML = `
                <p>© 2025 Emergency Connect - جميع الحقوق محفوظة</p>
                <p class="developer-credit">
                    تم التصميم والتطوير بواسطة 
                    <strong style="color: #8ab4f8;">${this.developer.name}</strong> 
                    - 
                    <a href="mailto:${this.developer.email}" style="color: #8ab4f8; text-decoration: none;">${this.developer.email}</a>
                </p>
                <p style="margin-top: 0.5rem; font-size: 0.8rem;">
                    <i class="fas fa-heart" style="color: #ff6b6b;"></i>
                    صنع بكل الحب لخدمة مجتمع قوص
                </p>
            `;
        }
    }

    setPageTitle() {
        document.title = `Emergency Connect - طور بواسطة ${this.developer.name}`;
    }

    contactDeveloper() {
        const contactMethods = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 10000; color: #333; max-width: 400px; width: 90%;">
                <h3 style="margin-bottom: 20px; text-align: center;">🚀 تواصل مع المطور</h3>
                
                <div style="display: grid; gap: 10px;">
                    <button onclick="window.open('mailto:${this.developer.email}', '_blank')" style="background: #ea4335; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; text-align: right;">
                        <i class="fas fa-envelope" style="margin-left: 8px;"></i>
                        إرسال بريد إلكتروني
                    </button>
                    
                    <button onclick="window.open('tel:${this.developer.phone}', '_self')" style="background: #34a853; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; text-align: right;">
                        <i class="fas fa-phone" style="margin-left: 8px;"></i>
                        الاتصال هاتفياً
                    </button>
                    
                    <button onclick="window.open('${this.developer.social.linkedin}', '_blank')" style="background: #0077b5; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; text-align: right;">
                        <i class="fab fa-linkedin" style="margin-left: 8px;"></i>
                        LinkedIn
                    </button>
                    
                    <button onclick="window.open('${this.developer.social.github}', '_blank')" style="background: #333; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; text-align: right;">
                        <i class="fab fa-github" style="margin-left: 8px;"></i>
                        GitHub
                    </button>
                </div>
                
                <button onclick="this.parentElement.remove()" style="background: #666; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; width: 100%; cursor: pointer;">
                    إغلاق
                </button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', contactMethods);
    }

    showInConsole() {
        console.log(`
            🚀 Emergency Connect - Developer Info
            ------------------------------------
            👨‍💻 Name: ${this.developer.name}
            📧 Email: ${this.developer.email}
            📞 Phone: ${this.developer.phone}
            📍 Location: ${this.developer.location}
            🎓 Education: ${this.developer.education}
            
            💼 Projects: ${this.developer.projects.join(", ")}
            🔧 Skills: ${this.developer.skills.join(", ")}
            
            🌐 Social Links:
               Facebook: ${this.developer.social.facebook}
               LinkedIn: ${this.developer.social.linkedin}
               GitHub: ${this.developer.social.github}
            
            "${"مطور شغوف بالتكنولوجيا ومساهم في المجتمع التقني"}"
        `);
    }
}

// إنشاء كائن المطور وعرض المعلومات
const developerInfo = new DeveloperInfo();
developerInfo.showInConsole();

// إضافة تأثيرات للروابط
document.addEventListener('click', function(e) {
    if (e.target.closest('.social-links a')) {
        e.preventDefault();
        const link = e.target.closest('a');
        window.open(link.href, '_blank');
    }
});