from flask_restful import Api, Resource, reqparse
from blog_server import db
from blog_server.models.tags_model import Tag
from blog_server.models.posts_model import BlogPost
from blog_server.utils.responses import response_with
from blog_server.utils.utils import handle_exceptions
import blog_server.utils.responses as resp

parser = reqparse.RequestParser()
parser.add_argument('tags', type=str, action="append", required=True)
parser.add_argument('post_id', type=int, required=True)

class TagManagement(Resource):
    @handle_exceptions
    def get(self, id=None):
        if id:
            tag = Tag.query.get(id)
            if tag:
                return response_with(resp.SUCCESS_200, value=tag.serialize())
            return response_with(resp.SERVER_ERROR_404, value="Tag not found")
        return response_with(resp.SUCCESS_200, value=[tag.serialize() for tag in Tag.query.all()])
    
    @handle_exceptions
    def post(self):
        arg = parser.parse_args()
        tags = arg["tags"]
        post_id = arg["post_id"]
        post = BlogPost.query.get(post_id)
        if not post:
            return response_with(
                resp.BAD_REQUEST_400,
                value={
                    "message": "Post not found"
                }
            )
        for tag_name in tags:
            tag = Tag.find_by_tag(tag_name)
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)
                tag.posts.append(post)
                post.tags.append(tag)
        db.session.commit()

        return response_with(
            resp.SUCCESS_201,
            value={
                "tag" : tags,
                "post_id" : post_id
            }
        )


    @handle_exceptions
    def delete(self, id):
        tag = Tag.query.get(id)
        if tag:
            db.session.delete(tag)
            db.session.commit()
            return response_with(resp.SUCCESS_201, value = tag.serialize())
       
        return response_with(resp.SERVER_ERROR_404, value="Tag not found")