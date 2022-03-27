const router = require('express').Router()

const authRoutes = require("./Auth.routes")
const coordinatorRoutes = require("./Coordinator.routes")

router.use("/auth", authRoutes)
router.use("/coordinator", coordinatorRoutes)

module.exports = router