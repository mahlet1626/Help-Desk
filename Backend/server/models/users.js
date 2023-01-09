const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

    
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type : String,
        // required: true
    },
    role : {
        type:String,
        required:true
    },
},
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);








