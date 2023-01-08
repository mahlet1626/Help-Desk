const express = require('express');
const route = express.Router()// so we can create different routes

const services = require('../services/render');
const team = require('../controllers/users');

/**
 *  @description Root Route
 *  @method GET /
 */
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
route.post('/api/users', team.create);
route.get('/api/users', team.find);
route.put('/api/users/:id', team.update);
route.delete('/api/users/:id', team.delete);


module.exports = route