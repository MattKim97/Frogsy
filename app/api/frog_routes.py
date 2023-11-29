from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Frog

frog_routes = Blueprint('frogs', __name__)

@frog_routes.route('/')
def frogs():
    """
    Query for all frogs and returns them in a list of frog dictionaries
    """
    frogs = Frog.query.all()
    return {'frogs': [frog.to_dict() for frog in frogs]}
