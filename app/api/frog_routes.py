from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Frog, db
from app.forms import FrogForm, get_unique_filename, upload_file_to_s3, error_messages,error_message,remove_file_from_s3,remove_file_from_s3

frog_routes = Blueprint('frogs', __name__)

@frog_routes.route('/')
def frogs():
    """
    Query for all frogs and returns them in a list of frog dictionaries
    """
    frogs = Frog.query.all()
    return {'frogs': [frog.to_dict() for frog in frogs]}

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
    
@frog_routes.route('/<int:id>', methods=['PUT'])
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
        return error_messages(form.errors), 401
    else:
        return error_message("Something went wrong"), 401
    
