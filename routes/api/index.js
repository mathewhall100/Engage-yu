const router = require("express").Router();

const providerRoutes = require("./provider");
const patientRoutes = require("./patient");
const activeRoutes = require("./active");
const question_defaultRoutes = require("./question_default");
const question_customRoutes = require("./question_custom");

//  Routes
router.use("/provider", providerRoutes);
router.use("/patient", patientRoutes);
router.use("/active", activeRoutes);
router.use("/question_default", question_defaultRoutes);
router.use("/question_custom", question_customRoutes);

module.exports = router;