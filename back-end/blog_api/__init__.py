from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from sqlalchemy import URL
from flask_migrate import Migrate
from flask_restful import Api
import blog_api.config as cfg
import os

app = Flask(__name__)

app.config.from_object(cfg.Development)

login_manager = LoginManager()


db = SQLAlchemy()

url_obj = URL.create(
    "postgresql",
    username=os.getenv("username"),
    password=os.getenv("password"),
    host="localhost",
    port=5432,
    database="Blog_Website",
) 

def create_app(cfg=cfg.Development, alt_config={}):
    app = Flask(__name__)
    app.config.from_object(cfg)
    app.config.update(alt_config)
    if alt_config.get("SQLALCHEMY_DATABASE_URI"):
        app.config["SQLALCHEMY_DATABASE_URI"] = alt_config.get("SQLALCHEMY_DATABASE_URI")
    if not app.debug:
        import logging
        from logging.handlers import FileHandler
        file_handler = FileHandler(app.config["LOG_FILE"])
        app.logger.setLevel(logging.INFO)
        file_handler.setLevel(logging.WARNING)
        app.logger.addHandler(file_handler)
    return app

def create_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
    return db



app = create_app(alt_config={
    "SQLALCHEMY_DATABASE_URI": url_obj, 
    "LOG_FILE": "application.log"})

migrate = Migrate(app, db)
login_manager.init_app(app)
api = Api(app)
db = create_db(app)

from blog_api.users.management.user_management import UserLogin, UserRegister

api.add_resource(UserLogin, "/login")
api.add_resource(UserRegister, "/register")

