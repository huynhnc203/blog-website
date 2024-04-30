from flask_restful import Api, Resource, reqparse
from blog_api import db
from blog_api.models.models import BlogPost, User, Tag, Comment
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
import json

patch_parser = reqparse.RequestParser()
patch_parser.add_argument('name', type=str)

parser = reqparse.RequestParser()
parser.add_argument('name', type=str, required=True, help='Name is required')

class TagManagement(Resource):
    def get(self, id=None):
        if id:
            tag = Tag.query.get(id)
            if tag:
                return response_with(resp.SUCCESS_200, value=tag.serialize())
            return response_with(resp.SERVE_ERROR_404, value="Tag not found")
        if tag:
            return tag.serialize()
        return response_with(resp.SUCCESS_200, value=[tag.serialize() for tag in Tag.query.all()])
    

    def post(self):
        args = parser.parse_args()
        name = args['name']
        
        # Tìm tag có tên tương ứng trong cơ sở dữ liệu
        existing_tag = Tag.query.filter_by(name=name).first()
        if existing_tag:
            return response_with(resp.INVALID_INPUT_422, message="Tag already exists")
        # Tạo một tag mới nếu không tìm thấy tag có tên tương ứng
        new_tag = Tag(name)
        new_tag.create()

        return response_with(resp.SUCCESS_201, value=new_tag.serialize())

    def put(self, id):
        tag = Tag.query.get(id)
        
        if not tag:
            return response_with(resp.SERVER_ERROR_404, value="Tag not found")

        args = parser.parse_args()
        new_name = args['name']
        
        # Kiểm tra xem có tag nào khác có cùng tên không
        existing_tag = Tag.query.filter(Tag.id != id, Tag.name == new_name).first()
        if existing_tag:
            return response_with(resp.INVALID_INPUT_422, message="Another tag with the same name already exists")

        # Cập nhật thông tin của tag
        tag.name = new_name
        db.session.commit()

        # Cập nhật các bài đăng liên quan
        related_posts = BlogPost.query.filter(BlogPost.tags.any(id=id)).all()
        for post in related_posts:
            # Xóa tag cũ ra khỏi bài đăng
            post.tags.remove(tag)
            # Thêm tag mới vào bài đăng
            post.tags.append(Tag.query.filter_by(name=new_name).first())

        return response_with(resp.SUCCESS_200, message="Tag updated successfully")

#tewiofdwqmflawnfwa    
    def delete(self, id):
        tag = Tag.query.get(id)
        if tag:
            db.session.delete(tag)
            db.session.commit()
            return response_with(resp.SUCCESS_201, value = tag.serialize())
       
        return response_with(resp.SERVER_ERROR_404, value="Tag not found")
#đánwawknnawfln