from blog_api.test.basic_test import BasicTestCase
from blog_api.models.user_model import User
from blog_api.models.posts_model import BlogPost, Image
from blog_api.models.tags_model import Tag
from blog_api.models.comments_model import Comment
from blog_api import db
from datetime import datetime

class DatabaseTestCase(BasicTestCase):
    def setUp(self) -> None:
        super().setUp()
        db.init_app(self.app)
        with self.app.app_context():
            db.create_all()
    
    def tearDown(self) -> None:
        super().tearDown()
    
    def test_users(self):
        with self.app.app_context():
            for i in range(10):
                user = User(
                    name=f"test{i}",
                    email=f"test{i}@gmail.com",
                    password="password",
                    created_at=datetime.now())
                
                db.session.add(user)
                db.session.commit()
            
            users = User.query.all()
            self.assertEqual(len(users), 10)
            for i in range(10):
                self.assertEqual(users[i].name, f"test{i}")
                self.assertEqual(users[i].email, f"test{i}@gmail.com")
                self.assertEqual(users[i].check_password("password"), True)

    def test_posts(self):
        self.test_users()
        with self.app.app_context():

            for i in range(10):
                author = User.query.get(i+1)
                post = BlogPost(
                    title=f"test{i}",
                    subtitle=f"test{i}",
                    body=f"test{i}",
                    author=author,
                    date=datetime.now())
                db.session.add(post)
                db.session.commit()
            posts = BlogPost.query.all()
            self.assertEqual(len(posts), 10)
            for i in range(10):
                self.assertEqual(posts[i].title, f"test{i}")
                self.assertEqual(posts[i].subtitle, f"test{i}")
                self.assertEqual(posts[i].body, f"test{i}")
                self.assertEqual(posts[i].author_id, i+1)

    def test_comments(self):
        self.test_posts()
        with self.app.app_context():
            for i in range(10):
                
                post = BlogPost.query.get(i+1)
                author = User.query.get(i+1)
                comment = Comment(
                    body=f"test{i}",
                    author=author,
                    post=post,
                    create_at=datetime.now())
                
                db.session.add(comment)
                db.session.commit()
            
            comments = Comment.query.all()
            self.assertEqual(len(comments), 10)
            for i in range(10):
                self.assertEqual(comments[i].body, f"test{i}")
                self.assertEqual(comments[i].author_id, i+1)
                self.assertEqual(comments[i].post_id, i+1)

    def test_images(self):
        self.test_posts()
        with self.app.app_context():
            for i in range(10):
                
                post = BlogPost.query.get(i+1)
                image = Image(
                    url=f"test{i}",
                    post=post)
            
                db.session.add(image)
                db.session.commit()
            
            images = Image.query.all()
            self.assertEqual(len(images), 10)
            for i in range(10):
                self.assertEqual(images[i].url, f"test{i}")
                self.assertEqual(images[i].post_id, i+1)

    def test_tags(self):
        with self.app.app_context():
            for i in range(10):
                tag = Tag(
                    name=f"test{i}")
                
                db.session.add(tag)
                db.session.commit()
            
            tags = Tag.query.all()
            self.assertEqual(len(tags), 10)
            for i in range(10):
                self.assertEqual(tags[i].name, f"test{i}")
                self.assertEqual(tags[i].posts.count(), 0)

    def test_follow_relationships(self):
        self.test_users()
        with self.app.app_context():
            for i in range(1, 10):
                follower = User.query.get(i)
                followed = User.query.get(i + 1)
                follower.follow(followed)
                db.session.commit()
            users = User.query.all()
            for i in range(1, 10):
                self.assertEqual(users[i-1].followings[0].id, i+1)
                self.assertEqual(users[i].followers[0].id, i)
            

    def test_like_relationships(self):
        self.test_posts()
        with self.app.app_context():
            for i in range(1, 10):
                user = User.query.get(i)
                post = BlogPost.query.get(i)
                user.like_post(post)
                db.session.commit()
            
            users = User.query.all()
            for i in range(1, 10):
                self.assertEqual(users[i-1].liked_posts[0].id, i)

            user = User.query.get(1)
            post = BlogPost.query.get(1)
            user.delete()
            self.assertEqual(post.liked_users.count(), 0)

    def test_tag_relationships(self):
        self.test_posts()
        self.test_tags()
        with self.app.app_context():
            for i in range(1, 10):
                post = BlogPost.query.get(i)
                tag = Tag.query.get(i)
                post.tags.append(tag)
                tag.posts.append(post)
                db.session.commit()
            posts = BlogPost.query.all()
            for i in range(1, 10):
                self.assertEqual(posts[i-1].tags[0].id, i)