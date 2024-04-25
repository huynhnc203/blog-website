from blog_api import create_app, db
from flask_restful import Api
import os
import unittest
import tempfile
import json

class UserManagementTestCase(unittest.TestCase):
    def setUp(self) -> None:
        test_config = {}
        self.test_db_file = tempfile.mkstemp()[1]
        test_config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{self.test_db_file}"
        test_config["TESTING"] = True
        self.app = create_app(alt_config=test_config)
        db.init_app(self.app)
        with self.app.app_context():
            db.create_all()
        api = Api(self.app)
        from blog_api.users.management.user_management import UserRegister, UserLogin
        api.add_resource(UserRegister, "/register")
        api.add_resource(UserLogin, "/login")
        self.client = self.app.test_client()
    
    def tearDown(self) -> None:
        os.remove(self.test_db_file)
    
    def test_register(self):
        body = {
            "name": "test",
            "password": "test",
            "email": "test@gmail.com",
        }
        response = self.client.post(
            "/register", data = json.dumps(body),
            headers={'Content-Type': 'application/json'}
        )
        self.assertEqual(response.status_code, 200)