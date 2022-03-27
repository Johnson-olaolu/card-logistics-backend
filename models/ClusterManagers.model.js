const mongoose = require("mongoose")

const ClusterManagerSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required: true
    },
    phoneNum : {
        type : String,
        required: true
    }, 
    state : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true,
        default : "Cluster Manager"
    },
    localGovernment: {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    }, 
    isAccepted : {
        type : Boolean,
        required : true,
        default : false   
    }
}, {timestamps : true})

const ClusterManager = mongoose.model("ClusterManager", ClusterManagerSchema)

module.exports = ClusterManager