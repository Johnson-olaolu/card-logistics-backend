const bcrypt = require("bcryptjs");
const mongoose = require("mongoose")

const StateCordinatorSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    phoneNum : {
        type : Number,
        required : true,
    }, 
    state : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String, 
        required : true,
    }
}, {timestamps : true})

StateCordinatorSchema.pre('save', async function(next) {
    const password =  this.phoneNum
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = await bcrypt.hashSync(password, salt)

    this.password = encryptedPassword;
    next()
  });

const StateCordinator = mongoose.model("StateCordinator", StateCordinatorSchema)

module.exports = StateCordinator