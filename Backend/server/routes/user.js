const express = require('express');
const route = express.Router()// so we can create different routes
const User = require('../models/users')
const services = require('../services/render');
const UserController= require('../controllers/users');
const multer= require('multer');// for uploading files/image
/**
 *  @description Root Route
 *  @method GET /
 */

//image upload
var storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,  "./server/uploads");
    },
    filename:function(req,file,cb){
        cb(null, file.fieldname + "_" +Date.now() + "_" +file.originalname);
    },
});

var upload= multer({
    storage:storage,
}).single("image");

route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)


// API
route.post('/api/users',upload, UserController.create);
route.get('/api/users', UserController.find);
route.put('/api/users/:id', UserController.update);
route.delete('/api/users/:id', UserController.delete);


module.exports = route