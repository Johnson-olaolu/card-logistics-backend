const Joi = require("joi")


const acceptLogisticsCompanyValidator = Joi.object({
    logisticsCompanyId : Joi.string().required()
})


module.exports = {
     acceptLogisticsCompanyValidator
}
