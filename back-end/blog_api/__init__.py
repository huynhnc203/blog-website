from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from sqlalchemy import URL
from flask_migrate import Migrate
import blog_api.config as cfg
import os

app = Flask(__name__)

app.config.from_object(cfg.Development)

print(app.config["SECRET_KEY"])
print(app.config["DEBUG"])
print(app.config["TESTING"])

url_obj = URL.create(
    "postgresql",
    username=os.getenv("username"),
    password=os.getenv("password"),
    host="localhost",
    port=5432,
    database="world",
) 



print(url_obj)

app.config["SQLALCHEMY_DATABASE_URI"] = url_obj

db = SQLAlchemy(app)
migrate = Migrate(app, db)


from blog_api.models.views import UserView

userview = UserView.as_view("userview")

app.add_url_rule("/user/<int:id>", view_func=userview, methods=["GET"])
app.add_url_rule("/user/<name>?<email>?<password>", view_func=userview, methods=["POST"])


with app.app_context():
    db.create_all()



