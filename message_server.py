# message_server.py - سيرفر الرسائل المتكامل
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# إعدادات البريد الإلكتروني
EMAIL_CONFIG = {
    'smtp_server': 'smtp.gmail.com',
    'smtp_port': 587,
    'sender_email': 'your.email@gmail.com',  # غيرها ببريدك
    'sender_password': 'your_app_password',  # غيرها بباسورد التطبيق
    'admin_email': 'amin.weqena2@gmail.com'  # بريدك اللي هتستقبل عليه
}

class MessageSystem:
    def __init__(self):
        self.contacts_file = 'contacts.json'
        self.messages_file = 'messages.json'
        self.init_files()
    
    def init_files(self):
        """تهيئة ملفات البيانات"""
        if not os.path.exists(self.contacts_file):
            with open(self.contacts_file, 'w', encoding='utf-8') as f:
                json.dump([], f, ensure_ascii=False)
        
        if not os.path.exists(self.messages_file):
            with open(self.messages_file, 'w', encoding='utf-8') as f:
                json.dump([], f, ensure_ascii=False)
    
    def save_contact(self, name, phone, email, message_type):
        """حفظ بيانات الاتصال"""
        try:
            with open(self.contacts_file, 'r', encoding='utf-8') as f:
                contacts = json.load(f)
            
            new_contact = {
                'id': len(contacts) + 1,
                'name': name,
                'phone': phone,
                'email': email,
                'type': message_type,
                'timestamp': datetime.now().isoformat(),
                'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
            
            contacts.append(new_contact)
            
            with open(self.contacts_file, 'w', encoding='utf-8') as f:
                json.dump(contacts, f, ensure_ascii=False, indent=2)
            
            return True
        except Exception as e:
            print(f"Error saving contact: {e}")
            return False
    
    def save_message(self, name, phone, email, subject, message, message_type):
        """حفظ الرسالة"""
        try:
            with open(self.messages_file, 'r', encoding='utf-8') as f:
                messages = json.load(f)
            
            new_message = {
                'id': len(messages) + 1,
                'name': name,
                'phone': phone,
                'email': email,
                'subject': subject,
                'message': message,
                'type': message_type,
                'timestamp': datetime.now().isoformat(),
                'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'status': 'new'
            }
            
            messages.append(new_message)
            
            with open(self.messages_file, 'w', encoding='utf-8') as f:
                json.dump(messages, f, ensure_ascii=False, indent=2)
            
            return new_message
        except Exception as e:
            print(f"Error saving message: {e}")
            return None
    
    def send_email_notification(self, message_data):
        """إرسال إشعار بالبريد الإلكتروني"""
        try:
            # محاكاة الإرسال أولاً علشان نتأكد من الشغل
            print("=" * 50)
            print("📧 إشعار بريد إلكتروني جديد")
            print("=" * 50)
            print(f"👤 الاسم: {message_data['name']}")
            print(f"📞 الهاتف: {message_data['phone']}")
            print(f"📧 البريد: {message_data['email']}")
            print(f"🏷️ النوع: {message_data['type']}")
            print(f"📝 الموضوع: {message_data['subject']}")
            print(f"💬 الرسالة: {message_data['message']}")
            print(f"⏰ الوقت: {message_data['date']}")
            print("=" * 50)
            
            # لو عايز الإيميل الحقيقي، شيل التعليق من الكود تحت
            '''
            # إعداد الرسالة
            msg = MIMEMultipart()
            msg['From'] = EMAIL_CONFIG['sender_email']
            msg['To'] = EMAIL_CONFIG['admin_email']
            msg['Subject'] = f"رسالة جديدة: {message_data['subject']}"
            
            # محتوى الرسالة
            body = f"""
            📨 رسالة جديدة من موقع الطوارئ
            
            👤 الاسم: {message_data['name']}
            📞 الهاتف: {message_data['phone']}
            📧 البريد: {message_data['email']}
            🏷️ النوع: {message_data['type']}
            📝 الموضوع: {message_data['subject']}
            
            💬 الرسالة:
            {message_data['message']}
            
            ⏰ الوقت: {message_data['date']}
            """
            
            msg.attach(MIMEText(body, 'plain', 'utf-8'))
            
            # إرسال الرسالة
            server = smtplib.SMTP(EMAIL_CONFIG['smtp_server'], EMAIL_CONFIG['smtp_port'])
            server.starttls()
            server.login(EMAIL_CONFIG['sender_email'], EMAIL_CONFIG['sender_password'])
            text = msg.as_string()
            server.sendmail(EMAIL_CONFIG['sender_email'], EMAIL_CONFIG['admin_email'], text)
            server.quit()
            '''
            
            print("✅ تم محاكاة إرسال الإشعار بنجاح")
            return True
            
        except Exception as e:
            print(f"❌ خطأ في إرسال البريد: {e}")
            return True  # علشان يكمل حتى لو في مشكلة
    
    def send_whatsapp_notification(self, message_data):
        """إرسال إشعار بالواتساب (محاكاة)"""
        try:
            print(f"📱 إشعار واتساب: رسالة جديدة من {message_data['name']} - {message_data['phone']}")
            print(f"💬 محتوى الرسالة: {message_data['message'][:50]}...")
            return True
        except Exception as e:
            print(f"خطأ في إرسال إشعار الواتساب: {e}")
            return False

# إنشاء كائن النظام
message_system = MessageSystem()

# الروابط
@app.route('/')
def home():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>نظام رسائل أمين ناجح</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f0f0f0; }
            .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            h1 { color: #333; }
            .btn { background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 نظام رسائل أمين ناجح</h1>
            <p>السيرفر شغال بنجاح! 🎉</p>
            <a href="/message-form" class="btn">📨 إرسال رسالة</a>
            <a href="/api/stats" class="btn">📊 الإحصائيات</a>
        </div>
    </body>
    </html>
    """

@app.route('/message-form')
def message_form():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>إرسال رسالة</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
            .form-group { margin-bottom: 15px; }
            label { display: block; margin-bottom: 5px; font-weight: bold; }
            input, textarea, select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
            button { background: #667eea; color: white; padding: 15px 30px; border: none; border-radius: 5px; cursor: pointer; }
            .notification { padding: 10px; margin: 10px 0; border-radius: 5px; }
            .success { background: #d4edda; color: #155724; }
            .error { background: #f8d7da; color: #721c24; }
        </style>
    </head>
    <body>
        <h1>📨 إرسال رسالة إلى أمين ناجح</h1>
        <form id="messageForm">
            <div class="form-group">
                <label for="name">👤 اسمك:</label>
                <input type="text" id="name" required>
            </div>
            <div class="form-group">
                <label for="phone">📞 رقم الهاتف:</label>
                <input type="tel" id="phone" required>
            </div>
            <div class="form-group">
                <label for="email">📧 البريد الإلكتروني:</label>
                <input type="email" id="email">
            </div>
            <div class="form-group">
                <label for="subject">📋 الموضوع:</label>
                <input type="text" id="subject" required>
            </div>
            <div class="form-group">
                <label for="message">💬 الرسالة:</label>
                <textarea id="message" rows="5" required></textarea>
            </div>
            <button type="submit">إرسال الرسالة</button>
        </form>
        <div id="notification"></div>
        
        <script>
            document.getElementById('messageForm').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = {
                    name: document.getElementById('name').value,
                    phone: document.getElementById('phone').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value,
                    type: 'general'
                };
                
                try {
                    const response = await fetch('/api/send-message', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    const data = await response.json();
                    
                    const notification = document.getElementById('notification');
                    if (data.success) {
                        notification.innerHTML = '<div class="notification success">✅ ' + data.message + '</div>';
                        document.getElementById('messageForm').reset();
                    } else {
                        notification.innerHTML = '<div class="notification error">❌ ' + data.message + '</div>';
                    }
                } catch (error) {
                    document.getElementById('notification').innerHTML = '<div class="notification error">❌ حدث خطأ في الإرسال</div>';
                }
            });
        </script>
    </body>
    </html>
    """

@app.route('/api/send-message', methods=['POST'])
def send_message():
    """استقبال وإرسال الرسائل"""
    try:
        data = request.json
        
        # التحقق من البيانات المطلوبة
        required_fields = ['name', 'phone', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'message': f'حقل {field} مطلوب'
                }), 400
        
        # حفظ بيانات الاتصال
        message_system.save_contact(
            data['name'],
            data['phone'],
            data.get('email', ''),
            data.get('type', 'general')
        )
        
        # حفظ الرسالة
        message_data = message_system.save_message(
            data['name'],
            data['phone'],
            data.get('email', ''),
            data['subject'],
            data['message'],
            data.get('type', 'general')
        )
        
        if message_data:
            # إرسال الإشعارات
            message_system.send_email_notification(message_data)
            message_system.send_whatsapp_notification(message_data)
            
            return jsonify({
                'success': True,
                'message': 'تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.',
                'data': message_data
            })
        else:
            return jsonify({
                'success': False,
                'message': 'حدث خطأ في حفظ الرسالة'
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'حدث خطأ: {str(e)}'
        }), 500

@app.route('/api/emergency-alert', methods=['POST'])
def emergency_alert():
    """استقبال تنبيهات الطوارئ"""
    try:
        data = request.json
        
        emergency_data = {
            'name': data.get('name', 'مستخدم'),
            'phone': data.get('phone', 'غير معروف'),
            'location': data.get('location', 'غير معروف'),
            'type': data.get('type', 'طوارئ عامة'),
            'timestamp': datetime.now().isoformat(),
            'priority': 'high'
        }
        
        # إرسال إشعار طوارئ
        message_system.send_email_notification({
            'name': emergency_data['name'],
            'phone': emergency_data['phone'],
            'email': 'emergency@amin.com',
            'type': 'emergency',
            'subject': f'🚨 تنبيه طوارئ من {emergency_data["name"]}',
            'message': f'نوع الطوارئ: {emergency_data["type"]}\nالموقع: {emergency_data["location"]}\nالهاتف: {emergency_data["phone"]}',
            'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
        
        return jsonify({
            'success': True,
            'message': 'تم إرسال تنبيه الطوارئ! سأتصل بك فوراً.',
            'data': emergency_data
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'خطأ في إرسال التنبيه: {str(e)}'
        }), 500

@app.route('/api/contacts')
def get_contacts():
    """الحصول على قائمة الاتصالات"""
    try:
        with open('contacts.json', 'r', encoding='utf-8') as f:
            contacts = json.load(f)
        
        return jsonify({
            'success': True,
            'contacts': contacts[-50:]  # آخر 50 اتصال
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'خطأ في جلب البيانات: {str(e)}'
        }), 500

@app.route('/api/messages')
def get_messages():
    """الحصول على قائمة الرسائل"""
    try:
        with open('messages.json', 'r', encoding='utf-8') as f:
            messages = json.load(f)
        
        return jsonify({
            'success': True,
            'messages': messages[-50:]  # آخر 50 رسالة
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'خطأ في جلب البيانات: {str(e)}'
        }), 500

@app.route('/api/stats')
def get_stats():
    """إحصائيات الموقع"""
    try:
        with open('contacts.json', 'r', encoding='utf-8') as f:
            contacts = json.load(f)
        
        with open('messages.json', 'r', encoding='utf-8') as f:
            messages = json.load(f)
        
        stats = {
            'total_contacts': len(contacts),
            'total_messages': len(messages),
            'today_contacts': len([c for c in contacts if c.get('date', '').startswith(datetime.now().strftime('%Y-%m-%d'))]),
            'today_messages': len([m for m in messages if m.get('date', '').startswith(datetime.now().strftime('%Y-%m-%d'))]),
            'emergency_count': len([m for m in messages if m.get('type') == 'emergency'])
        }
        
        return jsonify({
            'success': True,
            'stats': stats
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'خطأ في جلب الإحصائيات: {str(e)}'
        }), 500

if __name__ == '__main__':
    print("🚀 سيرفر الرسائل شغال!")
    print("📧 نظام إرسال الرسائل جاهز")
    print("🌐 http://localhost:5000")
    print("💾 البيانات بتتخزن في contacts.json و messages.json")
    app.run(debug=True, port=5000, host='0.0.0.0')