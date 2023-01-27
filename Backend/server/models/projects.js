const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({

  
    title : {
        type : String,
        required: [true,'Please enter title'],
        trim:true,
        maxLength:[100, 'Title should not exceed 100 characters']
    },
    department : {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
  
    priority : {
        type:String,
        required:true
    },
},
{ timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);








