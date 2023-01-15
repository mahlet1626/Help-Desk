const multer= require('multer');// for uploading files/image
const User = require('../models/users');
const route = require('../routes/user')
const path = require('path');
const fs= require('fs');//for removing old files/images from the directory if we choose a new one
const formidable = require('formidable');
const _ = require('lodash');// for replacing?


exports.userById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
     if(err|| !user){
        return res.status(400).json({
            error:"User not found"
        });
     }
     req.user = user;
        next();
       

    });
    
}


// create and save new user
exports.create = (req, res) => {

    let form =new formidable.IncomingForm()
    form.keepExtensions= true // anytype of image
    form.parse(req,(err,fields,files)=>{
       if (err){
        return res.status(400).json({
            error: "Image can't be uploaded!"
       });
  };
const{name,email,role}= fields
if(!name || !email || !role ){
  return res.status(400).json({
    error: "all fields are required!"
});
}

  let user = new User(fields);// for the fields
  if(files.image){
    console.log(files.image)
    if (files.image.size > 1000000){
      return res.status(400).json({
            error: "Image can't be uploaded!"
       });
        
    }

    user.image.data = fs.readFileSync(files.image.filepath);// files.image.path//earlier version
    user.image.contentType = files.image.type;
  }
 user.save((err,result)=>{
    if (err){
        return res.status(400).json({
          message:"Error Occured!"
       });
 }
  res.json(result);
});
});
};

// retrieve and return all users/ retrive and return a single user
// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        User.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else{
        User.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

exports.image = (req, res, next) => {
    if (req.user.image.data) {
        res.set('Content-Type', req.user.image.contentType);
        return res.send(req.user.image.data);
    }
    next();
};

// Update a new idetified user by user id
exports.update = (req, res) => {

    let form =new formidable.IncomingForm()
    form.keepExtensions= true // anytype of image
    form.parse(req,(err,fields,files)=>{
       if (err){
        return res.status(400).json({
            error: "Image can't be uploaded!"
       });
  };
 

  let user = req.user;
  user = _.extend(user, fields);

  if(files.image){
    console.log(files.image)
    if (files.image.size > 1000000){
      return res.status(400).json({
            error: "Image can't be uploaded!"
       });
        
    }

    user.image.data = fs.readFileSync(files.image.filepath);// files.image.path//earlier version
    user.image.contentType = files.image.type;
  }
 user.save((err,result)=>{
    if (err){
        return res.status(400).json({
          message:"Error Occured!"
       });
 }
  res.json(result);
});
});
};
  

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

