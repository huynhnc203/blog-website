from blog_api import login_manager, db
from flask import jsonify, g
from flask_restful import Resource, reqparse
from blog_api.models.models import User
from flask_login import login_user, current_user

login_parser = reqparse.RequestParser()
register_parser = reqparse.RequestParser()
for parser in [login_parser, register_parser]:
    parser.add_argument("email", type=str)
    parser.add_argument("password", type=str)

register_parser.add_argument("name", type=str)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

class UserLogin(Resource):

    

    def post(self):
        if current_user.is_authenticated:
            return jsonify({"message": "User is already authenticated"}), 404
        args = login_parser.parse_args()
        email = args["email"]
        password = args["password"]
        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({"message": "Invalid credentials"}), 404
        login_user(user)
        return jsonify({"message": "User authenticated"}), 200

    

class UserRegister(Resource):


    def post(self):
        args = register_parser.parse_args()
        email = args["email"]
        name = args["name"]
        password = args["password"]
        user = User(name=name, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User created"})
    

    