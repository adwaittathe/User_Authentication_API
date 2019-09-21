const mongoose =  require('mongoose');
 
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        max : 255
    },
    password : {
        type : String,
        min : 6,
        required : true
    },
    createdAt : {
        type : Date,
         default : Date.now
    }
});

module.exports = mongoose.model('User', userSchema);