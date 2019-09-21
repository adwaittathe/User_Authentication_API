 const router = require('express').Router();
 const userModel = require('../model/User');
 const { signUpValidation, loginValidation } = require('../validation');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');

router.post('/signUp', async (req,res)=>{ 
    
    const { error } = signUpValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    
    const emailExist = await userModel.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    const salt = await bcrypt.genSalt(10);
    const hashPass =  await bcrypt.hash(req.body.password , salt);

    const user =  new userModel({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : hashPass
    });
    try{
        const saveUser = await user.save();
        res.send({
            userId : user._id,
            name : user.firstName + " " + user.lastName,
            email : user.email
        });
    }
    catch(err){
        res.status(400).send(err);
    }

});

router.post('/login', async (req,res)=>{

    const { error } = loginValidation(req.body);

    if(error) return res.status(400).send(error);
    
    const user = await userModel.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Email do not exist');

    const validatePass = await bcrypt.compare(req.body.password , user.password); 
    if(!validatePass) return res.status(400).send('Invalid password');

    const token = jwt.sign({_id : user._id}, process.env.TOKEN_KEY);
    res.header('token', token);
    res.send({
        id: user._id,
        token: token,
        name : user.firstName + " " +  user.lastName
    })

});

module.exports = router;