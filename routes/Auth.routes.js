const { registerCompany, coordinatorLogin } = require('../controllers/Auth.controller')

const router = require('express').Router()

router.post("/company-register", registerCompany)
router.post("/manager-login", coordinatorLogin )

module.exports = router