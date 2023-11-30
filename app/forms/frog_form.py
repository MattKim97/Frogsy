from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import InputRequired, Length
from flask_wtf.file import FileField, FileAllowed
from .utils import ALLOWED_EXTENSIONS

class FrogForm(FlaskForm):
    name = StringField('name', validators=[InputRequired(), Length(min=2, max=50)])
    species = StringField('species', validators=[InputRequired()])
    image = FileField('image', validators=[FileAllowed(ALLOWED_EXTENSIONS)])
    gender = SelectField("gender", choices=[("MALE"),("FEMALE")], validators=[InputRequired()])
    age = IntegerField('age', validators=[InputRequired()])
    price = IntegerField('price', validators=[InputRequired()])
    stock = IntegerField('stock', validators=[InputRequired()])
    description = StringField('description')
    category = SelectField(choices=[("HAPPY"),("ANGRY"),("BIG"),("SMALL")], validators=[InputRequired()])
