from flask import Blueprint, request, send_from_directory, current_app
from werkzeug.utils import secure_filename
from blog_api.utils.responses import response_with
import blog_api.utils.responses as resp
from blog_api.utils.utils import handle_exceptions
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
from blog_api.models.user_model import User
from blog_api import db

allowed_extensions = ['image/jpeg', 'image/png', 'jpeg']
avatar_upload_bp = Blueprint("avatar_upload", __name__)
def allowed_file(filename):
    return filename in allowed_extensions

@avatar_upload_bp.route("/upload", methods=["POST"])
@handle_exceptions
@jwt_required()
def upload_avatar():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return response_with(resp.SERVER_ERROR_404, value={"msg": "User not found"})
    file = request.files['avatar']
    if file.filename == '':
        return response_with(resp.BAD_REQUEST_400, value={"msg": "No selected file"})
    if file and allowed_file(file.content_type):
        filename = secure_filename(file.filename)
        file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        user.profile_pic = filename
        db.session.commit()
        return response_with(resp.SUCCESS_201, value={"msg": "File uploaded successfully"})

    return response_with(resp.BAD_REQUEST_400, value={"msg": "File type not allowed"})

@avatar_upload_bp.route("/get_avatar/<filename>", methods=["GET"])
@handle_exceptions
def get_avatar(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)
