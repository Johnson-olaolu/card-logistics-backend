const Joi = require("joi")


const companyLoginValidator = Joi.object({
    email : Joi.string().email({ minDomainSegments: 2 }).required(),
    password : Joi.string().min(3).required()
})

module.exports = {
    companyLoginValidator
}