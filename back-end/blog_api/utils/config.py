import json
import os

def get_random_string():
    return os.urandom(24)

class BaseConfig(object):
    """Base configuration."""
    SECRET_KEY = get_random_string()
    SECURITY_PASSWORD_SALT = get_random_string()
    JWT_SECRET_KEY = get_random_string()
    JWT_LOCATION = ['headers', 'cookies']
    UPLOAD_FOLDER = os.path.realpath('.') + '/static/images'
    DEBUG = True
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_DEFAULT_SENDER = os.getenv("EMAIL_SENDER")
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_PORT = os.getenv('MAIL_PORT')
    MAIL_USE_SSL = os.getenv('MAIL_USE_SSL')
    MAIL_USERNAME = os.getenv('EMAIL_SENDER')
    MAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

class ProductionConfig(BaseConfig):
    """Production configuration."""
    DEBUG = False
    SECRET_KEY = os.getenv("SECRET")

class Development(BaseConfig):
    """Development configuration."""
    DEBUG = True
    TESTING = True

