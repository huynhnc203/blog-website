from blog_api import db, login_manager
from flask import jsonify, request, url_for, render_template_string
from flask_restful import Resource, reqparse
from blog_api.models.models import User
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
import logging
from blog_api.utils.token import generate_verification_token
from blog_api.utils.emails import send_email

parser = reqparse.RequestParser()
parser.add_argument("email", type=str)
parser.add_argument("password", type=str)
parser.add_argument("name", type=str)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

class UserManagement(Resource):
    """User management resource."""
    
    def get(self, id=None):
        try:
            if id:
                user = User.query.get(id)
                if user:
                    return response_with(resp.SUCCESS_200, value=user.serialize())
                return response_with(resp.SERVER_ERROR_404, error="User not found")
            return response_with(resp.SUCCESS_200, value=[user.serialize() for user in User.query.all()])
        except Exception as e:
            logging.error(e)
            return response_with(resp.SERVER_ERROR_500)
    
    def post(self):
        try:
            args = parser.parse_args()
            email = args["email"]
            name = args["name"]
            password = args["password"]
            user = User.query.filter_by(email=email).first()
            if user:
                return response_with(resp.BAD_REQUEST_400, error="User already exists")
            user = User.query.filter_by(name=name).first()
            if user:
                return response_with(resp.BAD_REQUEST_400, error="User already exists")
            token = generate_verification_token(email)
            verication_email = url_for('auth.confirm_email', token=token, _external=True)
            html = render_template_string("<p>Welcome! Thanks for signing up. Please follow this link to activate your account: <a href='{{ verication_email }}'>{{ verication_email }}</a></p>", 
                                          verication_email=verication_email)
            subject = "Please verify your email"
            send_email(email, subject, html)

            user = User(name=name, email=email, password=password)

            db.session.add(user)
            db.session.commit()
            return response_with(resp.SUCCESS_201, value=user.serialize())
        except Exception as e:
            logging.error(e)
            return response_with(resp.SERVER_ERROR_500, value={"error": str(e)})
    
    def put(self, id):
        try:
            args = parser.parse_args()
            user = User.query.get(id)
            if user:
                user.name = args["name"]
                user.email = args["email"]
                user.password = args["password"]
                db.session.commit()
                return response_with(resp.SUCCESS_200, value=user.serialize())
            return response_with(resp.SERVER_ERROR_404, error="User not found")
        except Exception as e:
            logging.error(e)
            return response_with(resp.SERVER_ERROR_500)
    
    def delete(self, id):
        try:
            user = User.query.get(id)
            if user:
                db.session.delete(user)
                db.session.commit()
                return response_with(resp.SUCCESS_201, value=user.serialize())
            return response_with(resp.SERVER_ERROR_404, error="User not found")
        except Exception as e:
            logging.error(e)
            return response_with(resp.SERVER_ERROR_500)
    
    def patch(self, id):
        try:
            args = parser.parse_args()
            user = User.query.get(id)
            if user:
                if args["name"]:
                    user.name = args["name"]
                if args["email"]:
                    user.email = args["email"]
                if args["password"]:
                    user.password = args["password"]
                db.session.commit()
                return response_with(resp.SUCCESS_200, value=user.serialize())
            return response_with(resp.SERVER_ERROR_404, error="User not found")
        except Exception as e:
            logging.error(e)
            return response_with(resp.SERVER_ERROR_500)
    