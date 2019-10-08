const router = require('express').Router();
var braintree = require('braintree');
const { signUpValidation, loginValidation, updateValidation} = require('../validation');
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "4wsx2kkvmdbbbg8k",
    publicKey: "rdq6rdrt8d9qm3b4",
    privateKey: "472fa51bbb9f2025359c9bd11c0e609d"
  });

//var Simplify = require("simplify-commerce");
const stripe = require("stripe")("sk_test_3U6Sk478c55ftUaMFhv4WxLJ002cKPlTa3");

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

router.post("/Stripecheckout", function (req, res) {
stripe.paymentIntents.create(
    {
      amount: req.body.amount,
      currency: 'usd',
      payment_method : req.body.stripeId,
      customer : req.body.customerId
    },
    function(err, paymentIntent) {
      if(err)
      {
        res.send(err);
      }
      else{
        stripe.paymentIntents.confirm(paymentIntent.id,
       {
        payment_method: req.body.stripeId,
        save_payment_method : true
       } ,
       function(err, intent) {
        if(err)
        {
          res.send(err);
        }
        else{
         // console.log(intent);
          res.send(intent);   
        }
      }); 
    }
   }
  );
});

router.post("/Simplifycheckout", function (req, res) {
 

  client = Simplify.getClient({
    publicKey: process.env.simplify_publicKey,
    privateKey: process.env.simplify_privateKey
  });


//   client.customer.find("8qpd7eBE6", function(errData, data){
 
//     if(errData){
//         console.error("Error Message: " + errData.data.error.message);
//         // handle the error
//         return;
//     }
 
//     console.log("Success Response: " + JSON.stringify(data));
//     res.send(data);
// });

//   client.payment.create({
//     amount : "43984",
//     customer : "8qpd7eBE6",
//     token : "8f44b1d5-f5ef-46af-8849-ad91be90922b",

//     description : "payment description TOKEN",
    
// }, function(errData, data){
 
//     if(errData){
//        // console.error("Error Message: " + errData.data.error.message);
//         res.send(errData);
//         // handle the error
//         return;
//     }
//   res.send(data);
// });

// client.customer.update({
//   id: "8qpd7eBE6", // ID of object to update
//   email : "customer1@mastercard.com",
//   token : "8f44b1d5-f5ef-46af-8849-ad91be90922b",
//   name : "Customer Customer2"
// }, function(errData, data){

//   if(errData){
//       console.error("Error Message: " + errData.data.error.message);
//       res.send(errData);
//       // handle the error
//       return;
//   }

//   res.send(data);

//   console.log("Success Response: " + JSON.stringify(data));
// });

// client.cardtoken.create({
//   card : {
//      addressState : "MO",
//      expMonth : "11",
//      expYear : "35",
//      addressCity : "OFallon",
//      cvc : "123",
//      number : "5185540810000019",
//      customer:{
//        email:"abc@gmail.com"
//      }
//   },
  
// }, function(errData, data){

//   if(errData){
//       //console.error("Error Message: " + errData.data.error.message);
//       res.send(errData);
//       // handle the error
//       return;
//   }
//   res.send(data);

//   console.log("Success Response: " + JSON.stringify(data));
// });

// client.cardtoken.find("9d8b045a-f890-4273-b83a-53cf1c180a16", function(errData, data){
 
//   if(errData){
//       console.error("Error Message: " + errData.data.error.message);
//       // handle the error
//       return;
//   }

//   res.send(data);
//   console.log("Success Response: " + JSON.stringify(data));
// });

//   client.customer.update({
//     id: "RMpxXzekq", // ID of object to update
//     email : "customer111@mastercard.com",
//     name : "TEST CUST",
//     card : {
//        expMonth : "6",
//        expYear : "30",
//        cvc : "784",
//        number : "5105105105105100"
//     }
//     //reference : "Ref16"
// }, function(errData, data){
 
//     if(errData){
//         console.error("Error Message: " + errData.data.error.message);
//         // handle the error
//         return;
//     }
 
//     console.log("Success Response: " + JSON.stringify(data));
//     res.send(data);
// });



//   client.payment.create({
//     amount : "1000",
//     customer : "LEzqBp976",
//     description : "payment description",
//     //invoice : "123",
//     card : {
//        expMonth : "8",
//        expYear : "99",
//        cvc : "123",
//        number : "5555555555554444"
//     }
// }, function(errData, data){
 
//     if(errData){
//         console.error("Error Message: " + errData.data.error.message);
//         // handle the error
//         return;
//     }
//   res.send(data);
// });
  
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


router.post("/Stripe", function (req, res) {
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




router.post("/Stripe_customer", function (req, res) {
 
  // stripe.customers.create({
  //   description: 'Customer for jenny.rosen@example.com',
  //   name : "iii jjj",
  //   email : "iii.jjj@gmail.com"
  //   //source: "src_18eYalAHEMiOZZp1l9ZTjSU0" // obtained with Stripe.js
  // }, function(err, customer) {
  //   res.send(customer);
  //   //res.send("created")
  //   // asynchronously called
  // });
  // stripe.paymentMethods.attach('pm_1FRQLsKTsS1Q0ynF8o4kfrI5', {customer: 'cus_FxKWVcWVGZN73n'}, 
  // function(err, paymentMethod) {
  //   if(err)
  //   {
  //     res.send(err)
  //   }
  //   else{
  //     res.send(paymentMethod)
  //   }
  // });

  // stripe.paymentIntents.create(
  //   {
  //     amount: 1523,
  //     currency: 'usd',
  //     payment_method : 'pm_1FRR5BKTsS1Q0ynF8tPWuiFy',
  //     customer : 'cus_FxKV3Sf16HsJ0D'
  //   },
  //   function(err, paymentIntent) {
  //     if(err)
  //     {
  //       res.send(err);
  //     }
  //     else{
  //       stripe.paymentIntents.confirm(paymentIntent.id,
  //      {
  //       payment_method: 'pm_1FRR5BKTsS1Q0ynF8tPWuiFy',
  //       save_payment_method : true
  //      }
  //      ,function(err, intent) {
  //       if(err)
  //       {
  //         res.send(err);
  //       }
  //       else{
  
  //         console.log(intent);
  //         res.send(intent);
          
  //       }
  
  // });
  //       console.log(paymentIntent.id);
  //       res.send(paymentIntent);  
  //     }
  //   }
  // );

  // stripe.charges.create({
  //   amount: 2000,
  //   currency: "usd",
  //   source: paymentIntent.id// obtained with Stripe.js
  // }, function(err, charge) {
  //   if(err)
  //   {
  //     res.send(err)
  //   }
  //   else{
  //     //console.log();
  //     res.send(charge)
  //   } 
  // });
 


  // stripe.paymentMethods.create({
  //   type: "card",
  //   card: {
  //     number: '4242424242424242',
  //     exp_month: 12,
  //     exp_year: 2020,
  //     cvc: '123'
  //   }
  // }, function(err, token) {
  //   res.send(err);
  //   // asynchronously called
  // });


  stripe.paymentMethods.list(
    {customer: 'cus_FxKV3Sf16HsJ0D', type: 'card'},
    function(err, paymentMethods) {
      res.send(paymentMethods);
    }
  );

  // stripe.customers.retrieve(
  //   'cus_FxKV3Sf16HsJ0D',
  //   function(err, customer) {
  //    res.send(customer);
  //   }
  // );
  // stripe.customers.retrieve(
  //   'cus_FxJUspH9NYdIv5',
  //   function(err, customer) {
  //     res.send(customer);
  //     let cardlist = [];
  //     for(let i=0; i< customer.sources.data.length;i++)
  //     {
  //       console.log("FINGERPRINT " + customer.sources.data[i].card.fingerprint);
  //     }
  //     // asynchronously called
  //   }
  // );
  // stripe.sources.create({
  //   type: 'card',
  //   currency: 'usd',
  //   card: {
  //         number: '4242424242424242',
  //         exp_month: 12,
  //         exp_year: 2020,
  //         cvc: '123'
  //   }
  // }, function(err, source) {
  //   if(source)
  //   {
  //     let = source.card.fingerprint;

  //     stripe.customers.createSource(
  //       'cus_FxJUspH9NYdIv5',
  //       {
  //         source: 'src_1FROuHKTsS1Q0ynFk9CTUypJ',
  //       },
  //       function(err, card) {
    
  //         if(err)
  //         {
  //           res.send(err)
  //         }
  //         else{
  //           res.send(card);
  //         }
          
  //         // asynchronously called
  //       }
  //     );x
  //     res.send(source);
  //   } 
  //   else{
  //     res.send(err);
  //   }  
  // });




  // stripe.customers.createSource(
  //         'cus_FxJF9jbzhQjNFF',
  //         {
  //           source: source.id,
  //         },
  //         function(err, source) {
  //           // asynchronously called
  //         }
  //       );



  // stripe.charges.create({
  //   amount: 2000,
  //   currency: "usd",
  //   source: "src_1FROecKTsS1Q0ynF8zOJFbXg", // obtained with Stripe.js
  //   description: "Charge for jenny.rosen@example.com",
  //   customer: "cus_FxJF9jbzhQjNFF"
  // }, function(err, charge) {
  //   //res.send(charge);
  //   res.send(err);
  // });

  // stripe.paymentMethods.attach('pm_1FROHUKTsS1Q0ynFFgsjNbCO', {customer: 'cus_FxIhglGBbK6Jw3'}, 
  // function(err, paymentMethod) {
  //   res.send(err);
  //   // asynchronously called
  // });

});

router.get("/paymentMethod", function (req, res) {
  gateway.customer.find("695861404", function(err, customer) {
    res.send(customer); // array of PaymentMethod objects
  });
});




module.exports = router;
