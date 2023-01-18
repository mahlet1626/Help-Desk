const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

    uid:{
        type:String,
        required:true,
    },

    name : {
        type : String,
        required: [true,'Please enter name'],
        trim:true,
        maxLength:[100, 'Name should not exceed 100 characters']
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    image: {
       data: Buffer,
       contentType: String,
       required: false
    },
    role : {
        type:String,
        required:true
    },
},
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);








