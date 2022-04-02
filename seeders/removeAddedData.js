
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const ClusterManager = require('../models/ClusterManagers.model')
const LogisticsCompany = require('../models/LogisticsCompanies.model')


const config = require("../config/config")

config.ConnectDB()

const removeAddedData = async (data) => {
    const clusterManagers = await ClusterManager.find() 
    const LogisticsCompanies = await LogisticsCompany.find()

    clusterManagers.forEach(manager => {
        if(!manager.createdAt) {
            manager.delete()
        }
    })
    LogisticsCompanies.forEach(company => {
        if(!company.createdAt) {
            company.delete()
        }
    })
}

removeAddedData()