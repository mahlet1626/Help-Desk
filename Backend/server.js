const express = require('express');
const dotenv = require('dotenv');
const app= express();
const morgan = require('morgan');//to log request whenever we make a request
dotenv.config( { path : 'config.env'} )
const PORT= process.env.PORT || 9000;


// log requests
app.use(morgan('tiny'));

app.get('/',(req,res)=>{
    res.send("Help-Desk");
})

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

