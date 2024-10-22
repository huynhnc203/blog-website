import os

from blog_api import db
from flask import url_for, render_template_string
from flask_restful import Resource, reqparse
from blog_api.models.user_model import User
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
import logging
from blog_api.utils.token import generate_verification_token
from blog_api.utils.emails import send_email
from datetime import datetime
from flask_jwt_extended import jwt_required
from blog_api.utils.utils import handle_exceptions

parser = reqparse.RequestParser()
parser.add_argument("email", type=str, required=True)
parser.add_argument("password", type=str, required=True)
parser.add_argument("name", type=str, required=True)

patch_parser = reqparse.RequestParser()
patch_parser.add_argument("email", type=str)
patch_parser.add_argument("password", type=str)
patch_parser.add_argument("name", type=str)
patch_parser.add_argument("profile_pic", type=str)
patch_parser.add_argument("description", type=str)
patch_parser.add_argument("birth_date", type=str)
patch_parser.add_argument("github", type=str)
patch_parser.add_argument("linkedin", type=str)
patch_parser.add_argument("twitter", type=str)
patch_parser.add_argument("followers", type=int, action="append")

class UserManagement(Resource):
    """User management resource."""

    @handle_exceptions
    def get(self, id=None):
        if id:
            user = User.query.get(id)
            if user:
                return response_with(resp.SUCCESS_200, value=user.serialize())
            return response_with(resp.SERVER_ERROR_404, error="User not found")
        return response_with(resp.SUCCESS_200, value=[user.serialize() for user in User.query.all()])

    @handle_exceptions
    def post(self):
        args = parser.parse_args()
        email = args["email"]
        name = args["name"]
        password = args["password"]
        user = User.query.filter_by(email=email).first()
        if user:
            return response_with(resp.BAD_REQUEST_400, error="Username already exists")
        user = User.query.filter_by(name=name).first()
        if user:
            return response_with(resp.BAD_REQUEST_400, error="Email already exists")
        token = generate_verification_token(email)
        verication_email = os.getenv("external_url") + url_for("auth.confirm_email", token=token)
        html = render_template_string("<p>Welcome! Thanks for signing up. Please follow this link to activate your account: <a href='{{ verication_email }}'>{{ verication_email }}</a></p>",
                                      verication_email=verication_email)
        subject = "Please verify your email"
        send_email(email, subject, html)

        user = User(name=name, email=email, password=password, created_at=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))

        db.session.add(user)
        db.session.commit()
        return response_with(resp.SUCCESS_201, value=user.serialize())

    @jwt_required()
    @handle_exceptions
    def put(self, id):
        args = parser.parse_args()
        user = User.query.get(id)
        if user:
            user.name = args["name"]
            user.email = args["email"]
            user.password = args["password"]
            db.session.commit()
            return response_with(resp.SUCCESS_200, value=user.serialize())
        return response_with(resp.SERVER_ERROR_404, error="User not found")
    @jwt_required()
    @handle_exceptions
    def delete(self, id):
        user = User.query.get(id)
        if user:
            user.delete()
            return response_with(resp.SUCCESS_201, value=user.serialize())
        return response_with(resp.SERVER_ERROR_404, error="User not found")
    @jwt_required()
    @handle_exceptions
    def patch(self, id):
        args = patch_parser.parse_args()
        user = User.query.get(id)
        if user:
            if args["name"]:
                user.name = args["name"]
            if args["email"]:
                user.email = args["email"]
            if args["password"]:
                user.change_password(args["password"])
            if args["profile_pic"]:
                user.profile_pic = args["profile_pic"]
            if args["description"]:
                user.description = args["description"]
            if args["birth_date"]:
                user.birth_date = args["birth_date"]
            if args["github"]:
                user.github = args["github"]
            if args["linkedin"]:
                user.linkedin = args["linkedin"]
            if args["twitter"]:
                user.twitter = args["twitter"]
            if args["followers"]:
                followers = args["followers"]
                for follower_id in followers:
                    follower = User.query.get(follower_id)
                    follower.follow(user)
            db.session.commit()
            return response_with(resp.SUCCESS_200, value=user.serialize())
        return response_with(resp.SERVER_ERROR_404, error="User not found")
    