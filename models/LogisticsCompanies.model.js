const mongoose = require("mongoose")

const LogisticsCompaniesSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phoneNum : {
        type : String,
        required : true
    }, 
    state : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true,
        default : "Logistics Company"
    },
    localGovernment: {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    priority : {
        type : String
    },
    isAccepted : {
        type : Boolean,
        required : true,
        default : false
    }, clusterManager :  {
        type : mongoose.Types.ObjectId
    }
}, {timestamps : true})

const LogisticsCompany = mongoose.model("LogisticsCompany", LogisticsCompaniesSchema)

module.exports = LogisticsCompany