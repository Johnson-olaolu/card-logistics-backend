const {
	getAllCompanies,
	getAllClusterManagers,
	getAllLogisticsCompanies,
	acceptLogisticsCompany,
	rejectLogisticsCompany,
	acceptClusterManager,
	rejectClusterManager,
	changeClusterManagerPriority,
	changeLogisticsCompanyPriority,
	mapLogisticsCompany,
} = require("../controllers/stateCoordinator.controller");

const router = require("express").Router();

router.get("/get-all-companies", getAllCompanies);
router.get("/get-all-cluster-managers", getAllClusterManagers);
router.post(
	"/accept-logistic-company/:logisticsCompanyId",
	acceptLogisticsCompany
);
router.post(
	"/reject-logistic-company/:logisticsCompanyId",
	rejectLogisticsCompany
);
router.post("/accept-cluster-manager/:clusterManagerId", acceptClusterManager);
router.post("/reject-cluster-manager/:clusterManagerId", rejectClusterManager);
router.put("/change-logistic-company-priority/:logisticsCompanyId", changeLogisticsCompanyPriority)
router.put("/change-cluster-manager-priority/:clusterManagerId", changeClusterManagerPriority)
router.post("/map-logistics-company/:logisticsCompanyId", mapLogisticsCompany)

module.exports = router;
