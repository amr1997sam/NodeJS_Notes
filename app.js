// imports
require('dotenv').config();

const express = require('express'); /////////////////////////////basic////////////
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db.js');
// const MongoStore = require('connect-mongo');

// creating the express web server
const app = express(); /////////////////////////////basic////////////
const port = 5000 || process.env.PORT; /////////////////////////////basic////////////

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // a middleware that handle json requests

// serves the static files; tells where to access website files 
app.use(express.static('public')); /////////////////////////////basic////////////

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/routes.js'));

// connect to database
connectDB();

// starting the server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});