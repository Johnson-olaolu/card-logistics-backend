const { companyLogin, getCompanyById } = require('../controllers/Company.controller')

const router = require('express').Router()

router.post("/login", companyLogin )
router.post("/getCompany/:companyId", getCompanyById )

module.exports = router