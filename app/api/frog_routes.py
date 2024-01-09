from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Frog, db, cartItem, Cart
from app.forms import FrogForm, get_unique_filename, upload_file_to_s3, error_messages,error_message,remove_file_from_s3,remove_file_from_s3

frog_routes = Blueprint('frogs', __name__)

@frog_routes.route('/')
def frogs():
    """
    Query for all frogs and returns them in a list of frog dictionaries
    """
    frogs = Frog.query.all()
    return [frog.to_dict() for frog in frogs]

@frog_routes.route('/<int:id>')
def frog(id):
    """
    Query for a frog by id and returns that frog in a dictionary
    """
    frog = Frog.query.get(id)
    return frog.to_dict(scope="with_owner")

@frog_routes.route('/new', methods=['POST'])
@login_required
def new_frog():
    """
    Creates a new frog and adds it to the database
    """
    form = FrogForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = form.data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return upload, 401
        
        new_frog = {
            "name": form.data['name'],
            "species": form.data['species'],
            "owner_id": current_user.id,
            "gender": form.data["gender"],
            "age": form.data['age'],
            "price": form.data['price'],
            "stock": form.data['stock'],
            "pictureUrl": upload["url"],
            "description": form.data['description'],
            "category": form.data['category'],
        }
        frog = Frog(**new_frog)
        db.session.add(frog)
        db.session.commit()
        return frog.to_dict(scope="with_owner"), 201
    elif form.errors:
        return error_messages(form.errors), 401
    else:
        return error_message("Something went wrong"), 401
    
@frog_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_frog(id):
    """
    Updates a frog and returns the updated frog in a dictionary
    """
     
    frog = Frog.query.get(id)

    form = FrogForm()

    if frog.owner_id != current_user.id:
         return error_message("Unauthorized"), 401
     
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        if form.image.data:

            image = form.image.data

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 401
            
            remove_file_from_s3(frog.pictureUrl)

            frog.pictureUrl = upload["url"]
        
        frog.name = form.data['name']
        frog.species = form.data['species']
        frog.gender = form.data["gender"]
        frog.age = form.data["age"]
        frog.price = form.data["price"]
        frog.stock = form.data["stock"]
        frog.description = form.data["description"]
        frog.category = form.data["category"]

        db.session.commit()
        return frog.to_dict(scope="with_owner"), 201
    elif form.errors:
        return error_messages(form.errors), 400
    else:
        return error_message("unknown","Something went wrong"), 500
    
@frog_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_frog(id):
    """
    Deletes a frog and returns a message
    """
    frog = Frog.query.get(id)
    

    if frog.owner_id != current_user.id:
        return error_message("Unauthorized"), 401

    file_to_delete = remove_file_from_s3(frog.pictureUrl)

    db.session.delete(frog)
    db.session.commit()

    return {"message": "Deleted"}, 200


@frog_routes.route('/<category>')
def category(category):
    """
    Query for all frogs in a category and returns them in a list of frog dictionaries
    """
    frogs = Frog.query.filter(Frog.category == category).all()

    return {'Frogs': [frog.to_dict() for frog in frogs]}

@frog_routes.route('/<int:id>/cart', methods=['POST'])
@login_required
def add_to_cart(id):
    """
    Adds a frog to a user's cart
    """
    frog = Frog.query.get(id)

    if frog.stock < 1:
        return error_message("stock","Out of stock"), 401
    
    quantity = request.json.get('quantity', 1)

    #     # Ensure the quantity is a positive integer
    # if not isinstance(quantity, int) or quantity < 1:
    #     return error_message("quantity", "Invalid quantity"), 400

    # Check if there's enough stock
    # if frog.stock < quantity:
    #     return error_message("stock", "Insufficient stock"), 400
    
    if current_user.cart is None:
        current_user.cart = Cart(user_id=current_user.id)
        db.session.add(current_user.cart)
        db.session.commit()
    
    
    if current_user.cart.items is None:
        current_user.cart.items = []
    
    existing_frog = next((item for item in current_user.cart.items if item.id == frog.id), None)
    
    if existing_frog:
        if existing_frog.stock < quantity or existing_frog.stock < existing_frog.quantity + quantity:
            return error_message("stock", "Insufficient stock"), 400
        existing_frog.quantity += quantity
    else:
        frog.quantity = quantity
        current_user.cart.items.append(frog)

    db.session.commit()

    return current_user.cart.to_dict(scope="with_items"), 201

@frog_routes.route('/<int:id>/favorite', methods=['POST'])
@login_required
def add_to_favorites(id):
    """
    Adds a frog to a user's favorites
    """
    frog = Frog.query.get(id)

    # if frog in current_user.favorites:
    #     return error_message("favorite", "Already favorited"), 401
    
    current_user.favorites.append(frog)

    db.session.commit()

    return current_user.to_dict(), 201

@frog_routes.route('/<int:id>/favorite', methods=['DELETE'])
@login_required
def remove_from_favorites(id):
    """
    Removes a frog from a user's favorites
    """
    frog = Frog.query.get(id)

    # if frog not in current_user.favorites:
    #     return error_message("favorite", "Not favorited"), 401
    
    current_user.favorites.remove(frog)

    db.session.commit()

    return current_user.to_dict(), 200
