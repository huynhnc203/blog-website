from blog_api import create_app, db, login_manager
from flask_login import LoginManager
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
        login_manager.init_app(self.app)
        from blog_api.users.management.user_management import UserAuthenticate
        api.add_resource(UserAuthenticate, "/authenticate")
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
            "/authenticate", data = json.dumps(body),
            headers={
                'Content-Type': 'application/json',
                'Type-Post': 'Register'}
        )
        self.assertEqual(response.status_code, 200)
    
    def test_login(self):
        self.test_register()
        body = {
            'email': 'test@gmail.com',
            'password': 'test'
        }
        response = self.client.post(
            "/authenticate", data = json.dumps(body),
            headers={
                'Content-Type': 'application/json',
                'Type-Post': 'Login'}
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["is_authenticated"], True)


    def test_logout(self):
        self.test_login()
        response = self.client.post(
            "/authenticate", headers={
                'Content-Type': 'application/json',
                'Type-Post': 'Logout'}
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["is_authenticated"], False)




    def test_check_authenticated(self):
        self.test_login()
        
        response = self.client.get("/authenticate")
        self.assertEqual(response.json["is_authenticated"], True)
    
    def test_update(self):
        self.test_login()
        body = {
            'name': 'new_name',
            'email': 'hello@gmail.com',
            'password': 'new_password'
        }
        response = self.client.put(
            "/authenticate", data=json.dumps(body),
            headers={
                'Content-Type': 'application/json'}
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["name"], body['name'])
        self.assertEqual(response.json["email"], body['email'])

