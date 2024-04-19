from flask import Flask
from flask_ckeditor import CKEditor
from flask_bootstrap import Bootstrap
from flask_login import LoginManager
from flask_gravatar import Gravatar
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'just_a_demo_key'
ckeditor = CKEditor(app)
Bootstrap(app)
login_mamage = LoginManager()
login_mamage.init_app(app=app)
gravatar = Gravatar(app,
                    size=100,
                    rating='g',
                    default='retro',
                    force_default=False,
                    force_lower=False,
                    use_ssl=False,
                    base_url=None)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from blog_website.blog_demo.views import blog_demo

app.register_blueprint(blog_demo)

with app.app_context():
    db.create_all()
