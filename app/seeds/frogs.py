from app.models import db, Frog, environment, SCHEMA
from sqlalchemy.sql import text

def seed_frogs():
    frog1 = Frog(
        name="Froggy",
        species=" Red-Eyed Tree Frog",
        owner_id=1,
        gender="male",
        age=1,
        price=100,
        stock=1,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Froggy.jpg",
        description="Froggy is a frog",
        category="small"
    )
    frog2 = Frog(
        name="Froggy Woggy",
        species=" Green Tree Frog",
        owner_id=1,
        gender="female",
        age=3,
        price=200,
        stock=4,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Froggy+Woggy.jpg",
        description="Froggy Woggy really really loves trees",
        category="small"
    )
    frog3 = Frog(
        name="Fred",
        species="Budgett's Frog",
        owner_id=1,
        gender="male",
        age=3,
        price=300000,
        stock=1,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/FRED.jpg",
        description="Fred is a humongous fan of the day Wednesday",
        category="happy"
    )
    frog4 = Frog(
        name="Helga",
        species="Black Tree Frog",
        owner_id=1,
        gender="female",
        age=7,
        price=50,
        stock=2,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Helga.webp",
        description="Helga is always angry before her morning coffee",
        category="angry"
    )
    frog5 = Frog(
        name="George",
        species="Desert Rain Frog",
        owner_id=2,
        gender="male",
        age=5,
        price=500,
        stock=5,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/George.jpg",
        description="George lives in the desert, so he is always angry",
        category="angry"
    )
    frog6 = Frog(
        name="Mikey",
        species="African Bullfrog",
        owner_id=1,
        gender="male",
        age=5,
        price=250,
        stock=7,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Mikey.jpg",
        description="Mikey goes to the frog gym from 5am to 5pm every day",
        category="big"
    )
    frog7 = Frog(
        name="ABSOLUTE UNIT",
        species="Goliath Frog",
        owner_id=2,
        gender="female",
        age=1,
        price=300,
        stock=1,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/ABSOLUTE+UNIT.jpg",
        description="SO HUGE SO BIG SO LARGE",
        category="big"
    )
    frog8 = Frog(
        name="PeeWee",
        species="Common Forest Frog",
        owner_id=3,
        gender="female",
        age=1,
        price=100,
        stock=1,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/PeeWee.jpg",
        description="PeeWee loves the forest",
        category="happy"
    )
    frog9 = Frog(
        name="Shibo",
        species="????? Frog",
        owner_id=3,
        gender="male",
        age=2,
        price=1,
        stock=1,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Shibo.png",
        description="I don't think this is a frog",
        category="big"
    )
    frog10 = Frog(
        name="Eric",
        species="Northern Glass Frog",
        owner_id=3,
        gender="female",
        age=7,
        price=25,
        stock=3,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Eric.jpg",
        description="It is hard to find Eric most days",
        category="small"
    )
    
    frogs = [frog1, frog2, frog3, frog4, frog5, frog6, frog7, frog8, frog9, frog10]
    db.session.add_all(frogs)
    db.session.commit()

def undo_frogs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.frogs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM frogs"))

    db.session.commit()
