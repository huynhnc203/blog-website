from blog_api import db


class Tag(db.Model):
    __tablename__ = "tag"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "posts" : [
                post.serialize() for post in self.posts
            ]
        }

    def create(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_tag(cls, tag_name):
        return cls.query.filter_by(name=tag_name).first()

    def __repr__(self):
        return f"<Tag {self.name}>"
