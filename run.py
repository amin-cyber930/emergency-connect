from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

# بيانات جهات الاتصال
EMERGENCY_CONTACTS = {
    "الشرطة": "122",
    "الإسعاف": "123", 
    "المطافئ": "180",
    "النجدة": "129"
}

@app.route('/')
def home():
    return '''
    <!DOCTYPE html>
    <html lang="ar">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Emergency Connect</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0;
                padding: 20px;
                min-height: 100vh;
                direction: rtl;
            }
            .splash-screen {
                text-align: center;
                color: white;
                padding: 50px 20px;
            }
            .emergency-btn {
                background: #e74c3c;
                color: white;
                border: none;
                padding: 20px 40px;
                font-size: 1.5rem;
                border-radius: 50px;
                cursor: pointer;
                margin: 20px 0;
                width: 100%;
            }
            .contact-card {
                background: white;
                padding: 15px;
                margin: 10px 0;
                border-radius: 10px;
            }
        </style>
    </head>
    <body>
        <div class="splash-screen">
            <h1>🚨 Emergency Connect</h1>
            <p>Always Ready – Always Connect</p>
            <p>تم التطوير بواسطة أمين الجوع</p>
        </div>
        
        <button class="emergency-btn" onclick="sendEmergency()">🚨 زر الطوارئ</button>
        
        <div id="contacts">
            <h3 style="color: white;">جهات اتصال الطوارئ:</h3>
            <div id="contact-list"></div>
        </div>

        <script>
            // تحميل جهات الاتصال
            fetch('/api/contacts')
                .then(r => r.json())
                .then(contacts => {
                    let html = '';
                    for (let [name, number] of Object.entries(contacts)) {
                        html += `<div class="contact-card">
                            <strong>${name}</strong>: ${number}
                            <button onclick="call('${number}')">📞 اتصل</button>
                        </div>`;
                    }
                    document.getElementById('contact-list').innerHTML = html;
                });

            function sendEmergency() {
                alert('🚨 تم إرسال تنبيه الطوارئ!');
            }
            
            function call(number) {
                if(confirm(`الاتصال بـ ${number}؟`)) {
                    window.open('tel:' + number);
                }
            }
        </script>
    </body>
    </html>
    '''

@app.route('/api/contacts')
def get_contacts():
    return jsonify(EMERGENCY_CONTACTS)

@app.route('/api/emergency', methods=['POST'])
def emergency_alert():
    return jsonify({
        'success': True,
        'message': 'تم إرسال التنبيه',
        'time': datetime.now().strftime("%H:%M:%S")
    })

if __name__ == '__main__':
    print("🚀 Emergency Connect شغال!")
    print("🌐 http://localhost:5000")
    app.run(debug=True, port=5000)