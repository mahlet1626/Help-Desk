const Ticket = require('../models/tickets');
const route = require('../routes/ticket')
const path = require('path');
const formidable = require('formidable');
const _ = require('lodash');// for replacing?
const { getAuth } = require ('firebase-admin/auth');

//ticketby id middleware
exports.ticketById=(req,res,next,id)=>{
    Ticket.findById(id).exec((err,ticket)=>{
     if(err|| !ticket){
        return res.status(400).json({
            error:"Ticket not found"
        });
     }
     req.ticket = ticket;
        next();
       
    });
    
}

// create and save new ticket
exports.create = (req, res) => {
    let form =new formidable.IncomingForm()
    form.parse(req, (err, fields) => {

        // check for all fields
        const { issue_title , project, issue_priority, assigned_to, issue_status} = fields;

        if (!issue_title || !project || !issue_priority || !assigned_to || !issue_status) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        } 
        let ticket = new Ticket(fields); 

        ticket.save((err,result)=>{
            if (err){
                return res.status(400).json({
                err
            });
        }
            res.json(result);
            });
    });
};

// retrieve and return all tickets/ retrive and return a single ticket
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

       Ticket.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found ticket with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving ticket with id " + id})
            })

    }else{
        Ticket.find()
            .then(ticket => {
                res.send(ticket)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving ticket information" })
            })
    }

    
}

// Update a new identified ticket by ticket id
exports.update = (req, res) => {

    let form =new formidable.IncomingForm()
    form.parse(req,(err,fields)=>{
 
    let ticket = req.ticket;
    ticket = _.extend(ticket, fields);

    ticket.save((err,result)=>{
    if (err){
        return res.status(400).json({
        err
    });
}
    res.json(result);
    });

});
};
  
// Delete a ticket with specified ticket id in the request

exports.delete = (req, res) => {
    let ticket = req.ticket;
    
    ticket.delete((err, deletedTicket) => {
        if (err){
            return res.status(400).json({
            err
        });
        }
        res.json({
            message: 'Ticket deleted successfully'
        });
    });
};