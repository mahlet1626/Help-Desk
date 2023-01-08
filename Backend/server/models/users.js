const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    photo: {
        data: Buffer,
        contentType: String
    },
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    role : String,
    
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;









