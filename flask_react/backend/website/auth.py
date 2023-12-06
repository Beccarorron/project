from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import current_user, login_user, login_required, logout_user
from wtforms import HiddenField, PasswordField, StringField, SubmitField, EmailField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length, Email, EqualTo
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db


class Myform(FlaskForm):
    email = EmailField(
        label=("Email"), validators=[DataRequired(), Email(), Length(min=6)]
    )
    firstName = StringField(
        label=("First Name"), validators=[DataRequired(), Length(min=2, max=20)]
    )
    password1 = PasswordField(
        label=("Password"),
        validators=[
            DataRequired(),
            Length(min=8, message="Password should be at least be 8 characters")]
    )
    password2 = PasswordField(
        label=("Confirm Password"),validators=[DataRequired(),
            EqualTo("password1", message="Both Password fields must be be equal!"),
        ],
    )
    hidden = HiddenField()
    submit = SubmitField(label=("Submit"))


auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash("Logged in successfully!", category="success")
                login_user(user, remember=True)
                return redirect(url_for("views.home"))
            else:
                flash("Incorrect password, try again.", category="error")
        else:
            flash("Email does not exist.", category="error")
    return render_template("login.html", current_user=current_user)


@auth.route("/logout")
@login_required
def lougout():
    logout_user()
    return redirect(url_for("auth.login"))


@auth.route("/sign-up", methods=["GET", "POST"])
def sign_up():
    form = Myform()
    if request.method == "POST" and form.validate():
        email = request.form.get("email")
        firstName = request.form.get("firstName")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")
        user = User.query.filter_by(email=email).first()
        if user:
            flash("Email already exists.", category="error")
        else:
            new_user = User(
                email=email,
                firstName=firstName,
                password=generate_password_hash(password1, method="pbkdf2:sha256"),
            )
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash("Account created!", category="success")

        return redirect(url_for("views.home"))

    return render_template("sign_up.html", current_user=current_user, form=form)
