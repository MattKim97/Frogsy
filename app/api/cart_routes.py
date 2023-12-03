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

    
    index_to_delete = next((index for index, item in enumerate(cart.items) if item.id == frogId), None)    
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

        # Ensure the quantity is a positive integer
    if not isinstance(quantity, int) or quantity < 1:
        return error_message("quantity", "Invalid quantity"), 400

    frog = next((item for item in cart.items if item.id == frogId), None)

    # Check if there's enough stock
    if frog.stock < quantity:
        return error_message("stock", "Insufficient stock"), 400
    

    if frog is not None:
        frog.quantity = request.json["quantity"]
        db.session.commit()
        return "Updated"
    else:
        return error_message("message", "Item not found in the cart"), 404
