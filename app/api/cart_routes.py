from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Cart
from app.forms import get_unique_filename, upload_file_to_s3, error_messages,error_message,remove_file_from_s3,remove_file_from_s3

cart_routes = Blueprint('carts', __name__)

@cart_routes.route('/<int:frogId>', methods=['DELETE'])
@login_required
def delete_frog_from_cart(frogId):
    """
    Deletes a frog from a user's cart
    """
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()

    
    index_to_delete = next((index for index, item in enumerate(cart.items) if item.id == frogId), None)    
    if index_to_delete is not None:
        # Remove the item from the list and commit the changes to the database
        del cart.items[index_to_delete]
        db.session.commit()
        return error_message("message", "Deleted"), 200
    else:
        return error_message("message", "Item not found in the cart"), 404
