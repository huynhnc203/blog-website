from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import URL
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
import blog_api.utils.config as cfg
import os
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
from flask_jwt_extended import JWTManager
from blog_api.utils.emails import mail


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
    CORS(app)
    app.config.from_object(cfg)
    app.config.update(alt_config)
    if alt_config.get("SQLALCHEMY_DATABASE_URI"):
        app.config["SQLALCHEMY_DATABASE_URI"] = alt_config.get("SQLALCHEMY_DATABASE_URI")
    @app.after_request
    def add_header(response):
        return response
    if not app.debug:
        import logging
        from logging.handlers import FileHandler
        file_handler = FileHandler(app.config["LOG_FILE"])
        app.logger.setLevel(logging.INFO)
        file_handler.setLevel(logging.WARNING)
        app.logger.addHandler(file_handler)
        @app.errorhandler(500)
        def server_error(e):
            logging.error(f"An error occurred during a request. {e}")
            return response_with(resp.SERVER_ERROR_500)
        @app.errorhandler(400)
        def bad_request(e):
            logging.error(f"A bad request occurred during a request. {e}")
            return response_with(resp.BAD_REQUEST_400)
        @app.errorhandler(404)
        def not_found(e):
            logging.error(f"A resource was not found during a request. {e}")
            return response_with(resp.SERVER_ERROR_404)

    return app

app = create_app(alt_config={
    "SQLALCHEMY_DATABASE_URI": url_obj, 
    "LOG_FILE": "application.log"})

mail.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)

from blog_api.users.management.user_management import UserManagement
from blog_api.posts.posts_management.posts_mamagement import PostManagement
from blog_api.users.authenticate.authenticate import auth_blueprint

api.add_resource(UserManagement, "/api/users", "/api/users/<int:id>")
api.add_resource(PostManagement, "/api/posts", "/api/posts/<int:id>", "/api/posts/<int:page>")
app.register_blueprint(auth_blueprint, url_prefix="/api/authenticate")

db.init_app(app)
with app.app_context():
    db.create_all()
