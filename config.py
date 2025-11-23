# config.py
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'emergency-connect-secret'
    DATABASE_URI = os.environ.get('DATABASE_URI') or 'sqlite:///emergency.db'
    SMS_API_KEY = os.environ.get('SMS_API_KEY')
    MAPS_API_KEY = os.environ.get('GOOGLE_MAPS_API_KEY')
    
    # جهات اتصال الطوارئ
    EMERGENCY_CONTACTS = {
        'الشرطة': '122',
        'الإسعاف': '123',
        'المطافئ': '180',
        'النجدة': '129'
    }