from blog_api import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    create_at = db.Column(db.String, default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    body = db.Column(db.String, nullable=False)
    author = relationship("User", back_populates="comments")
    post = relationship("BlogPost", back_populates="comments")
    author_id = db.Column(db.Integer, ForeignKey("users.id"))
    post_id = db.Column(db.Integer, ForeignKey("blog_posts.id"))

    def __init__(self, body, author, post, create_at):
        self.body = body
        self.author = author
        self.create_at = create_at
        self.post = post

    def serialize(self):
        return {
            "id": self.id,
            "body": self.body,
            "author": self.author.serialize(),
            "create_at": self.create_at,
        }

    def __repr__(self):
        return f"<Comment {self.body}>"
    
    