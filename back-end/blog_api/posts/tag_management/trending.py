from flask import Blueprint
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
from blog_api.utils.utils import handle_exceptions
from blog_api.models.tags_model import Tag

tag_trending_bp = Blueprint("tags_trending", __name__)

@tag_trending_bp.route("/trending", methods=["GET"])
@tag_trending_bp.route("/trending/<int:page>", methods=["GET"])
@handle_exceptions
def get_trending_tags(page=1):
    tags = Tag.query.order_by(Tag.posts.desc()).paginate(page, 5)
    return response_with(resp.SUCCESS_200, value={"tags": [tag.serialize() for tag in tags.items]})

