const router = require('express').Router();
const productModel = require('../model/product');

router.post("/fetchProductsByRegion", async function (req, res) {
   
    const productList = await productModel.find({region : req.body.region});
    if(productList.length==0) return res.status(400).send({
        status : res.statusCode,
        message : 'No products found for selected region'
    });
    res.send({
        status : res.statusCode,
        products : productList
    });

});

router.get("/fetchProducts", async function (req, res) {
   
    const productList = await productModel.find();
    if(productList.length==0) return res.status(400).send({
        status : res.statusCode,
        message : 'No products found'
    });
    res.send({
        status : res.statusCode,
        products : productList
    });

});

module.exports = router;