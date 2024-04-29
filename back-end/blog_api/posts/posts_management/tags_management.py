from flask_restful import Api, Resource, reqparse
from blog_api import db
from blog_api.models.models import Tag
from blog_api.models.models import BlogPost
from flask_login import login_required, admin_required

parser = reqparse.RequestParser()
parser.add_argument('name', type=str, required=True, help='Name is required')

class Tag(Resource):
    def get(self, tag_id):
        tag = Tag.query.get(tag_id)
        if tag:
            return tag.serialize()
        return {'message': 'Tag not found'}
    
    def post(self, tag_id):
        args = parser.parse_args()
        tag = Tag(name = args['name'])
        db.session.add(tag)
        db.session.commit()
        return {'message': 'Tag created successfully'}
    
    def put(self, tag_id):
        tag = Tag.query.get(tag_id)
        #cap nhap thong tin tag
        if tag:
            args = parser.parse_args()
            tag.name = args['name']
            db.session.commit()
            return {'message': 'Tag update successfully'}
        #cap nhap cac blogpost lien quan
        related_posts = BlogPost.query.filter(BlogPost.tags.any(id = tag_id)).all()
        for post in related_posts:
            post.tags.append(tag)
        return {'message': 'Tag not found'}
    
    def delete(self, tag_id):
        tag = Tag.query.get(tag_id)
        if tag:
            db.session.delete(tag)
            db.session.commit()
            return {'message': 'Tag deleted successfully'}
        return {'message': 'Tag not found'}