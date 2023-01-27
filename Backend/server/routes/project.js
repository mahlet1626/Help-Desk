const express = require('express');
const route = express.Router()// so we can create different routes
const Project = require('../models/projects')
const ProjectController= require('../controllers/projects');

/**
 *  @description Root Route
 *  @method GET /
 */




// API
route.post('/api/projects', ProjectController.create);
route.get('/api/projects', ProjectController.find);
route.put('/api/projects/:id', ProjectController.update);
route.delete('/api/projects/:id', ProjectController.delete);

route.param('id',ProjectController.projectById)

module.exports = route