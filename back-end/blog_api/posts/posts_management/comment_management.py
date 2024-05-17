from flask_restful import Resource, reqparse
from flask_paginate import Pagination
from blog_api import db
from blog_api.models.models import Comment
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
import json

patch_parser = reqparse.RequestParser()
patch_parser.add_argument('body', type=str)
patch_parser.add_argument('author_id', type=int)
patch_parser.add_argument('post_id', type=int)

parser = reqparse.RequestParser()
parser.add_argument('body', type=str, required=True, help="Body of the comment is required")
parser.add_argument('author_id', type=int, required=True, help="Author ID of the comment is required")
parser.add_argument('post_id', type=int, required=True, help="Post ID of the comment is required")

class CommentManagement(Resource):

    """Comment management resource."""

    def get(self, id=None):
        args = parser.parse_args()
        page = args.get('page', 1)
        per_page = args.get('per_page', 10)
        
        comments = Comment.query.paginate(page=page, per_page=per_page, error_out=False)

        if not comments.items:
            return response_with(resp.SERVER_ERROR_404, value="Comment not found")
        pagination = {
            'total_pages': comments.page,
            'total_comments': comments.total,
            'current_page': comments.page,
            'next_page': comments.next_num if comments.has_next else None,
            'prev_page': comments.prev_num if comments.has_prev else None,
            'per_page': per_page
        }
        return response_with(resp.SUCCESS_200, value=[comment.serialize() for comment in comments.items], pagination=pagination)

    def post(self):
        args = parser.parse_args()
        body = args['body']
        author_id = args['author_id']
        post_id = args['post_id']
        
        comment = Comment(
            body=body,
            author_id=author_id,
            post_id=post_id
        )
        db.session.add(comment)
        db.session.commit()
        return response_with(resp.SUCCESS_201, value=comment.serialize())

    def put(self, id):
        comment = Comment.query.get(id)
        if not comment:
            return response_with(resp.SERVER_ERROR_404, value="Comment not found")

        args = parser.parse_args()
        new_body = args['body']

        # Lưu lại body cũ để so sánh sau khi cập nhật
        old_body = comment.body

        # Cập nhật thông tin của comment
        comment.body = new_body
        db.session.commit()

        # Cập nhật thông tin của blogpost tương ứng
        post = comment.post
        if post:
            # Lặp qua các comment của bài đăng
            for c in post.comments:
                # Nếu comment này trùng với comment vừa được cập nhật, cập nhật lại body
                if c.id == comment.id:
                    c.body = new_body
            db.session.commit()

        return response_with(resp.SUCCESS_200, value=comment.serialize())


    def delete(self, id):
        comment = Comment.query.get(id)
        if not comment:
            return response_with(resp.SERVER_ERROR_404, value="Comment not found")
        db.session.delete(comment)
        db.session.commit()
        return response_with(resp.SUCCESS_204, value="Comment deleted successfully")
