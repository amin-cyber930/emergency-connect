from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# بيانات الموقع
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/doctors')
def get_doctors():
    return jsonify(data['doctors'])

@app.route('/api/pharmacies')
def get_pharmacies():
    return jsonify(data['pharmacies'])

@app.route('/api/services')
def get_services():
    return jsonify(data['services'])

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        name = request.json.get('name')
        email = request.json.get('email')
        message = request.json.get('message')
        
        # هنا بنسجل البيانات في ملف
        with open('contacts.json', 'a', encoding='utf-8') as f:
            contact_data = {
                'name': name,
                'email': email,
                'message': message,
                'timestamp': str(datetime.now())
            }
            json.dump(contact_data, f, ensure_ascii=False)
            f.write('\n')
        
        return jsonify({'success': True, 'message': 'تم إرسال رسالتك بنجاح!'})
    
    except Exception as e:
        return jsonify({'success': False, 'message': 'حدث خطأ أثناء الإرسال'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)