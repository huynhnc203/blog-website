"""
Module docstring: This module imports data from a JSON file and adds it to a database.
"""

import json
import requests

with open("data.json", "r", encoding="utf-8") as f:
    resp = json.load(f)

users = requests.get('http://localhost:8000/api/users', timeout=10)

users = json.loads(users.content)
for post in resp:
    found_author_id = None
    for user in users['data']:
        if user['email'] == post['user']['email']:
            found_author_id = user['id']
            break
    if found_author_id:
        body = {
            "title" : post["title"],
            "subtitle" : "Technology lead",
            "body" : post["content"],
            "author_id" : found_author_id
        }
        response = requests.post('http://localhost:8000/api/posts',
                                 data=json.dumps(body),
                                 headers={"Content-Type" : "application/json"}, 
                                 timeout=10)
        print(response.content)