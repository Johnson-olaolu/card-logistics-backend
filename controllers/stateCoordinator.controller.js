const asyncHandler = require("express-async-handler");
const { db } = require("../models/ClusterManagers.model");
const ClusterManager = require("../models/ClusterManagers.model");
const LogisticsCompany = require("../models/LogisticsCompanies.model");
const {
	acceptLogisticsCompanyValidator,
} = require("../validators/stateCoordinatorValidator");

const getAllClusterManagers = asyncHandler(async (req, res) => {
	const clusterManagers = await ClusterManager.find({});

	res.json({
		succss: true,
		data: clusterManagers,
	});
});

const getAllLogisticsCompanies = asyncHandler(async (req, res) => {
	const LogisticCompanies = await LogisticsCompany.find({});

	res.json({
		success: true,
		data: LogisticCompanies,
	});
});

const getAllCompanies = asyncHandler(async (req, res) => {
	const { state } = req.query;

	let LogisticCompanies = [];
	let clusterManagers = [];

	if (state) {
        LogisticCompanies = await LogisticsCompany.find({state : state});
		clusterManagers = await ClusterManager.find({ state : state});
	} else {
	    LogisticCompanies = await LogisticsCompany.find({});
		clusterManagers = await ClusterManager.find({});
	}

	res.json({
		success: true,
		data: {
			logisticCompanies: LogisticCompanies,
			clusterManagers: clusterManagers,
		},
	});
});

const acceptLogisticsCompany = asyncHandler(async (req, res) => {
	const logisticsCompanyId = req.params.logisticsCompanyId;

	const selectedLogisticCompany = await LogisticsCompany.findOne({
	_id: logisticsCompanyId,
	});

	if (!selectedLogisticCompany) {
		res.status(400);
		throw new Error("No Company registered with this id");
	}

	await selectedLogisticCompany.update({
		isAccepted: true,
	});

	res.json({
		success: true,
		message: `${selectedLogisticCompany.fullName}  has been approved`,
	});
});

const rejectLogisticsCompany = asyncHandler(async (req, res) => {
	const logisticsCompanyId = req.params.logisticsCompanyId;

	const selectedLogisticCompany = await LogisticsCompany.findOne({
		_id: logisticsCompanyId,
	});

	if (!selectedLogisticCompany) {
		res.status(400);
		throw new Error("No Company registered with this id");
	}

	await selectedLogisticCompany.update({
		isAccepted: false,
	});

	res.json({
		success: true,
		message: `${selectedLogisticCompany.fullName}  has been rejected`,
	});
});

const acceptClusterManager = asyncHandler(async (req, res) => {
	const clusterManagerId = req.params.clusterManagerId;
	const selectedClusterManager = await ClusterManager.findOne({
		_id: clusterManagerId,
	});

	if (!selectedClusterManager) {
		res.status(400);
		throw new Error("No Company registered with this id");
	}

	await selectedClusterManager.update({
		isAccepted: true,
	});

	res.json({
		success: true,
		message: `${selectedClusterManager.fullName}  has been approved`,
	});
});

const rejectClusterManager = asyncHandler(async (req, res) => {
	const clusterManagerId = req.params.clusterManagerId;

	const selectedClusterManager = await ClusterManager.findOne({
		_id: clusterManagerId,
	});

	if (!selectedClusterManager) {
		res.status(400);
		throw new Error("No Company registered with this id");
	}

	await selectedClusterManager.update({
		isAccepted: false,
	});

	res.json({
		success: true,
		message: `${selectedClusterManager.fullName}  has been rejected`,
	});
});

const changeClusterManagerPriority = asyncHandler(async(req, res) => {
	const clusterManagerId = req.params.clusterManagerId;
	const {priority } = req.body
	const selectedClusterManager = await ClusterManager.findOne({
		_id: clusterManagerId,
	});

	if (!selectedClusterManager) {
		res.status(400);
		throw new Error("No Company registered with this id");
	}

	await selectedClusterManager.update({
		priority: priority
	});

	res.json({
		success: true,
		message: `${selectedClusterManager.fullName}  priority changed to ${priority}`,
	});
})


const changeLogisticsCompanyPriority = asyncHandler(async(req, res) => {
	const clusterManagerId = req.params.clusterManagerId;
	const {priority } = req.body
	const selectedLogisticsCompany = await LogisticsCompany.findOne({
		_id: clusterManagerId,
	});

	if (!selectedLogisticsCompany) {
		res.status(400);
		throw new Error("No Company registered with this id");
	}

	await selectedLogisticsCompany.update({
		priority: priority
	});

	res.json({
		success: true,
		message: `${selectedLogisticsCompany.fullName}  priority changed to ${priority}`,
	});
})

module.exports = {
	getAllClusterManagers,
	getAllLogisticsCompanies,
	getAllCompanies,
	acceptLogisticsCompany,
	rejectLogisticsCompany,
	acceptClusterManager,
	rejectClusterManager,
	changeClusterManagerPriority,
	changeLogisticsCompanyPriority
};
