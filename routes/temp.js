const router = require('express').Router();
const productModel = require('../model/product');
var fs = require('fs');
var result =  [
	{
        "discount": 10,
        "name": "Pineapple",
        "photo": "pineapple.png",
        "price": 1.18,
        "region": "produce"
    },
	{
        "discount": 10,
        "name": "Croissants",
        "photo": "croissants.png",
        "price": 2.79,
        "region": "grocery"
    },
	{
        "discount": 20,
        "name": "Brach's Jelly Beans",
        "photo": null,
        "price": 2.21,
        "region": "grocery"
    },
	{
        "discount": 20,
        "name": "Dial Soap",
        "photo": "jelly-beans.png",
        "price": 2.99,
        "region": "lifestyle"
    },
	{
        "discount": 10,
        "name": "Oranges",
        "photo": "oranges.png",
        "price": 0.89,
        "region": "produce"
    },
	{
        "discount": 15,
        "name": "Scotch Brite Sponges",
        "photo": "scotch-brite-sponges.png",
        "price": 5.89,
        "region": "lifestyle"
    },
	{
        "discount": 15,
        "name": "Fresh Express Lettuce",
        "photo": "lettuce.jpg",
        "price": 3.69,
        "region": "produce"
    },
	{
        "discount": 15,
        "name": "Coca Cola",
        "photo": "coca-cola.png",
        "price": 6.99,
        "region": "grocery"
    },
	{
        "discount": 10,
        "name": "Gatorade",
        "photo": "gatorade.png",
        "price": 3.89,
        "region": "grocery"
    },
	{
        "discount": 10,
        "name": "Organix Conditioner",
        "photo": "organix-conditioner.png",
        "price": 13.46,
        "region": "lifestyle"
    },
	{
        "discount": 10,
        "name": "Spinach",
        "photo": "spinach.png",
        "price": 1.23,
        "region": "produce"
    },
	{
        "discount": 15,
        "name": "Cranberry Cocktail",
        "photo": "cranberry-cocktail.png",
        "price": 1.89,
        "region": "grocery"
    },
	{
        "discount": 20,
        "name": "Milk",
        "photo": "milk.jpg",
        "price": 10.5,
        "region": "grocery"
    },
	{
        "discount": 15,
        "name": "HI-C Fruit Punch",
        "photo": "hi-c-fruit-punch.png",
        "price": 4.67,
        "region": "grocery"
    },
	{
        "discount": 10,
        "name": "Nectarines",
        "photo": "fresh-nectarines.png",
        "price": 3.67,
        "region": "produce"
    },
	{
        "discount": 10,
        "name": "Fresh Seedless Whole Watermelon",
        "photo": "watermellon.jpg",
        "price": 6.99,
        "region": "produce"
    },
	{
        "discount": 15,
        "name": "US Weekly",
        "photo": "us-weekly.png",
        "price": 4.99,
        "region": "lifestyle"
    }
] 


router.get('/abc',  async(req,res)=>{
    for(let  i=0; i < result.length;i++)
    {
        
        if(result[i].photo==null)
        {
            const product =  new productModel({
                name : result[i].name,
                discount : result[i].discount,
                region : result[i].region,
                //photo : "dsdsd",
                price : result[i].price,
                photo : "No Image",
                });
            
                product.save();
        }
        else{
            const product =  new productModel({
                name : result[i].name,
                discount : result[i].discount,
                region : result[i].region,
                //photo : "dsdsd",
                price : result[i].price,
                photo : base64_encode("/Users/adwaittathe/Downloads/support/"+result[i].photo),
                });
            
                product.save();
            
        }
  
    
    }
});



// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
module.exports = router;