from flask import Blueprint
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
from blog_api.utils.utils import handle_exceptions
from blog_api.models.posts_model import BlogPost

post_trending_bp = Blueprint("posts_trending", __name__)

@post_trending_bp.route("/trending", methods=["GET"])
@post_trending_bp.route("/trending/<int:page>", methods=["GET"])
@handle_exceptions
def get_trending_posts(page=1):
    posts = BlogPost.query.order_by(BlogPost.likes.desc()).paginate(page, 5)
    return response_with(resp.SUCCESS_200, value={"posts": [post.serialize() for post in posts.items]})