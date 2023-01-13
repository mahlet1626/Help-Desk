const multer= require('multer');// for uploading files/image
const User = require('../models/users');
const route = require('../routes/user')
const path = require('path');
const fs= require('fs');//for removing old files/images from the directory if we choose a new one

//image upload
var storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,  "./uploads");
    },
    filename:function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname); 
    },
});

var upload= multer({
    storage:storage,
}).single("image");


// create and save new user
exports.create = (req,res)=>{
    // validate request
    let user= new User({
        name:req.body.name,
        email:req.body.email,
        image:req.file.filename,
        role:req.body.role,
    })
    user.save((err)=>{
        if(err){
            res.json({   message:"An error occured!"})
        }
        else{
           
            res.json({
                user
            });
            res.json({message:"User added Successfully!"});
        }
    })
    
}

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


//image update
var storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,  "./uploads");
    },
    filename:function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname); 
    },
});

var upload= multer({
    storage:storage,
}).single("image");

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        res.json({message:"Data to update can not be empty"})
        // return res
        //     .status(400)
        //     .send({ message : "Data to update can not be empty"})
    }
    let id= req.params.id;
    let new_image=""
    // let new_image=""
    if(req.file){
        new_image=req.file.filename;
        try{
            fs.unlinkSync("./uploads" + req.body.image)
        }catch(err){
            console.log(err);
        }
    }else{
        new_image=req.body.image;
    }
    //const id = req.params.id;
    User.findByIdAndUpdate(id,{
        name:req.body.name,
        email:req.body.email,
        image:new_image,
        role:req.body.role,
        
    },(err,result)=>{
        if(err){
            res.json({message:"Can't find user by that id or can't update!"})
        }
        else{
            res.json({
                message:"User added Successfully!",
                User
            });
          
        }
    }
    )
       
}

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