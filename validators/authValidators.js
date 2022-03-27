const Joi = require('joi')

const companyRegisterValidator = Joi.object({
    fullName : Joi.string().min(3).required(),
    email : Joi.string().min(3).email({ minDomainSegments: 2 }).required(),
    phoneNum : Joi.string().min(11).max(11).required(),
    category : Joi.string().min(6).max(50).required(),
    address : Joi.string().required(),
    state : Joi.string().required(),
    localGovernment : Joi.string().required()
})

const coordinatorLoginValidator = Joi.object({
    email : Joi.string().min(3).email({ minDomainSegments: 2 }).required(),
    password : Joi.string().min(6).max(50).required(),
})

module.exports = {
    companyRegisterValidator,
    coordinatorLoginValidator
}