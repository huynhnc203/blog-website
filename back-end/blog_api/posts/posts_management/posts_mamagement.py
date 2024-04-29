
from flask_restful import Api, Resource, reqparse
from blog_api import db
from blog_api.models.models import BlogPost, User, Tag, Comment
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
import json


patch_parser = reqparse.RequestParser()
patch_parser.add_argument('title', type=str)
patch_parser.add_argument('subtitle', type=str)
patch_parser.add_argument('body', type=str)
patch_parser.add_argument('author_id', type=int)
patch_parser.add_argument('tags', type=str, action='append')
patch_parser.add_argument('date', type=str)
patch_parser.add_argument('comments', type=list[dict], location='json')
patch_parser.add_argument('likes', type=int, action='append')

parser = reqparse.RequestParser()
parser.add_argument('title', type=str, required=True)
parser.add_argument('subtitle', type=str, required=True)
parser.add_argument('body', type=str, required=True)
parser.add_argument('author_id', type=int, required=False)
parser.add_argument('tags', type=str, required=False, action='append')
parser.add_argument('date', type=str, required=True)
parser.add_argument('comments', required=False, location='json', type=list[dict])
parser.add_argument('likes', required=False, type=int, action='append')

class PostManagement(Resource):

    """Post management resource."""

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
            return response_with(resp.SUCCESS_200, value=[post.serialize() for post in BlogPost.query.paginate(page=page, per_page=5).items])
        return response_with(resp.SUCCESS_200, value=[post.serialize() for post in BlogPost.query.all()])

    
    def post(self):
        args = parser.parse_args()
        title = args['title']
        subtitle = args['subtitle']
        body = args['body']
        date = args['date']
        author_id = args['author_id']
        tags = args['tags']
        user = User.query.get(author_id)
        if not user:
            return response_with(resp.SERVER_ERROR_404, value="User not found")
        post = BlogPost(
            title=title,
            subtitle=subtitle,
            body=body,
            date=date,
            author=user)
        for t in tags:
            tag = Tag.find_by_tag(t)
            if not tag:
                tag = Tag(t)
                tag.create()
            post.tags.append(tag)
        db.session.add(post)
        db.session.commit()
        return response_with(resp.SUCCESS_201, value=post.serialize())

    
    def put(self, id):
        args = parser.parse_args()
        post = BlogPost.query.get(id)
        if post:
            args = parser.parse_args()
            post.title = args['title']
            post.subtitle = args['subtitle']
            post.content = args['body']
            author = User.query.get(args['author_id'])
            if not author:
                return response_with(resp.SERVER_ERROR_404, value="User not found")
            post.author = author
            db.session.commit()
            return response_with(resp.SUCCESS_200, value=post.serialize())

        return response_with(resp.SERVER_ERROR_404, value="Post not found")

    def delete(self, id):
        post = BlogPost.query.get(id)
        if post:
            db.session.delete(post)
            db.session.commit()
            return response_with(resp.SUCCESS_201, value = post.serialize())
       
        return response_with(resp.SERVER_ERROR_404, value="Post not found")
    
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
            if args['author_id']:
                author = User.query.get(args['author_id'])
                if not author:
                    return response_with(resp.SERVER_ERROR_404, value="User not found")
                post.author = author
            if args['tags']:
                post.tags.clear()
                for t in args['tags']:
                    tag = Tag.find_by_tag(t)
                    if not tag:
                        tag = Tag(t)
                        tag.create()
                    post.tags.append(tag)
            if args['date']:
                post.date = args['date']
            if args['comments']:
                comments = args['comments']
                for comment in comments:
                    new_comment = Comment(
                        body=comment['body'],
                        author=User.query.get(comment['author_id']),
                        post=post
                    )
                    db.session.add(new_comment)
            if args['likes']:
                likes = args['likes']
                for like in likes:
                    user = User.query.get(like)
                    if not user:
                        return response_with(resp.SERVER_ERROR_404, value="User not found")
                    user.liked_posts.append(post)
            db.session.commit()
            return response_with(resp.SUCCESS_200, value=post.serialize())
        return response_with(resp.SERVER_ERROR_404, value="Post not found")
