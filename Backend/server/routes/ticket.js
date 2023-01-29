const express = require('express');
const route = express.Router()// so we can create different routes
const Ticket = require('../models/tickets')
const TicketController= require('../controllers/tickets');

/**
 *  @description Root Route
 *  @method GET /
 */

// API
route.post('/api/tickets', TicketController.create);
route.get('/api/tickets', TicketController.find);
route.put('/api/tickets/:id', TicketController.update);
route.delete('/api/tickets/:id', TicketController.delete);

route.param('id',TicketController.ticketById)

module.exports = route