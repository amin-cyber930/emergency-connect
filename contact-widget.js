// contact-widget.js - أداة التواصل المنفصلة
class ContactWidget {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createWidget();
        this.setupEventListeners();
    }

    createWidget() {
        const widgetHTML = `
            <div id="contact-widget" class="contact-widget">
                <button class="widget-toggle">
                    <i class="fas fa-comments"></i>
                </button>
                
                <div class="widget-content">
                    <div class="widget-header">
                        <h4>تواصل مع المطور</h4>
                        <button class="widget-close">&times;</button>
                    </div>
                    
                    <div class="widget-body">
                        <div class="contact-option" data-type="whatsapp">
                            <i class="fab fa-whatsapp"></i>
                            <span>الواتساب</span>
                            <small>01153546426</small>
                        </div>
                        
                        <div class="contact-option" data-type="phone">
                            <i class="fas fa-phone"></i>
                            <span>اتصال فوري</span>
                            <small>01153546426</small>
                        </div>
                        
                        <div class="contact-option" data-type="email">
                            <i class="fas fa-envelope"></i>
                            <span>البريد الإلكتروني</span>
                            <small>amin.weqena2@gmail.com</small>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                .contact-widget {
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    z-index: 10000;
                }

                .widget-toggle {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #25D366, #128C7E);
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
                    transition: all 0.3s;
                }

                .widget-toggle:hover {
                    transform: scale(1.1);
                }

                .widget-content {
                    position: absolute;
                    bottom: 70px;
                    left: 0;
                    width: 280px;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    display: none;
                }

                .widget-content.show {
                    display: block;
                    animation: slideUp 0.3s ease-out;
                }

                .widget-header {
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .widget-header h4 {
                    margin: 0;
                    color: #333;
                }

                .widget-close {
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    color: #666;
                }

                .widget-body {
                    padding: 10px;
                }

                .contact-option {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    margin: 5px 0;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background 0.3s;
                }

                .contact-option:hover {
                    background: #f8f9fa;
                }

                .contact-option i {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 10px;
                    color: white;
                    font-size: 18px;
                }

                .contact-option[data-type="whatsapp"] i {
                    background: #25D366;
                }

                .contact-option[data-type="phone"] i {
                    background: #4CAF50;
                }

                .contact-option[data-type="email"] i {
                    background: #EA4335;
                }

                .contact-option span {
                    flex: 1;
                    color: #333;
                    font-weight: 500;
                }

                .contact-option small {
                    color: #666;
                    font-size: 12px;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        `;

        document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }

    setupEventListeners() {
        const toggleBtn = document.querySelector('.widget-toggle');
        const closeBtn = document.querySelector('.widget-close');
        const contactOptions = document.querySelectorAll('.contact-option');

        toggleBtn.addEventListener('click', () => this.toggleWidget());
        closeBtn.addEventListener('click', () => this.closeWidget());

        contactOptions.forEach(option => {
            option.addEventListener('click', () => this.handleContact(option));
        });
    }

    toggleWidget() {
        const content = document.querySelector('.widget-content');
        this.isOpen = !this.isOpen;
        content.classList.toggle('show', this.isOpen);
    }

    closeWidget() {
        const content = document.querySelector('.widget-content');
        this.isOpen = false;
        content.classList.remove('show');
    }

    handleContact(option) {
        const type = option.getAttribute('data-type');
        
        switch(type) {
            case 'whatsapp':
                window.open('https://wa.me/201153546426', '_blank');
                break;
            case 'phone':
                window.open('tel:01153546426', '_self');
                break;
            case 'email':
                window.open('mailto:amin.weqena2@gmail.com', '_self');
                break;
        }
        
        this.closeWidget();
    }
}

// تشغيل الأداة
new ContactWidget();