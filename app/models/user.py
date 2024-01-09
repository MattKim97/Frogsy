from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

favorites = db.Table(
    'favorites',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column('frog_id', db.Integer, db.ForeignKey(add_prefix_for_prod("frogs.id")), primary_key=True),
)
if environment == "production":
    favorites.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profilePictureUrl = db.Column(db.String(255), nullable=True)

    frogs = db.relationship("Frog", back_populates="owner")

    cart = db.relationship("Cart", back_populates="user", uselist=False)
    
    favorites = db.relationship("Frog", secondary=favorites, back_populates="favorited_by")
    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "profilePictureUrl": self.profilePictureUrl,
            "favorites": [frog.id for frog in self.favorites] if self.favorites else [],
        }
