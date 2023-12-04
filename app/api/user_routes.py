from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db, Cart

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
    
@user_routes.route('/<int:id>/frogs')
@login_required
def user_frogs(id):
    """
    Query for all frogs belonging to a user and returns them in a list of frog dictionaries
    """

    if current_user.id != id:
        return {'errors': ['Unauthorized']}, 401
    user = User.query.get(id)
    return {'frogs': [frog.to_dict() for frog in user.frogs]}

@user_routes.route('/<int:id>/cart')
@login_required
def user_cart(id):
    """
    Query for all frogs in a user's cart and returns them in a list of frog dictionaries
    """

    if current_user.id != id:
        return {'errors': ['Unauthorized']}, 401
    user = User.query.get(id)

    if user.cart is None:
        cart = Cart(user_id=user.id)
        db.session.add(cart)
        db.session.commit()

    if not user.cart.items:
        return {'cart': "No Items", 'details': user.cart.to_dict(scope="default")}
        
    return user.cart.to_dict(scope="with_items")
