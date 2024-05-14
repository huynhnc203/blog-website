
from flask_restful import Resource, reqparse
from blog_api import db
from blog_api.models.posts_model import BlogPost
from blog_api.models.comments_model import Comment
from blog_api.models.tags_model import Tag
from blog_api.models.user_model import User
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity
from blog_api.utils.utils import handle_exceptions


patch_parser = reqparse.RequestParser()
patch_parser.add_argument('title', type=str)
patch_parser.add_argument('subtitle', type=str)
patch_parser.add_argument('body', type=str)

parser = reqparse.RequestParser()
parser.add_argument('title', type=str, required=True)
parser.add_argument('subtitle', type=str, required=True)
parser.add_argument('body', type=str, required=True)

class PostManagement(Resource):

    """Post management resource."""
    @handle_exceptions
    def get(self, id=None, page=None):
        if id:
            post = BlogPost.query.get(id)
            if post:
                return response_with(resp.SUCCESS_200, value=post.serialize())
            return response_with(resp.SERVER_ERROR_404, value="Post not found")
        if page:
            return response_with(
                resp.SUCCESS_200, value=[post.serialize()
                                         for post in BlogPost.query.\
                                             paginate(page=page, per_page=5).items])
        return response_with(resp.SUCCESS_200, value=[post.serialize() for post in BlogPost.query.order_by(BlogPost.date.desc()).all()])

    @jwt_required()
    @handle_exceptions
    def post(self):
        args = parser.parse_args()
        title = args['title']
        subtitle = args['subtitle']
        body = args['body']
        date = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
        author_id = get_jwt_identity()
        user = User.query.get(author_id)
        if not user:
            return response_with(resp.SERVER_ERROR_404, value="User not found")
        post = BlogPost(
            title=title,
            subtitle=subtitle,
            body=body,
            date=date,
            author=user)
        db.session.add(post)
        db.session.commit()
        return response_with(resp.SUCCESS_201, value=post.serialize())

    @jwt_required()
    @handle_exceptions
    def put(self, id):
        args = parser.parse_args()
        post = BlogPost.query.get(id)
        if not post:
            return response_with(resp.SERVER_ERROR_404, value="Post not found")
        args = parser.parse_args()
        post.title = args['title']
        post.subtitle = args['subtitle']
        post.body = args['body']
        db.session.commit()
        return response_with(resp.SUCCESS_200, value=post.serialize())

    @jwt_required()
    @handle_exceptions
    def delete(self, id):
        post = BlogPost.query.get(id)
        if not post:
            return response_with(resp.SERVER_ERROR_404, value="Post not found")

        db.session.delete(post)
        db.session.commit()
        return response_with(resp.SUCCESS_201, value = post.serialize())


    @jwt_required()
    @handle_exceptions
    def patch(self, id):
        args = patch_parser.parse_args()
        post = BlogPost.query.get(id)
        if not post:
            return response_with(resp.SERVER_ERROR_404, value="Post not found")
        if args['title']:
            post.title = args['title']
        if args['subtitle']:
            post.subtitle = args['subtitle']
        if args['body']:
            post.content = args['body']
        db.session.commit()
        return response_with(resp.SUCCESS_200, value=post.serialize())
