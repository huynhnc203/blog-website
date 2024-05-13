from flask import Blueprint, request
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
from blog_api.utils.utils import handle_exceptions
from blog_api.models.posts_model import BlogPost

trending_bp = Blueprint("trending", __name__)

@trending_bp.route("/trending", methods=["GET"])
@trending_bp.route("/trending/<int:page>", methods=["GET"])
@handle_exceptions
def get_trending_posts(page=1):
    posts = BlogPost.query.order_by(BlogPost.likes.desc()).paginate(page, 5)
    return response_with(resp.SUCCESS_200, value={"posts": [post.serialize() for post in posts.items]})