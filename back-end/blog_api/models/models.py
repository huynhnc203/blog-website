from blog_api import db
from flask_login import UserMixin
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

class BlogPost(db.Model):
    __tablename__ = "blog_posts"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), unique=True, nullable=False)
    subtitle = db.Column(db.String(250), nullable=False)
    date = db.Column(db.String(250), nullable=False)
    body = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.String(250), nullable=False)
    author = relationship("User", back_populates="posts")
    parent_id = db.Column(db.Integer, ForeignKey("users.id"))
    comments = relationship("Comment", back_populates="post")


class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    posts = relationship("BlogPost", back_populates="author")
    comments = relationship("Comment", back_populates="author")

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    

class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    author = relationship("User", back_populates="comments")
    post = relationship("BlogPost", back_populates="comments")
    user_id = db.Column(db.Integer, ForeignKey("users.id"))
    blog_id = db.Column(db.Integer, ForeignKey("blog_posts.id"))

class Follower(db.Model):
    __tablename__ = "followers"
    user_id = db.Column(db.Integer)
    follower_id = db.Column(db.Integer)
    db.PrimaryKeyConstraint(user_id, follower_id)
