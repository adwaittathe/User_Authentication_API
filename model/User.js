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
    gender: {
        type :String,
        required : true
    },
    contactNo: {
        type:Number,
        min : 1000000000,
        max : 9999999999,
        required: true
    },
    age : {
        type:Number,
        min : 0,
        max : 150,
        required:true
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