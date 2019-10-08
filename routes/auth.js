 const router = require('express').Router();
 const userModel = require('../model/User');
 var braintree = require('braintree');
 const { signUpValidation, loginValidation, updateValidation} = require('../validation');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const verifyToken = require('../verifyToken');
 //const createCustomer =  require('../model/createCustomer');

 const stripe = require("stripe")("sk_test_3U6Sk478c55ftUaMFhv4WxLJ002cKPlTa3");


 var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "4wsx2kkvmdbbbg8k",
    publicKey: "rdq6rdrt8d9qm3b4",
    privateKey: "472fa51bbb9f2025359c9bd11c0e609d"
  });

router.post('/signUp', async (req,res)=>{ 
    
    const { error } = signUpValidation(req.body);

    if(error) return res.status(400).send({
        status : res.statusCode,
        message: error.details[0].message
    });
    
    const emailExist = await userModel.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send({
        status : res.statusCode,
        message:'Email already exist.Try to Login..'
    });

    const salt = await bcrypt.genSalt(10);
    const hashPass =  await bcrypt.hash(req.body.password , salt);
   
    
    try{
        //console.log("SIGN UP");


        stripe.customers.create({
              name : req.body.firstName,
              email : req.body.email
            }, 
            async function(err, customer) {

                if(customer!=null)
                {
                    const user =  new userModel({
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        gender : req.body.gender,
                        contactNo : req.body.contactNo,
                        age : req.body.age,
                        email : req.body.email,
                        customerId : customer.id,
                        password : hashPass
                    });
                    await user.save();
                    const token = jwt.sign({_id : user._id}, process.env.TOKEN_KEY);
                    res.header('token', token);        
                    res.send({
                    status : res.statusCode,
                    token : token,
                    userId : user._id,
                    customerId : customer.id,
                    name : user.firstName + " " + user.lastName,
                    email : user.email,
                    contactNo : user.contactNo,
                    });

                }
                else{

                    res.status(400).send({
                        status : res.statusCode,
                        message : "Error creating user in Stripe" 
                    });

                }
           
        });

        // gateway.customer.create({
        //     firstName : req.body.firstName,
        //     lastName : req.body.lastName,
        //     phone : req.body.phone,
        //     email : req.body.email
        //   }, async function (err, result) {
        //    // console.log(result);
        //     if(result!=null)
        //     {
        //         const user =  new userModel({
        //             firstName : req.body.firstName,
        //             lastName : req.body.lastName,
        //             gender : req.body.gender,
        //             contactNo : req.body.contactNo,
        //             age : req.body.age,
        //             email : req.body.email,
        //             customerId : result.customer.id,
        //             password : hashPass
        //         });


        //             await user.save();
        //             console.log("USER SAVE DONE ");
        //             const token = jwt.sign({_id : user._id}, process.env.TOKEN_KEY);
        //             res.header('token', token);        
        //             res.send({
        //             status : res.statusCode,
        //             token : token,
        //             userId : user._id,
        //             customerId : result.customer.id,
        //             simplifyCustId : data.id,
        //             name : user.firstName + " " + user.lastName,
        //             email : user.email,
        //             contactNo : user.contactNo,
        //             });
        //     }
        //     else{
        //         res.status(400).send({
        //             status : res.statusCode,
        //             message : "Error creating user in Braintree" 
        //         });
        //     }
            
        // })
        
    }
    catch(err){
        res.status(400).send({
            status : res.statusCode,
            message :err
        });
    }

});



router.post('/login', async (req,res)=>{

    const { error } = loginValidation(req.body);

    if(error) return res.status(400).send({
        status : res.statusCode,
        message: error.details[0].message
    });
    
    const user = await userModel.findOne({email : req.body.email});
    if(!user) return res.status(400).send({
        status : res.statusCode,
        message : 'Email do not exist'
    });

    const validatePass = await bcrypt.compare(req.body.password , user.password); 
    if(!validatePass) return res.status(400).send({
        status : res.statusCode,
        message : 'Invalid password'
    });

    const token = jwt.sign({_id : user._id}, process.env.TOKEN_KEY);
    res.header('token', token);
    res.send({
        status : res.statusCode,
        id: user._id,
        token: token,
        customerId : user.customerId,
        name : user.firstName + " " +  user.lastName,
        email : user.email
    })

});

router.get('/details', verifyToken, async(req,res)=>{
    const user = await userModel.findOne({_id : req.user._id});
    if(!user) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding user in database'
    });
    
    res.send({
        status : res.statusCode,
        userId : user._id,
        firstName : user.firstName, 
        lastName : user.lastName,
        email : user.email,
        gender : user.gender,
        contactNo : user.contactNo,
        age : user.age,
        createdAt : user.createdAt
    });
});

router.put('/update', verifyToken, async(req,res)=>{
    const { error } = updateValidation(req.body);
    if(error) return res.status(400).send({
        status : res.statusCode,
        message: error.details[0].message
    });

    const user = await userModel.findOne({_id : req.user._id});
    if(!user) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding user in database'
    });

    await userModel.findOneAndUpdate({email : user.email},
        {
            $set:{
                firstName : req.body.firstName ? req.body.firstName : user.firstName,
                lastName : req.body.lastName ? req.body.lastName : user.lastName,
                gender : req.body.gender ? req.body.gender : user.gender,
                contactNo : req.body.contactNo ? req.body.contactNo : user.contactNo,
                age : req.body.age ? req.body.age : user.age,
                email : user.email,
                password : user.password 
            }
        });

        gateway.customer.update(user.customerId, {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            phone : req.body.phone,
            email : req.body.email
          }, function (err, result) {

        });
    res.status(200).send({
        status: res.statusCode,
        message : "User details updated successfully"
    });
});

router.delete('/delete', verifyToken, async(req,res)=>{
    const user = await userModel.findOne({_id : req.user._id});
    if(!user) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding user in database'
    });
    await userModel.deleteOne({email : user.email});
    res.status(200).send({
        status: res.statusCode,
        message : "User details deleted successfully"
    });
});




module.exports = router;