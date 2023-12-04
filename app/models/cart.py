from .db import db, environment, SCHEMA, add_prefix_for_prod

cartItem = db.Table(
    'cartItems',
    db.Column('cart_id', db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True),
    db.Column('frog_id', db.Integer, db.ForeignKey(add_prefix_for_prod("frogs.id")), primary_key=True),
)

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),unique=True, nullable=False)

    
    user = db.relationship("User", back_populates="cart", cascade="all, delete-orphan",single_parent=True)

    items = db.relationship("Frog", secondary=cartItem, back_populates="cart")

    def to_dict(self, scope="default"):
        d =  {
            "id": self.id,
            "user_id": self.user_id,
        }

        if scope == "with_items" and self.items:
            d["items"] = [{
                "id": item.id,
                "price": item.price,
                "name": item.name,
                "stock": item.stock,
                "pictureUrl": item.pictureUrl,   
                "quantity": item.quantity} for item in self.items]
        
        return d
