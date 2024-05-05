from test.test_api import TestAPI
import json

class TestUserManagement(TestAPI):
    def setUp(self) -> None:
        super().setUp()        

    def test_get(self):
        self.test_post()
        response = self.client.get("/api/users")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/api/user/1")
        self.assertEqual(response.status_code, 200)
    
    def test_post(self):
        for i in range(5):
            body = {
                "name": f"test_{i}",
                "password": "test",
                "email": f"test_{i}@gmail.com"
            }
            response = self.client.post(
                "/api/users", data=json.dumps(body),
                headers={
                    'Content-Type': 'application/json'
                }
            )
            self.assertEqual(response.status_code, 201)
        response = self.client.get("/api/users")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json['data']), 5)
    
    def test_put(self):
        self.test_post()
        body = {
            "name": "test",
            "password": "test",
            "email": "test"
        }
        response = self.client.put(
            "/api/user/1", data=json.dumps(body),
            headers={
                'Content-Type': 'application/json'
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['data']['name'], "test")
        self.assertEqual(response.json['data']['email'], "test")
    
    def test_delete(self):
        self.test_post()
        response = self.client.delete("/api/user/1")
        self.assertEqual(response.status_code, 201)
        response = self.client.get("/api/users")
        self.assertEqual(len(response.json['data']), 4)
        response = self.client.delete("/api/user/1")
        self.assertEqual(response.status_code, 404)
        response = self.client.get("/api/users")
        self.assertEqual(len(response.json['data']), 4)

    def test_patch(self):
        self.test_post()
        body = {
            "name": "hallo"
        }
        response = self.client.patch(
            "/api/user/1", data=json.dumps(body),
            headers={
                'Content-Type': 'application/json'
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['data']['name'], "hallo")