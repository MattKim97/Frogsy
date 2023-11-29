from .db import db, environment, SCHEMA, add_prefix_for_prod

cartItem = db.Table(
    'cartItems',
    db.Column('cart_id', db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True),
    db.Column('frog_id', db.Integer, db.ForeignKey(add_prefix_for_prod("frogs.id")), primary_key=True),
    db.Column('quantity', db.Integer, nullable=False)
)

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    transactionDate = db.Column(db.Date, nullable=False)

    
    user = db.relationship("User", back_populates="cart")

    items = db.relationship("Frog", secondary=cartItem, back_populates="cart")


    def to_dict(self, scope="default"):
        d =  {
            "id": self.id,
            "user_id": self.user_id,
            "transactionDate": self.transactionDate,
        }

        if scope == "with_items":
            d["items"] = [{
                "id": item.id,
                "quantity": item.quantity,
            } for item in self.items]
        
        return d
