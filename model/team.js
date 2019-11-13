const mongoose =  require('mongoose');
 
const teamSchema = new mongoose.Schema({
    teamId : {
        type : String
    },
    name : {
        type : String
    },
    score : {
        type : Object
    },
    finalScore : {
        type : String
    }
});

module.exports = mongoose.model('Team', teamSchema);