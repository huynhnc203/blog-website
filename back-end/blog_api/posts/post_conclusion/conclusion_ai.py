from flask import Blueprint
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
from blog_api.utils.utils import handle_exceptions
from blog_api.models.posts_model import BlogPost
from blog_api import ai

conclusion_bp = Blueprint("conclusion_engine", __name__)

@conclusion_bp.route("/conclusion/<int:id>", methods=["GET"])
@handle_exceptions
def generate_conclusion(id):
    post = BlogPost.query.get(id)
    if not post:
        return response_with(resp.BAD_REQUEST_400)
    conclusion = ai.generate_conclusion(post.body)
    return response_with(resp.SUCCESS_200, value={"conclusion": conclusion})