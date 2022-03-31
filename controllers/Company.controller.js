const asyncHandler = require("express-async-handler");
const ClusterManager = require("../models/ClusterManagers.model");
const LogisticsCompany = require("../models/LogisticsCompanies.model");
const { companyLoginValidator } = require("../validators/companyValidator");


const companyLogin = asyncHandler(async(req, res) => {
    const { error } = await companyLoginValidator.validateAsync(req.body)

    if(error) {
        res.status(400)
        throw new Error(error.message)
    }

    passport.authenticate("login2", async (err, user, info) => {
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

const getCompanyById = asyncHandler( async(req, res) => {
    const companyId = req.params.companyId

    if (await ClusterManager.findOne({_id : companyId})) {
        const user = await ClusterManager.findOne({_id : companyId})
        res.status(200).json({
            success : true,
            data : user
        })
    }else if ( await LogisticsCompany.findOne({_id : companyId})) {
        const user = await LogisticsCompany.findOne({_id : companyId})
        res.status(200).json({
            success : true,
            data : user
        })
    }else {
        res.status(400)
        throw new Error(" Company not found for this Id")
    }
    
})


module.exports = {
    companyLogin,
    getCompanyById
}