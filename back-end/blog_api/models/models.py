from blog_api import db
from flask_login import UserMixin
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash


follow_rel = db.Table(
    'follow_rel',
    db.Column('follower_id', db.Integer, ForeignKey('users.id')),
    db.Column('followed_id', db.Integer, ForeignKey('users.id'))
)

likes = db.Table(
    'likes',
    db.Column('user_id', db.Integer, ForeignKey('users.id')),
    db.Column('post_id', db.Integer, ForeignKey('blog_posts.id'))
)

tags = db.Table(
    'tags', 
    db.Column('tag_id', db.Integer, ForeignKey('tag.id')),
    db.Column('post_id', db.Integer, ForeignKey('blog_posts.id'))
)

class Tag(db.Model):
    __tablename__ = "tag"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

    def create(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_tag(cls, tag_name):
        return cls.query.filter_by(name=tag_name).first()

    def __repr__(self):
        return f"<Tag {self.name}>"

class BlogPost(db.Model):
    __tablename__ = "blog_posts"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), unique=True, nullable=False)
    subtitle = db.Column(db.String(250), nullable=False)
    date = db.Column(db.String(250), nullable=False)
    body = db.Column(db.Text, nullable=False)
    images = relationship("Image", back_populates="post")
    author_id = db.Column(db.Integer, ForeignKey("users.id"))
    author = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post")
    tags = relationship("Tag", secondary=tags, backref=db.backref("posts", lazy="dynamic"))

    def __init__(self, title, subtitle, date, body, author):
        self.title = title
        self.subtitle = subtitle
        self.date = date
        self.body = body
        self.author = author

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "subtitle": self.subtitle,
            "date": self.date,
            "body": self.body,
            "author": self.author.serialize(),
            "comments": [comment.serialize() for comment in self.comments],
            "images": [image.url for image in self.images],
            "tags": [tag.name for tag in self.tags],
            "likes": self.liked_users.count()
        }
    
    def __repr__(self):
        return f"<Post {self.title}>"

class Image(db.Model):
    __tablename__ = "images"
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(250), nullable=False)
    post_id = db.Column(db.Integer, ForeignKey("blog_posts.id"))
    post = relationship("BlogPost", back_populates="images")

    def __init__(self, url, post):
        self.url = url
        self.post = post
    
    def __repr__(self):
        return f"<Image {self.url}>"

class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False, unique=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    posts = relationship("BlogPost", back_populates="author")
    comments = relationship("Comment", back_populates="author")

    followings = relationship(
        'User', secondary=follow_rel,
        primaryjoin=(follow_rel.c.follower_id == id),
        secondaryjoin=(follow_rel.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic'
    )

    liked_posts = relationship(
        "BlogPost", secondary=likes, 
        backref=db.backref("liked_users", lazy="dynamic"))

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def change_username(self, new_name):
        self.name = new_name
    
    def change_email(self, new_email):
        self.email = new_email
    
    def change_password(self, new_password):
        self.password = generate_password_hash(new_password)
    
    def __repr__(self):
        return f"<User {self.name}>" 
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }


class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    author = relationship("User", back_populates="comments")
    post = relationship("BlogPost", back_populates="comments")
    author_id = db.Column(db.Integer, ForeignKey("users.id"))
    post_id = db.Column(db.Integer, ForeignKey("blog_posts.id"))

    def __init__(self, body, author, post):
        self.body = body
        self.author = author
        self.post = post

    def serialize(self):
        return {
            "id": self.id,
            "body": self.body,
            "author": self.author.serialize()
        }

    def __repr__(self):
        return f"<Comment {self.body}>"