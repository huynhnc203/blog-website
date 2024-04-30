from blog_api import db
from blog_api.test.basic_test import BasicTestCase
from flask_restful import Api
import os
from abc import ABC

class TestAPI(BasicTestCase, ABC):
    def setUp(self) -> None:
        super().setUp()
        api = Api(self.app)
        db.init_app(self.app)
        with self.app.app_context():
            db.create_all()
        from blog_api.users.management.user_management import UserManagement
        from blog_api.posts.posts_management.posts_mamagement import PostManagement
        from blog_api.users.authenticate.authenticate import auth_blueprint
        api.add_resource(UserManagement, "/api/users", "/api/user/<int:id>")
        api.add_resource(PostManagement, "/api/posts", "/api/posts/<int:id>")
        self.app.register_blueprint(auth_blueprint, url_prefix="/api/authenticate")
        self.client = self.app.test_client()

    def tearDown(self) -> None:
        os.remove(self.test_db_file)