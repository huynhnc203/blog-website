import requests
import json

with open("data.json", "r") as f:
    resp = json.load(f)

users = requests.get('http://localhost:8000/api/users')

users = json.loads(users.content)

for post in resp:
    author_id = None
    for user in users['data']:
        if user['email'] == post['user']['email']:
            author_id = user['id']
            break
    if author_id:
        body = {
            "title" : post["title"],
            "subtitle" : "Technology lead",
            "body" : post["content"],
            "author_id" : author_id
        }
        #run the server before running this script
        response = requests.post('http://localhost:8000/api/posts',
                                 data=json.dumps(body),
                                 headers={"Content-Type" : "application/json"})
        print(response.content)



