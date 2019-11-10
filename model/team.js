const mongoose =  require('mongoose');
 
const teamSchema = new mongoose.Schema({
    teamId : {
        type : String,
        //required : true
    },
    name : {
        type : String,
        //required : true
    },
    score : {
        type : Object,
        //required : true
    }
});

module.exports = mongoose.model('Team', teamSchema);