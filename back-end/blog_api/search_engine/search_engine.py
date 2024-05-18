from flask import Blueprint, request
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
from blog_api.utils.utils import handle_exceptions
from blog_api.models.posts_model import BlogPost
from blog_api.models.tags_model import Tag
from blog_api.models.user_model import User

search_engine_bp = Blueprint("search_engine", __name__)

@search_engine_bp.route("/search", methods=["POST"])
@handle_exceptions
def search():
    query = request.json.get("query", None)
    if not query:
        return response_with(resp.BAD_REQUEST_400)
    posts = BlogPost.query.filter(BlogPost.title.contains(query) | BlogPost.subtitle.contains(query) | BlogPost.body.contains(query)).all()
    tags = Tag.query.filter(Tag.name.contains(query)).all()
    users = User.query.filter(User.name.contains(query)).all()
    return response_with(resp.SUCCESS_200, value={"posts": [post.serialize() for post in posts], "tags": [tag.serialize() for tag in tags], "users": [user.serialize() for user in users]})