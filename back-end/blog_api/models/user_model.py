from blog_api import db
from blog_api.models.relationship_model import follow_rel, likes
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False, unique=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    posts = relationship("BlogPost", back_populates="author")
    comments = relationship("Comment", back_populates="author")
    isVerified = db.Column(db.Boolean, default=False)
    description = db.Column(db.String(250), default="")
    profile_pic = db.Column(db.String(250), default="default.jpg")
    birth_date = db.Column(db.String(250), default="")
    created_at = db.Column(db.String(250), default=datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    github = db.Column(db.String(250), default="")
    linkedin = db.Column(db.String(250), default="")
    twitter = db.Column(db.String(250), default="")


    followings = relationship(
        'User', secondary=follow_rel,
        primaryjoin=(follow_rel.c.follower_id == id),
        secondaryjoin=(follow_rel.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic'
    )

    liked_posts = relationship(
        "BlogPost", secondary=likes, 
        backref=db.backref("liked_users", lazy="dynamic"))

    def __init__(self, name, email, password, created_at):
        self.name = name
        self.email = email
        self.password = generate_password_hash(password)
        self.created_at = created_at

    def create(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
    
    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def change_password(self, new_password):
        self.password = generate_password_hash(new_password)
    
    def set_verified(self):
        self.isVerified = True
    
    def __repr__(self):
        return f"<User {self.name}>" 
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "profile_pic": self.profile_pic,
            "birth_date": self.birth_date,
            "created_at": self.created_at,
            "description": self.description,
            "github": self.github,
            "linkedin": self.linkedin,
            "twitter": self.twitter,
            "posts": len(self.posts),
            "followers": self.followers.count(),
            "followings": self.followings.count(),
        }