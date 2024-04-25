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
    author_id = db.Column(db.Integer, ForeignKey("users.id"))
    author = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post")

    def __init__(self, title, subtitle, date, body, img_url, author):
        self.title = title
        self.subtitle = subtitle
        self.date = date
        self.body = body
        self.img_url = img_url
        self.author = author
    
    def __repr__(self):
        return f"<Post {self.title}>"


class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False, unique=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    posts = relationship("BlogPost", back_populates="author")
    comments = relationship("Comment", back_populates="author")
    # folowers = relationship("Follower", back_populates="user")
    # following = relationship("Follower", back_populates="follower")
    # user_id = db.Column(db.Integer, ForeignKey("followers.user_id"))
    # folowers_id = db.Column(db.Integer, ForeignKey("followers.follower_id"))

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def __repr__(self):
        return f"<User {self.name}>"
    
# class Follower(db.Model):
#     __tablename__ = "followers"
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, ForeignKey("users.id"))
#     follower_id = db.Column(db.Integer, ForeignKey("users.id"))
#     user = relationship("User", back_populates="folowers", foreign_keys=[user_id])
#     follower = relationship("User", back_populates="following", foreign_keys=[follower_id])
#     def __repr__(self):
#         return f"<Follower {self.user_id} is followed by {self.follower_id}>"


class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    author = relationship("User", back_populates="comments")
    post = relationship("BlogPost", back_populates="comments")
    author_id = db.Column(db.Integer, ForeignKey("users.id"))
    blog_id = db.Column(db.Integer, ForeignKey("blog_posts.id"))

    def __init__(self, body, author, post):
        self.body = body
        self.author = author
        self.post = post

    def __repr__(self):
        return f"<Comment {self.body}>"