from flask import Blueprint, request
from blog_api.utils.utils import handle_exceptions
from flask_jwt_extended import get_jwt_identity, jwt_required
from blog_api import db
from blog_api.models.user_model import User
from blog_api.models.posts_model import BlogPost
from blog_api.models.comments_model import Comment
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp

comment_blueprint = Blueprint("comment_interaction", __name__)

@comment_blueprint.route("/comment/<int:blog_id>", methods=["POST"])
@handle_exceptions
@jwt_required()
def comment(blog_id):
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
    comment = Comment(request.json.get("body"), author=user, post=blog)
    db.session.add(comment)
    db.session.commit()
    return response_with(
        resp.SUCCESS_200,
        value={
            "data" : comment.serialize()
        }
    )

@comment_blueprint.route("/comment/<int:comment_id>", methods=["DELETE"])
@handle_exceptions
@jwt_required()
def delete_comment(comment_id):
    user = User.query.get(get_jwt_identity())
    comment = Comment.query.get(comment_id)
    if not user:
        return response_with(
            resp.SERVER_ERROR_404,
            value={
                "msg" : "User not found"
            }
        )
    if not comment:
        return response_with(
            resp.SERVER_ERROR_404,
            value={
                "msg" : "Comment not found"
            }
        )
    if comment.user_id != user.id:
        return response_with(
            resp.UNAUTHORIZED_403,
            value={
                "msg" : "You are not authorized to delete this comment"
            }
        )
    db.session.delete(comment)
    db.session.commit()
    return response_with(
        resp.SUCCESS_200,
        value={
            "msg" : "Comment deleted successfully"
        }
    )

@comment_blueprint.route("/comment/<int:comment_id>", methods=["PATCH"])
@handle_exceptions
@jwt_required()
def update_comment(comment_id):
    user = User.query.get(get_jwt_identity())
    comment = Comment.query.get(comment_id)
    if not user:
        return response_with(
            resp.SERVER_ERROR_404,
            value={
                "msg" : "User not found"
            }
        )
    if not comment:
        return response_with(
            resp.SERVER_ERROR_404,
            value={
                "msg" : "Comment not found"
            }
        )
    if comment.user_id != user.id:
        return response_with(
            resp.UNAUTHORIZED_403,
            value={
                "msg" : "You are not authorized to update this comment"
            }
        )
    comment.body = request.json.get("body")
    db.session.commit()
    return response_with(
        resp.SUCCESS_200,
        value={
            "data" : comment.serialize()
        }
    )
