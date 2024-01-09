from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum
from .cart import cartItem

# class GenderEnum(Enum):
#     MALE = 'male'
#     FEMALE = 'female'

# class CategoryEnum(Enum):
#     HAPPY = 'happy'
#     ANGRY = 'angry'
#     BIG = 'big'
#     SMALL = 'small'

class Frog(db.Model):
    __tablename__ = 'frogs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    species = db.Column(db.String(40), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    gender = db.Column(db.String(40), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    pictureUrl = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(40), nullable=False)
    quantity = db.Column(db.Integer, default=0)

    owner = db.relationship("User", back_populates="frogs")

    cart = db.relationship("Cart", secondary=cartItem, back_populates="items")

    favorited_by = db.relationship("User", secondary="favorites", back_populates="favorites")
    
    def to_dict(self, scope="default"):
        d = {
            "id": self.id,
            "name": self.name,
            "species": self.species,
            "owner_id": self.owner_id,
            "gender": self.gender,
            "age": self.age,
            "price": self.price,
            "stock": self.stock,
            "pictureUrl": self.pictureUrl,
            "description": self.description,
            "category": self.category
        }

        if scope == "with_owner":
            d["owner"] = self.owner.to_dict()
        
        return d
