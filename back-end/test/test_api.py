from blog_server import db
from test.basic_test import BasicTestCase
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
        from blog_server.services.users.views.users_resources import UserManagement
        from blog_server.services.posts.views.post_resources import PostManagement
        from blog_server.services.users.authenticate.authenticate import auth_blueprint
        from blog_server.services.posts.tags.tags_resources import TagManagement
        api.add_resource(UserManagement, "/api/users", "/api/user/<int:id>")
        api.add_resource(PostManagement, "/api/posts", "/api/posts/<int:id>")
        api.add_resource(TagManagement, "/api/tags", "/api/tags/<int:id>")
        self.app.register_blueprint(auth_blueprint, url_prefix="/api/authenticate")
        self.client = self.app.test_client()

    def tearDown(self) -> None:
        os.remove(self.test_db_file)