from blog_api import login_manager, db
from flask import jsonify, request
from flask_restful import Resource, reqparse
from blog_api.models.models import User
from flask_login import login_user, current_user, logout_user, login_required

parser = reqparse.RequestParser()
parser.add_argument("email", type=str)
parser.add_argument("password", type=str)
parser.add_argument("name", type=str)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

class UserAuthenticate(Resource):
    """User login resource."""
    
    def get(self):
        if current_user.is_authenticated:
            return jsonify({
                "message": "User is authenticated",
                "is_authenticated": True,
                "name": current_user.name,
                "email": current_user.email,
                })
        return jsonify({"message": "User is not authenticated"})

    def post(self):
        type_post = request.headers.get("Type-Post")
        if type_post == "Login":
            
            if current_user.is_authenticated:
                return jsonify({"message": "User is already authenticated"})
            args = parser.parse_args()
            email = args["email"]
            password = args["password"]
            user = User.query.filter_by(email=email).first()
            if not user or not user.check_password(password):
                return jsonify({"message": "Invalid credentials"})
            login_user(user)
            return jsonify({"message": "User authenticated",
                            'is_authenticated': current_user.is_authenticated,})
        elif type_post == 'Register':
            if current_user.is_authenticated:
                return jsonify({"message": "User is already authenticated"})
            args = parser.parse_args()
            email = args["email"]
            name = args["name"]
            password = args["password"]
            user = User(name=name, email=email, password=password)
            db.session.add(user)
            db.session.commit()
            return jsonify({"message": "User created"})
        elif type_post == 'Logout':
            if not current_user.is_authenticated:
                return jsonify({"message": "User is not authenticated"})
            user = User.query.filter_by(email=current_user.email).first()
            if not user:
                return jsonify({"message": "User not found"})
            logout_user()
            return jsonify({
                "message": "User logged out",
                'is_authenticated': current_user.is_authenticated})
        return jsonify({"message": "Invalid request"})
    
    @login_required
    def put(self):
        args = parser.parse_args()
        new_name = args["name"]
        new_email = args["email"]
        new_password = args["password"]
        user = User.query.filter_by(email=current_user.email).first()
        if not user:
            return jsonify({"message": "User not found"})
        if new_email:
            user.change_email(new_email)
        if new_name:
            user.change_username(new_name)
        if new_password:
            user.change_password(new_password)
        db.session.commit()
        return jsonify(
            {"message": "User updated",
             "name": user.name,
             "email": user.email}
        )
    
    def delete(self):
        pass
    