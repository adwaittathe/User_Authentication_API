const mongoose =  require('mongoose');
 
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        //required : true
    },
    photo : {
        type : String,
        //required : true
    },
    price: {
        type :String,
        //required : true
    },
    region: {
        type:String,
        //required: true
    },
    discount : {
        type:String,
       // required:true
    }
});

module.exports = mongoose.model('Product', productSchema);