import random
import string
import os

def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase + string.digits + string.ascii_uppercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

class BaseConfig(object):
    """Base configuration."""
    SECRET_KEY = get_random_string(30)
    DEBUG = True
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(BaseConfig):
    """Production configuration."""
    DEBUG = False
    SECRET_KEY = open(os.path.realpath('.') + '/secret_key.txt', 'r').read()

class Development(BaseConfig):
    """Development configuration."""
    DEBUG = True
    TESTING = True
    SECRET_KEY = get_random_string(30)
