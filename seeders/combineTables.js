const mongoose = require("mongoose")
const { ConnectDB } = require("../config/config")
const ClusterManager = require("../models/ClusterManagers.model")
const LogisticsCompany = require("../models/LogisticsCompanies.model")
const StateCordinator = require("../models/StateCordinators.model")

const dotenv = require("dotenv").config()

const CombinedTableSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNum: {
        type: String,
    },
    state: {
        type: String,
    },
    category: {
        type: String,
    },
    localGovernment: {
        type: String,
    },
    address: {
        type: String,
    },
    priority: {
        type: String
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    logisticCompanyFullName: {
        type: String,
    },
    logisticCompanyEmail: {
        type: String,
    },
    logisticCompanyPhoneNum: {
        type: String,
    },
    logisticCompanyState: {
        type: String,
    },
    logisticCompanyCategory: {
        type: String,
    },
    logisticCompanyLocalGovernment: {
        type: String,
    },
    logisticCompanyAddress: {
        type: String,
    },
    logisticCompanyPriority: {
        type: String
    },
    logisticCompanyIsAccepted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const CombinedTables = mongoose.model("CombinedTables", CombinedTableSchema)

module.exports = CombinedTables

const AddAllToTable = async () => {
    ConnectDB()

    const ClusterManagers = await ClusterManager.find({})
    const LogisticsCompanies = await LogisticsCompany.find({})
    const StateCoordinators = await StateCordinator.find({})

    for (const manager of ClusterManagers) {
        if (manager.logisticsCompany) {
            const lcompany = await LogisticsCompany.findById(manager.logisticsCompany)
            await CombinedTables.create({
                fullname: manager.fullName,
                email: manager.email,
                phoneNum: manager.phoneNum,
                state: manager.state,
                category: manager.category,
                localGovernment: manager.localGovernment,
                address: manager.address,
                priority: manager.priority,
                isAccepted: manager.isAccepted,
                logisticCompanyFullName: lcompany.fullName,
                logisticCompanyEmail: lcompany.email,
                logisticCompanyPhoneNum: lcompany.phoneNum,
                logisticCompanyState: lcompany.state,
                logisticCompanyCategory: lcompany.category,
                logisticCompanyLocalGovernment: lcompany.localGovernment,
                logisticCompanyAddress: lcompany.address,
                logisticCompanyPriority: lcompany.priority,
                logisticCompanyIsAccepted: lcompany.isAccepted
            })
        } else {
            await CombinedTables.create({
                fullname: manager.fullName,
                email: manager.email,
                phoneNum: manager.phoneNum,
                state: manager.state,
                category: manager.category,
                localGovernment: manager.localGovernment,
                address: manager.address,
                priority: manager.priority,
                isAccepted: manager.isAccepted,
            })
        }

    }
    for (const company of LogisticsCompanies) {
        const existingCompany = await CombinedTables.find({ email: company.email })
        if (existingCompany) {

        } else {
            await CombinedTables.create({
                fullname: company.fullName,
                email: company.email,
                phoneNum: company.phoneNum,
                state: company.state,
                category: company.category,
                localGovernment: company.localGovernment,
                address: company.address,
                priority: company.priority,
                isAccepted: company.isAccepted,
                ClusterManager: company.ClusterManager
            })
        }

    }
    for (const coordinator of StateCoordinators) {
        await CombinedTables.create({
            fullname: coordinator.fullName,
            email: coordinator.email,
            phoneNum: coordinator.phoneNum,
            state: coordinator.state,
            category: coordinator.category,
            localGovernment: coordinator.localGovernment,
            address: coordinator.address,
            priority: coordinator.priority,
            isAccepted: coordinator.isAccepted,
            ClusterManager: coordinator.ClusterManager
        })
    }
    console.log("done creating table")
}

AddAllToTable()