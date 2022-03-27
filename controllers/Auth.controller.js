const asyncHandler = require("express-async-handler");
const passport = require("passport")
const ClusterManager = require("../models/ClusterManagers.model");
const jwt = require("jsonwebtoken")
const LogisticsCompany = require("../models/LogisticsCompanies.model");
const { companyRegisterValidator, coordinatorLoginValidator } = require("../validators/authValidators");



const registerCompany = asyncHandler(async (req, res) => {
    const {error } = await companyRegisterValidator.validateAsync(req.body)

    if(error) {
        res.status(400)
        throw new Error(error.message)
    }

    const {
        fullName,
        email,
        userName,
        phoneNum,
        category,
        address, 
        state ,
        localGovernment 
    } = req.body

    if(category == "Cluster Manager") {
        await ClusterManager.create({
            fullName : fullName,
            email : email,
            userName : userName,
            phoneNum: phoneNum,
            address : address,
            state : state,
            localGovernment : localGovernment
        })

        res.status(200).json({
            success: true,
            message : "Cluster Manager Registered"
        })
    }else if (category == "Logistics Company") {
        await LogisticsCompany.create({
            fullName : fullName,
            email : email,
            userName : userName,
            phoneNum: phoneNum,
            address : address,
            state : state,
            localGovernment : localGovernment
        })

        res.status(200).json({
            success: true,
            message : "Logistics Company Registered"
        })
    }else if (category == "Logistics (CM's) company") {
        await ClusterManager.create({
            fullName : fullName,
            email : email,
            userName : userName,
            phoneNum: phoneNum,
            address : address,
            state : state,
            localGovernment : localGovernment
        })

        await LogisticsCompany.create({
            fullName : fullName,
            email : email,
            userName : userName,
            phoneNum: phoneNum,
            address : address,
            state : state,
            localGovernment : localGovernment
        })

        res.status(200).json({
            success: true,
            message : "Logistics (CM's) company4"
        })
    }else {
        res.status(400)
        throw new Error("Unsupported category type")
    }
})


const coordinatorLogin = asyncHandler(async(req, res, next) => {
    const {error} = await coordinatorLoginValidator.validateAsync(req.body) 

    if(error) {
        res.status(400)
        throw new Error(error.message)
    }

    passport.authenticate("login", async (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error(info.message);
				return next(error);
			}
			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);
				const body = { id: user._id, email: user.email };
				const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
				return res.json({
                    success: true,
					message: "User Logged in successfully",
					token: token,
					user: user,
				});
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
})


module.exports = {
    registerCompany,
    coordinatorLogin
}