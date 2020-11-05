const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');
const router = require('./routes');
const bodyParser = require('body-parser');
const session = require('express-session');


//connect to db
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console,'Connection failure'));
db.once('open',() => console.log('Connection successfully!!!'));

//Init App
const app = express();

//View engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

//Add Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

//Add Middleware express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

//Set public static
app.use(express.static(path.join(__dirname,'public')));



//Set router
router(app);


//Start the server
const port = 3333;
app.listen(port,() => console.log('Server start on port' + port));
