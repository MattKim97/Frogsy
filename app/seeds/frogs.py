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
        owner_id=2,
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
        owner_id=1,
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
    frog11 = Frog(
        name="Jeremy",
        species="Poison Dart Frog",
        owner_id=4,
        gender="male",
        age=6,
        price=75,
        stock=20,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Jeremy.jpg",
        description="Jeremy is a small frog, but he has a very toxic personality",
        category="small"
    )
    frog12 = Frog(
        name="Stephanie",
        species="Amazon Milk Frog",
        owner_id=4,
        gender="female",
        age=6  ,
        price=125,
        stock=15,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Stephanie.jpg",
        description="Stephanie likes to chill on a leaf, her favorite food is flies",
        category="small"
    )
    frog13 = Frog(
        name="Linda",
        species="Dumpy Tree Frog",
        owner_id=4,
        gender="female",
        age=3,
        price=425,
        stock=1,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Linda.jpg",
        description="Linda is always hanging in there",
        category="big"
    )
    frog14 = Frog(
        name="Serena",
        species="Tomato Frog",
        owner_id=4,
        gender="female",
        age=7,
        price=225,
        stock=30,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Serena.jpg",
        description="Serena is a very red and big frog that always smells like spaghetti",
        category="big"
    )
    frog15 = Frog(
        name="Oliver",
        species="Budgett's Frog",
        owner_id=2,
        gender="male",
        age=5,
        price=500,
        stock=5,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Oliver.jpg",
        description="Oliver is an angry lil boy",
        category="angry"
    )
    frog16 = Frog(
        name="Maya",
        species="Black Rain Frog",
        owner_id=3,
        gender="female",
        age=6,
        price=525,
        stock=22,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Maya.jpg",
        description="Maya always silently judges your life decisions",
        category="angry"
    )
    frog17 = Frog(
        name="Ethan",
        species="Poison Dart Frog",
        owner_id=2,
        gender="male",
        age=1,
        price=300,
        stock=1,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Ethan.jpg",
        description="Ethan is always yelling about something",
        category="angry"
    )
    frog18 = Frog(
        name="Isabella",
        species="Red-Eyed Tree Frog",
        owner_id=3,
        gender="female",
        age=1,
        price=600,
        stock=25,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Isabella.jpg",
        description="Isabella is always happy ray of sunshine",
        category="happy"
    )
    frog19 = Frog(
        name="Liam",
        species="White Tree Frog",
        owner_id=3,
        gender="male",
        age=2,
        price=195,
        stock=17,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Liam.webp",
        description="Liam just vibin' ",
        category="happy"
    )
    frog20 = Frog(
        name="Paul",
        species="Panamanian Golden Frog",
        owner_id=4,
        gender="male",
        age=4,
        price=325,
        stock=30,
        pictureUrl="https://frogsyimg.s3.us-west-1.amazonaws.com/Paul.jpg",
        description="Paul is always so happy on his branch",
        category="happy"
    )
    
    
    frogs = [frog1, frog2, frog3, frog4, frog5, frog6, frog7, frog8, frog9, frog10 ,frog11, frog12, frog13, frog14, frog15, frog16, frog17, frog18, frog19, frog20]
    db.session.add_all(frogs)
    db.session.commit()

def undo_frogs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.frogs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM frogs"))

    db.session.commit()
