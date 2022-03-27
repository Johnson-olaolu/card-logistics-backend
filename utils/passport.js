const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const StateCordinator = require("../models/StateCordinators.model");
const dotenv = require("dotenv").config();

const initializePassport = () => {
	passport.use(
		"login",
		new LocalStrategy(
			{ usernameField: "email", passwordField: "password" },
			async function (username, password, done) {
				// const {error} = await Validator.login.validateAsync({username, password})
				const user = await StateCordinator.findOne({email : username})
				if (!user) {
					return done(null, false, { message: "User Not Found" });
				}
				if (!validatePassword(user.phoneNum, password)) {
					return done(null, false, {
						message: "Wrong Password",
					});
				}
				return done(null, user, { message: "Logged in Successfully" });
			}
		)
	);
};

passport.use(
	new JWTstrategy(
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		},
		async (token, done) => {
			try {
				return done(null, token.user);
			} catch (error) {
				done(error);
			}
		}
	)
);
const validatePassword =  (userPassword, password) => {
	if (userPassword == password) {
		return true
	}else {
		return false
	}
	
};

module.exports = initializePassport;
