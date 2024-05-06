from flask import Blueprint
from blog_api.utils.utils import handle_exceptions
from flask_jwt_extended import get_jwt_identity, jwt_required
from blog_api import db
from blog_api.models.user_model import User
from blog_api.models.posts_model import BlogPost
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp

like_blueprint = Blueprint("like_interaction", __name__)

@like_blueprint.route("/like/<int:blog_id>", methods=["POST"])
@handle_exceptions
@jwt_required()
def like(blog_id):
    user = User.query.get(get_jwt_identity())
    blog = BlogPost.query.get(blog_id)
    if not user:
        return response_with(
            resp.SERVER_ERROR_404,
            value={
                "msg" : "User not found"
            }
        )
    if not blog:
        return response_with(
            resp.SERVER_ERROR_404,
            value={
                "msg" : "Blog Post not found"
            }
        )
    if blog in user.liked_posts:
        return response_with(
            resp.BAD_REQUEST_400,
            value={
                "msg" : "Blog Post already liked"
            }
        )
    user.liked_posts.append(blog)
    db.session.commit()
    return response_with(
        resp.SUCCESS_200,
        value={
            "data" : blog.serialize()
        }
    )

@like_blueprint.route("/unlike/<int:blog_id>", methods=["POST"])
@handle_exceptions
@jwt_required()
def unlike(blog_id):
    user = User.query.get(get_jwt_identity())
    blog = BlogPost.query.get(blog_id)
    if not user:
        return response_with(
            resp.SERVER_ERROR_404,
            value={
                "msg" : "User not found"
            }
        )
    if not blog:
        return response_with(
            resp.SERVER_ERROR_404,
            value={
                "msg" : "Blog Post not found"
            }
        )
    if not blog in user.liked_posts:
        return response_with(
            resp.BAD_REQUEST_400,
            value={
                "msg" : "Blog Post not liked"
            }
        )
    user.liked_posts.remove(blog)
    db.session.commit()
    return response_with(
        resp.SUCCESS_200,
        value={
            "data" : blog.serialize()
        }
    )
