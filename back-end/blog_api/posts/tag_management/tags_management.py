from flask_restful import Api, Resource, reqparse
from blog_api import db
from blog_api.models.posts_model import BlogPost
from blog_api.models.tags_model import Tag
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
from blog_api.utils.utils import handle_exceptions

parser = reqparse.RequestParser()
parser.add_argument('tags', type=str, action="append")


class TagManagement(Resource):
    @handle_exceptions
    def get(self, id=None):
        if id:
            tag = Tag.query.get(id)
            if tag:
                return response_with(resp.SUCCESS_200, value=tag.serialize())
            return response_with(resp.SERVER_ERROR_404, value="Tag not found")
        args = parser.parse_args()
        tag_name = args.get('tag_name')
        if tag_name:
            tag = Tag.find_by_tag(tag_name)
            if not tag:
                return response_with(resp.SERVER_ERROR_404, value="Tag not found")
            posts = tag.posts.all()
            if not posts:
                return response_with(resp.SERVER_ERROR_404, value="No post found")
            serialized_posts = [post.serialize() for post in posts]
        
        return response_with(resp.SUCCESS_200, value=[tag.serialize() for tag in Tag.query.all()])

    @handle_exceptions
    def post(self, blog_id):
        args = parser.parse_args()
        tags = args["tags"]
        post = BlogPost.query.get(blog_id)
        if not post:
            return response_with(resp.SERVER_ERROR_404, value={"msg" : "Post not found."})
        for tag_name in tags:
            tag = Tag.find_by_tag(tag_name)
            if not tag:
                tag = Tag(tag_name)
                db.session.add(tag)
            post.tags.append(tag)
        db.session.commit()
        return response_with(resp.SUCCESS_201, value=post.serialize())
    @handle_exceptions
    def put(self, id):
        tag = Tag.query.get(id)

        if not tag:
            return response_with(resp.SERVER_ERROR_404, value="Tag not found")

        args = parser.parse_args()
        new_name = args['name']
        existing_tag = Tag.find_by_tag(new_name)
        if existing_tag:
            return response_with(resp.INVALID_INPUT_422, message="Another tag with the same name already exists")

        tag.name = new_name
        db.session.commit()

        return response_with(resp.SUCCESS_200, message="Tag updated successfully")

    @handle_exceptions
    def delete(self, id):
        tag = Tag.query.get(id)
        if tag:
            db.session.delete(tag)
            db.session.commit()
            return response_with(resp.SUCCESS_201, value = tag.serialize())

        return response_with(resp.SERVER_ERROR_404, value="Tag not found")
    
        