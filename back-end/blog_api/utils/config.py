import json
import os

def get_random_string():
    return os.urandom(24)

with open(os.path.realpath('.') + '/secret.json', 'r') as f:
    secret = json.load(f)

class BaseConfig(object):
    """Base configuration."""
    SECRET_KEY = get_random_string()
    SECURITY_PASSWORD_SALT = get_random_string()
    JWT_SECRET_KEY = get_random_string()
    JWT_LOCATION = ['headers', 'cookies']
    DEBUG = True
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_DEFAULT_SENDER = secret['email']
    MAIL_SERVER = secret['MAIL_SERVER']
    MAIL_PORT = secret['MAIL_PORT']
    MAIL_USE_SSL = secret['MAIL_USE_SSL']
    MAIL_USERNAME = secret['email']
    MAIL_PASSWORD = secret['password']

class ProductionConfig(BaseConfig):
    """Production configuration."""
    DEBUG = False
    SECRET_KEY = open(os.path.realpath('.') + '/secret_key.txt', 'r').read()

class Development(BaseConfig):
    """Development configuration."""
    DEBUG = True
    TESTING = True

