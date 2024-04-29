from blog_api.test.test_api import TestAPI
from blog_api import db
import json

class TestPostManagement(TestAPI):
    def setUp(self) -> None:
        super().setUp()

    def test_get(self):
        self.test_post()
        response = self.client.get("/api/posts")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/api/posts/1")
        self.assertEqual(response.status_code, 200)
    
    def test_post(self):
        for i in range(10):
            author = {
                "name": f"test_{i}",
                "password": "test",
                "email": f"test_{i}.gmail.com"
            }
            response = self.client.post(
                "/api/users", data=json.dumps(author),
                headers={
                    'Content-Type': 'application/json'
                }
            )
            self.assertEqual(response.status_code, 201)
        
        all_posts = []

        for i in range(5):
            body = {
                "title": f"test_{i}",
                "subtitle": "test",
                "body": "test",
                "date": "test",
                "author_id": 1,
                "tags": ["test", "hello"]
            }
            all_posts.append(body)
            response = self.client.post(
                "/api/posts", data=json.dumps(body),
                headers={
                    'Content-Type': 'application/json'
                }
            )
            self.assertEqual(response.status_code, 201)
        response = self.client.get("/api/posts")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json['data']), 5)
        for res in response.json['data']:
            self.assertEqual(len(res['tags']), 2)
    
    def test_put(self):
        self.test_post()
        body = {
            "title": "test",
            "subtitle": "test",
            "body": "test",
            "date": "test",
            "author_id": 1,
            "tags": ["test", "hello"],
            "comment" : {
                "body": "test",
                "author_id": 1
            },
        }
        response = self.client.put(
            "/api/posts/1", data=json.dumps(body),
            headers={
                'Content-Type': 'application/json'
            }
        )
        self.assertEqual(response.status_code, 200)
        response = self.client.put(
            "/api/posts/100", data=json.dumps(body),
            headers={
                'Content-Type': 'application/json'
            }
        )
        self.assertEqual(response.status_code, 404)
    
    def test_patch(self):
        self.test_post()
        body = {
            "title": "test",
            "subtitle": "test",
            "body": "test",
            "date": "test",
            "author_id": 1,
            "tags": ["test", "hello"],
            "comments" : [{
                "body": "test",
                "author_id": 1
            }],
            "likes" : [1],
        }
        response = self.client.patch(
            "/api/posts/1", data=json.dumps(body),
            headers={
                'Content-Type': 'application/json'
            }
        )
        self.assertEqual(response.status_code, 200)
        response = self.client.patch(
            "/api/posts/100", data=json.dumps(body),
            headers={
                'Content-Type': 'application/json'
            }
        )
        self.assertEqual(response.status_code, 404)
    

    def test_like(self):
        self.test_post()
        body = {
            "likes" : [1],
        }
        response = self.client.patch(
            "/api/posts/1", data=json.dumps(body),
            headers={
                'Content-Type': 'application/json'
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['data']['likes'], 1)
        