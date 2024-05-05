from blog_server import db
from sqlalchemy import ForeignKey

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