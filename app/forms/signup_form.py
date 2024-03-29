from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
from flask_wtf.file import FileField, FileAllowed
from .utils import ALLOWED_EXTENSIONS


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    user = User.query.filter(User.username == field.data).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(min=3, max=40, message="Username must be between 3 and 40 characters")])    
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[DataRequired(),Length(min=6, max=255, message="Password must be between 6 and 255 characters")])
    profilePicture = FileField('profile picture', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
