const router = require('express').Router();
var braintree = require('braintree');
const { signUpValidation, loginValidation, updateValidation} = require('../validation');
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "4wsx2kkvmdbbbg8k",
    publicKey: "rdq6rdrt8d9qm3b4",
    privateKey: "472fa51bbb9f2025359c9bd11c0e609d"
  });

router.post('/getToken',async (req,res)=>{
    gateway.clientToken.generate({
        customerId: req.body.customerId
      }, function (err, response) {
        res.send(response);
    });

});

router.post("/checkout", function (req, res) {
    var nonceFromTheClient = req.body.nounce;
    gateway.transaction.sale({
        amount: req.body.amount,
        paymentMethodNonce: nonceFromTheClient
      }, function (err, result) {
        res.send(result);
      });
    
});


router.post("/customer", function (req, res) {
  gateway.customer.create({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    phone : req.body.phone,
    email : req.body.email,
  
    
  }, function (err, result) {
    result.success;
    result.customer.id;
    res.send(result);
  })
});




router.get("/paymentMethod", function (req, res) {

  gateway.customer.find("695861404", function(err, customer) {
    res.send(customer); // array of PaymentMethod objects
  });


});




module.exports = router;
