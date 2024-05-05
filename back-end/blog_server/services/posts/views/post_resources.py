
from flask_restful import Api, Resource, reqparse
from blog_server import db
from blog_server.models.posts_model import BlogPost
from blog_server.models.user_model import User
from blog_server.models.tags_model import Tag
from blog_server.models.comments_model import Comment
from blog_server.utils.responses import response_with
import blog_server.utils.responses as resp
from datetime import datetime
from blog_server.utils.utils import handle_exceptions


patch_parser = reqparse.RequestParser()
patch_parser.add_argument('title', type=str)
patch_parser.add_argument('subtitle', type=str)
patch_parser.add_argument('body', type=str)
patch_parser.add_argument('author_id', type=int)

parser = reqparse.RequestParser()
parser.add_argument('title', type=str, required=True)
parser.add_argument('subtitle', type=str, required=True)
parser.add_argument('body', type=str, required=True)
parser.add_argument('author_id', type=int, required=False)

class PostManagement(Resource):

    """Post views resource."""

    @handle_exceptions
    def get(self, id=None, page=None):
        if id:
            post = BlogPost.query.get(id)
            if post:
                return response_with(resp.SUCCESS_200, value=post.serialize())

            return response_with(resp.SERVER_ERROR_404, value="Post not found")
        post = BlogPost.query.get(id)
        if post:
            return post.serialize()
        if page:
            return response_with(resp.SUCCESS_200,
                                 value=[post.serialize() for post in BlogPost.query.paginate(page=page, per_page=5)\
                                 .items])
        return response_with(resp.SUCCESS_200, value=[post.serialize() for post in BlogPost.query.all()])

    @handle_exceptions
    def post(self):
        args = parser.parse_args()
        title = args['title']
        subtitle = args['subtitle']
        body = args['body']
        date = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
        author_id = args['author_id']
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

    @handle_exceptions
    def put(self, id):
        args = parser.parse_args()
        post = BlogPost.query.get(id)
        if post:
            args = parser.parse_args()
            post.title = args['title']
            post.subtitle = args['subtitle']
            post.body = args['body']
            db.session.commit()
            return response_with(resp.SUCCESS_200, value=post.serialize())

        return response_with(resp.SERVER_ERROR_404, value="Post not found")
    @handle_exceptions
    def delete(self, id):
        post = BlogPost.query.get(id)
        if post:
            db.session.delete(post)
            db.session.commit()
            return response_with(resp.SUCCESS_201, value = post.serialize())

        return response_with(resp.SERVER_ERROR_404, value="Post not found")
    @handle_exceptions
    def patch(self, id):
        args = patch_parser.parse_args()
        post = BlogPost.query.get(id)
        if post:
            if args['title']:
                post.title = args['title']
            if args['subtitle']:
                post.subtitle = args['subtitle']
            if args['body']:
                post.content = args['body']
            db.session.commit()
            return response_with(resp.SUCCESS_200, value=post.serialize())
        return response_with(resp.SERVER_ERROR_404, value="Post not found")


