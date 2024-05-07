from flask import Blueprint, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from blog_api.models.user_model import User
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
from blog_api.utils.utils import handle_exceptions
from blog_api import db

follow_blueprint = Blueprint("follow_apis", __name__)

@follow_blueprint.route("/follow/<int:user_id>", methods=["POST"])
@jwt_required()
@handle_exceptions
def follow_user(user_id):
    current_user = User.query.get(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return response_with(resp.BAD_REQUEST_400, value={"error": "User not found"})
    followed_user_exists = user in current_user.followings
    if followed_user_exists:
        return response_with(resp.BAD_REQUEST_400, value={"error": "User already followed"})
    current_user.followings.append(user)
    db.session.commit()
    return response_with(resp.SUCCESS_200,
                         value={"message": "User followed",
                                "following": user.serialize(),
                                "followers": current_user.serialize()})

@follow_blueprint.route("/unfollow/<int:user_id>", methods=["POST"])
@jwt_required()
@handle_exceptions
def unfollow_user(user_id):
    current_user = User.query.get(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return response_with(resp.BAD_REQUEST_400, value={"error": "User not found"})
    followed_user_exists = user in current_user.followings
    if not followed_user_exists:
        return response_with(resp.BAD_REQUEST_400, value={"error": "User not followed"})
    current_user.followings.remove(user)
    db.session.commit()
    return response_with(resp.SUCCESS_200,
                         value={"message": "User unfollowed",
                                "following": user.serialize(),
                                "followers": current_user.serialize()})


