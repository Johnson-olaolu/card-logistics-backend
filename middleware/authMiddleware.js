const asyncHandler = require("express-async-handler");
const passport = require("passport");

const isAuthenticated = asyncHandler( async(req, res, next) => {
    passport.authenticate("jwt", {session : false}, (err, user, info) =>{
        if(err || !user) {
            res.status(401)
            throw new Error("Unauthorized access")
        }else {
            next()
        }
    } )(req,res,next)
})

module.exports = {
    isAuthenticated
}