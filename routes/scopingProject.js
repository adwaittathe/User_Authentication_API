const router = require('express').Router();
const userModel = require('../model/User');
const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');

router.get('/getJudgeProfile' , verifyToken   ,function (req, res) {
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
})

module.exports = router;