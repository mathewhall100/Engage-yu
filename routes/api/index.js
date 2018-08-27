const router = require("express").Router();

const providerRoutes = require("./provider");
const provider_groupRoutes = require("./provider_group")
const patient_infoRoutes = require("./patient_info");
const patient_dataRoutes = require("./patient_data");
const activeRoutes = require("./active");
const question_defaultRoutes = require("./question_default");
const question_customRoutes = require("./question_custom");
const userRoutes = require("./user");

//  Routes
router.use("/provider", providerRoutes);
router.use("/provider_group", provider_groupRoutes);
router.use("/patient_info", patient_infoRoutes);
router.use("/patient_data", patient_dataRoutes);
router.use("/active", activeRoutes);
router.use("/question_default", question_defaultRoutes);
router.use("/question_custom", question_customRoutes);
router.use("/user", userRoutes);

module.exports = router;