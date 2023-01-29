const mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({

  
    issue_title : {
        type : String,
        required: [true,'Please enter title'],
        trim:true,
        maxLength:[100, 'Title should not exceed 100 characters']
    },
    project : {
        type: String,
        required: true,      
    },
    issue_priority : {
        type:String,
        required:true
    },
    assigned_to : {
        type:String,
        required:true
    },
    issue_status : {
        type:String,
        required:true
    },
},
{ timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);








