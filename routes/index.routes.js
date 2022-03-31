const router = require('express').Router()

const authRoutes = require("./Auth.routes")
const companyRoutes = require("./Company.routes")
const coordinatorRoutes = require("./Coordinator.routes")

router.use("/auth", authRoutes)
router.use("/company", companyRoutes)
router.use("/coordinator", coordinatorRoutes)

module.exports = router