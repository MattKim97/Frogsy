# Welcome to Frogsy!🐸
Welcome to Frogsy! An exclusive emporium dedicated to the enchanting world of amphibians! Immerse yourself in a captivating haven where aficionados of anura congregate to indulge their passion for these delightful denizens of wetlands. Our establishment serves as a premier bazaar for the procurement and exchange of frogs, where discerning enthusiasts engage in the fascinating pursuit of acquiring and parting ways with these charming creatures. Explore a kaleidoscopic array of amphibious wonders, from vibrant tree frogs to elegant bullfrogs, all meticulously curated to cater to the most refined tastes. At Frogsy, we take pride in fostering a community that cherishes the splendor of our web-footed friends. Join us on this riveting journey into the heart of the froggy realm, where every leap, croak, and hop tells a tale of biodiversity and natural splendor. Indulge your passion for all things froggy at Frogsy, your veritable sanctuary for the finest in amphibian acquisition and exchange!

## Technologies Used

<a href="https://github.com"><img src="images/github-mark-white.png" alt="GitHub logo" width="35"></a>
<a href="https://"><img src="images/AWS.png" alt="AWS logo" width="35"></a>
<a href="https://"><img src="images/CSS.png" alt="CSS logo" width="35"></a>
<a href="https://"><img src="images/docker.jpg" alt="Docker logo" width="35"></a>
<a href="https://"><img src="images/flask.png" alt="Flask logo" width="35"></a>
<a href="https://"><img src="images/googleFonts.jpg" alt="Google Fonts logo" width="35"></a>
<a href="https://"><img src="images/HTML5.png" alt="HTML5 logo" width="35"></a>
<a href="https://"><img src="images/JavaScript-logo.png" alt="JavaScript logo" width="35"></a>
<a href="https://"><img src="images/MDN.jpg" alt="Mozilla Developer Network logo" width="35"></a>
<a href="https://"><img src="images/postgresql.jpg" alt="PostGreSQL logo" width="35"></a>
<a href="https://"><img src="images/Python-logo-notext.svg.png" alt="Python logo" width="35"></a>
<a href="https://"><img src="images/React-icon.svg.png" alt="React logo" width="35"></a>
<a href="https://"><img src="images/redux.svg" alt="Redux logo" width="35"></a>
<a href="https://"><img src="images/sql.jpg" alt="SQL logo" width="35"></a>
<a href="https://"><img src="images/SQLAlchemy.svg.png" alt="SQLAlchemy logo" width="35"></a>
<a href="https://"><img src="images/sqlite.jpg" alt="Sqlite logo" width="35"></a>
<a href="https://"><img src="images/Typescript_logo_2020.svg.png" alt="Typescript logo" width="35"></a>
<a href="https://"><img src="images/Visual_Studio_Code_1.35_icon.svg.png" alt="VisualStudio Code logo" width="35"></a>

## Live URL for Frogsy
https://frogsy.onrender.com/

## Screenshot

## Landing Page

On the landing page, we can see the categories nav-bar, an about us , and the main view being a gif of a lotad.

<img src="images/Landing1.jpg" alt="Landing Page" style="width:300;"/>
<img src="images/Landing2.jpg" alt="Landing Page" style="width:300;"/>

## Frogs
A Frog's card showing all details of a frog, when user in not logged in.
<img src="images/frog-card.png" alt="Landing Page" style="width:300;"/>
A Frog's card showing all details of a frog, and additional buttons when user is logged in.
<img src="images/frog-card logged-in.png" alt="Landing Page" style="width:300;"/>


## Cart
The cart when the user has not logged in.
<img src="images/empty cart.png" alt="Landing Page" style="width:300;"/>
The cart when the user is logged in, and has added a frog to the cart
<img src="images/cart with a frog.png" alt="Landing Page" style="width:300;"/>

## Favorites
How to favorite on Frog's page
<img src="images/favorites.png" alt="Landing Page" style="width:300;"/>

What displays when clicking on the favorited frogs button
<img src="images/favorited.png" alt="Landing Page" style="width:300;"/>





### Front-end



*  React
*  Redux
*  JavaScript
*  CSS
*  HTML
*  Icons
    - FontAwesome
    - GoogleFonts API

### Back-end

*  Python
*  SQL
*  SQLAlchemy
*  Alembic
*  Sqlite3 (development)
*  PostGreSQL (production)
*  Amazon Web Services (AWS)
*  Flask
*  Packages:
*  Docker

### Tools
* VS Code
* GitHub and Git
* Render for deployment and publishing

## Installation Instructions

### Back-end

* Decide on database / ORM; we used SQLAlchemy/Sqlite-developemtn; flask-sqlalchemy-alembic/PostGreSQL-production and AWS for large files (media/pictures/art)...for these instructions we'll assume you follow in our footsteps!
* Install packages needed, and dependencies on any other packages
    - pipenv -r install requirements.txt
* create a .env file with appropriate environment variable settings (see .env.example for values)
* if you use PostGreSQL, you will need to set a SCHEMA= variable to a snake_cased name for full table qualifying
* set up seed values in app/seeds
* then setup the database, migrate tables, and seed them

### Front-end

* Follow the README in react-app/
