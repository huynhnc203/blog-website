from blog_api.test.test_api import TestAPI
from blog_api import login_manager, db
from flask_restful import Api
import os
import json

class TestAuthenticate(TestAPI):
    def setUp(self) -> None:
        super().setUp()
        self.client = self.app.test_client()
    
    def tearDown(self) -> None:
        os.remove(self.test_db_file)
    
    def test_user_registration(self):
        response = self.client.post(
            "/api/users",
            data=json.dumps({
                "name": "test",
                "email": "ibow2036@gmail.com",
                "password": "password"
            }),
            headers={"Content-Type": "application/json"}
        )
        self.assertEqual(response.status_code, 201)

    def test_user_login(self):
        self.test_user_registration()
        response = self.client.post(
            "/api/authenticate/login",
            data=json.dumps({
                "email": "ibow2036@gmail.com",
                "password": "password"
            }),
            headers={"Content-Type": "application/json"}
        )
        self.assertEqual(response.status_code, 201)