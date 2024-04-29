from blog_api.test.basic_test import BasicTestCase
from blog_api import login_manager, db
from flask_restful import Api
import os
import json

class UserManagementTestCase(BasicTestCase):
    def setUp(self) -> None:
        super().setUp()
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
    
    # def test_register(self):
    #     body = {
    #         "name": "test",
    #         "password": "test",
    #         "email": "test@gmail.com",
    #     }
    #     response = self.client.post(
    #         "/authenticate", data = json.dumps(body),
    #         headers={
    #             'Content-Type': 'application/json',
    #             'Type-Post': 'Register'}
    #     )
    #     self.assertEqual(response.status_code, 200)
    
    # def test_login(self):
    #     self.test_register()
    #     body = {
    #         'email': 'test@gmail.com',
    #         'password': 'test'
    #     }
    #     response = self.client.post(
    #         "/authenticate", data = json.dumps(body),
    #         headers={
    #             'Content-Type': 'application/json',
    #             'Type-Post': 'Login'}
    #     )
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.json["is_authenticated"], True)


    # def test_logout(self):
    #     self.test_login()
    #     response = self.client.post(
    #         "/authenticate", headers={
    #             'Content-Type': 'application/json',
    #             'Type-Post': 'Logout'}
    #     )
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.json["is_authenticated"], False)




    # def test_check_authenticated(self):
    #     self.test_login()
        
    #     response = self.client.get("/authenticate")
    #     self.assertEqual(response.json["is_authenticated"], True)
    
    # def test_update(self):
    #     self.test_login()
    #     body = {
    #         'name': 'new_name',
    #         'email': 'hello@gmail.com',
    #         'password': 'new_password'
    #     }
    #     response = self.client.put(
    #         "/authenticate", data=json.dumps(body),
    #         headers={
    #             'Content-Type': 'application/json'}
    #     )
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.json["name"], body['name'])
    #     self.assertEqual(response.json["email"], body['email'])

