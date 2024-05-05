from blog_server import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from blog_server.models.relationship_model import tags
from datetime import datetime

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


class BlogPost(db.Model):
    __tablename__ = "blog_posts"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), unique=True, nullable=False)
    subtitle = db.Column(db.String(250), nullable=False)
    date = db.Column(db.String(250), default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
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
    
    def create(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def has_tag(self, tag):
        return tag in self.tags and self in tag.posts

    def add_tag(self, tag):
        if not self.has_tag(tag):
            self.tags.append(tag)
            tag.posts.append(self)
            

        