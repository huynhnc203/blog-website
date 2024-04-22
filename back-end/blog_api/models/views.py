import json
from flask.views import MethodView
from blog_api.models.models import BlogPost, User

from blog_api import db

class UserView(MethodView):
    def get(self, user_id):
        if user_id is None:
            user = BlogPost.query.all()
            return json.dumps(user)
        else:
            user = BlogPost.query.get(user_id)
            return json.dumps(user)
       

    def post(self, name, email, password):
        user = User(name, email, password)
        db.session.add(user)
        db.session.commit()
        return json.dumps(user)