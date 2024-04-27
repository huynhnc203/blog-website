
from flask_restful import Api, Resource, reqparse
from blog_api import db
from blog_api.models.models import BlogPost
from flask_login import login_required, admin_required

parser = reqparse.RequestParser()
parser.add_argument('title', type=str, required=True, help='Title is required')
parser.add_argument('subtitle', type=str, required=True, help='Content is required')
parser.add_argument('content', type=str, required=True, help='Content is required')
#add more argument

class Post(Resource):
    def get(self, post_id):
    
        return {'message': 'Post not found'}

    @login_required
    def post(self, post_id):
        
        args = parser.parse_args()

        
        return {'message': 'Success post created'}

    @login_required
    def put(self, post_id):
        args = parser.parse_args()

        return {'message': 'Post not found'}

    @admin_required
    def delete(self, post_id):
       
        return {'message': 'Post not found'}
