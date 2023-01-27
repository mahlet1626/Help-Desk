const express = require('express');
// const dotenv = require('dotenv');
const app= express();
const morgan = require('morgan');//to log request whenever we make a request
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')

require("dotenv").config();
// dotenv.config( { path : 'config.env'} )
const PORT= process.env.PORT || 9000;


//cors
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration



// const connectDB = require('./server/database/connection');

// log requests
app.use(morgan('tiny'));

// mongodb connection
// connectDB();
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("DB connected!"))
;

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))


// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))



//Firebase Admin SDK

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// load routers
app.use('/', require('./server/routes/user'))
app.use('/', require('./server/routes/project'))
app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

