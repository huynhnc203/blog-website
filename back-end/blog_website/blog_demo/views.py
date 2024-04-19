from flask import render_template, redirect, url_for, flash, Blueprint
from datetime import date
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, current_user, logout_user
from blog_website.blog_demo.models import CreatePostForm, RegisterForm, LoginForm, CommentForm, BlogPost, User, Comment
from functools import wraps
from blog_website import db, login_mamage

blog_demo = Blueprint("blog_demo", __name__)


def admin_required(function):
    @wraps(function)
    def wrap_func(*args, **kwargs):
        if current_user.is_authenticated and current_user.id == 1:
            return function(*args, **kwargs)
        return login_mamage.unauthorized()
    return wrap_func

@blog_demo.route('/')
@blog_demo.route('/home')
def get_all_posts():
    posts = BlogPost.query.all()
    return render_template("index.html", all_posts=posts)


@blog_demo.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if current_user.is_authenticated:
        return redirect("/")
    if form.validate_on_submit():
        try:
            new_user = User(
                name=form.name.data,
                email=form.email.data,
                password=generate_password_hash(password=form.password.data, method="pbkdf2", salt_length=18)
            )
            db.session.add(new_user)
            db.session.commit()
            return redirect("/login")
        except:
            error = "Email have already existed! Please login instead"
            flash(error)
            return redirect("/login")

    return render_template("register.html", form=form)


@login_mamage.user_loader
def load_user(user_id):
    return db.session.query(User).get(user_id)

@blog_demo.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if current_user.is_authenticated:
        return redirect("/")
    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data
        user = User.query.filter_by(email=email).first()
        if user == None:
            error = "Email doesn't existed!"
            flash(error)
            return render_template("login.html", form=form)
        else:
            print(check_password_hash(user.password, password))
            if check_password_hash(pwhash=user.password, password=password):
                login_user(user)
                return redirect("/")
            else:
                error = "Wrong password!"
                flash(error)
                return render_template("login.html", form=form)
    return render_template("login.html", form=form)


@blog_demo.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('get_all_posts'))


@blog_demo.route("/post/<int:post_id>", methods=['GET', 'POST'])
def show_post(post_id):
    requested_post = BlogPost.query.get(post_id)
    comments = requested_post.comments
    form = CommentForm()
    if form.validate_on_submit():
        if not current_user.is_authenticated:
            flash("You should login to comment")
            return redirect("/login")
        new_comment = Comment(
            author=current_user,
            body=form.body.data,
            post=requested_post
        )
        db.session.add(new_comment)
        db.session.commit()
        return redirect(f"/post/{post_id}")
    return render_template("post.html", post=requested_post, form=form, comments=comments)


@blog_demo.route("/about")
def about():
    return render_template("about.html")


@blog_demo.route("/contact")
def contact():
    return render_template("contact.html")


@blog_demo.route("/new-post", methods=['GET', 'POST'])
@admin_required
def add_new_post():
    # print(1)
    form = CreatePostForm()
    if form.validate_on_submit():
        # print(form.title.data)
        new_post = BlogPost(
            title=form.title.data,
            subtitle=form.subtitle.data,
            body=form.body.data,
            img_url=form.img_url.data,
            author=current_user,
            date=date.today().strftime("%B %d, %Y")
        )
        # print(new_post.author.name)
        db.session.add(new_post)
        db.session.commit()
        return redirect("/")
    return render_template("make-post.html", form=form)


@blog_demo.route("/edit-post/<int:post_id>")
@admin_required
def edit_post(post_id):
    post = BlogPost.query.get(post_id)
    edit_form = CreatePostForm(
        title=post.title,
        subtitle=post.subtitle,
        img_url=post.img_url,
        author=post.author,
        body=post.body
    )
    if edit_form.validate_on_submit():
        post.title = edit_form.title.data
        post.subtitle = edit_form.subtitle.data
        post.img_url = edit_form.img_url.data
        post.author = edit_form.author.data
        post.body = edit_form.body.data
        db.session.commit()
        return redirect(url_for("show_post", post_id=post.id))

    return render_template("make-post.html", form=edit_form)


@blog_demo.route("/delete/<int:post_id>")
@admin_required
def delete_post(post_id):
    post_to_delete = BlogPost.query.get(post_id)
    db.session.delete(post_to_delete)
    db.session.commit()
    return redirect(url_for('get_all_posts'))

