from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Cart, Frog
from app.forms import get_unique_filename, upload_file_to_s3, error_messages,error_message,remove_file_from_s3,remove_file_from_s3

cart_routes = Blueprint('carts', __name__)

@cart_routes.route('/<int:frogId>', methods=['DELETE'])
@login_required
def delete_frog_from_cart(frogId):
    """
    Deletes a frog from a user's cart
    """
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()

    print("Cart Items:", cart.items)
    print("Frog ID to Delete:", frogId)
    index_to_delete = next((index for index, item in enumerate(cart.items) if str(item.id) == str(frogId)), None)
    print("Index to Delete:", index_to_delete)

    if index_to_delete is not None:
        # Remove the item from the list and commit the changes to the database
        del cart.items[index_to_delete]
        db.session.commit()
        return error_message("message", "Deleted"), 200
    else:
        return error_message("message", "Item not found in the cart"), 404

@cart_routes.route('/<int:frogId>', methods=['PATCH'])
@login_required
def update_frog(frogId):
    """
    Updates a frog in a user's cart
    """
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()

    quantity = request.json.get('quantity', 1)

    frog = next((item for item in cart.items if item.id == frogId), None)

    
    if frog is not None:
        

        frog.quantity = quantity
        db.session.commit()
        return cart.to_dict(scope="with_items"), 200
    else:
        return error_message("message", "Item not found in the cart"), 404
    

@cart_routes.route('/checkout', methods=['DELETE'])
@login_required
def checkout():
    """
    Deletes all frogs from a user's cart
    """
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()

    for frog in cart.items:
        frog.stock -= frog.quantity
        db.session.commit()

    cart.items = []
    db.session.commit()
    return cart.to_dict(scope="with_items"), 200
