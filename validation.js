const Joi = require('@hapi/joi');

const signUpValidation = (data) =>{
    const schema = Joi.object({
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        gender : Joi.string().required(),
        contactNo : Joi.number().required().min(1000000000).max(9999999999),
        age : Joi.number().required().min(0).max(150),
        email : Joi.string().required().email(),
        password : Joi.string().required().min(6)
     });
     return schema.validate(data); 
}

const loginValidation = (data) =>{
    const schema = Joi.object({
        email : Joi.string().required().email(),
        password : Joi.string().required().min(6)
     });
     return schema.validate(data); 
}

module.exports.signUpValidation = signUpValidation;
module.exports.loginValidation = loginValidation;