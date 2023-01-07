const express = require('express')

const app = express()

app.engine("html",require('ejs').renderFile)

const PORT= process.env.PORT || 3500;

app.use(express.static('static'))

app.get('/',(req,res)=>{
    res.render('index.html')
})

app.get('/profile',(req,res)=>{
    res.render('profile.html')
})

app.listen(5000,()=>{
    console.log("App is listening on port " + PORT)
})