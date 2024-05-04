"""
Module Docstring: Define the Comment model for the blog_api package.
"""

from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from blog_api import db 


class Comment(db.Model):
    """
    Class Docstring: Represents a comment on a blog post.
    """
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    create_at = db.Column(db.String, default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    body = db.Column(db.String, nullable=False)
    author = relationship("User", back_populates="comments")
    post = relationship("BlogPost", back_populates="comments")
    author_id = db.Column(db.Integer, ForeignKey("users.id"))
    post_id = db.Column(db.Integer, ForeignKey("blog_posts.id"))

    def __init__(self, body, author, post):
        """
        Initialize a new Comment object.

        Args:
            body (str): The content of the comment.
            author (User): The author of the comment.
            post (BlogPost): The blog post the comment belongs to.
            create_at (str): The timestamp when the comment was created.
        """
        self.body = body
        self.author = author
        self.post = post

    def serialize(self):
        """
        Serialize the Comment object into a dictionary.

        Returns:
            dict: A dictionary representation of the Comment object.
        """
        return {
            "id": self.id,
            "body": self.body,
            "author": self.author.serialize(),
            "create_at": self.create_at,
        }

    def __repr__(self):
        """
        Return a string representation of the Comment object.

        Returns:
            str: A string representation of the Comment object.
        """
        return f"<Comment {self.body}>"
