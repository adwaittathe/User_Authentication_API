const router = require('express').Router();
var braintree = require('braintree');
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "4wsx2kkvmdbbbg8k",
    publicKey: "rdq6rdrt8d9qm3b4",
    privateKey: "472fa51bbb9f2025359c9bd11c0e609d"
  });

router.get('/getToken',async (req,res)=>{
    gateway.clientToken.generate({
        customerId: "masterclient3"
      }, function (err, response) {
        var clientToken = response.clientToken
        res.send(response);
    });

});

router.post("/checkout", function (req, res) {
    var nonceFromTheClient = "tokencc_bd_tqb3tz_2g3sj9_nhx3y7_cc5f4x_wg4";
    // Use payment method nonce here

    gateway.transaction.sale({
        amount: "3. 00",
        paymentMethodNonce: nonceFromTheClient,
        options: {
            storeInVaultOnSuccess: true
          }
      }, 
      function (err, result) {
        console.log(result);
        res.send(result);
      });
  });







module.exports = router;



