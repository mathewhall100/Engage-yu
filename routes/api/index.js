const router = require("express").Router();

const providerRoutes = require("./provider");
//const patientRoutes = require("./patient");
//const userRoutes = require("./user");
//const questionRoutes = require("./question");

//  Routes
router.use("/provider", providerRoutes);
//router.use("/patient", patientRoutes);
//router.use("/user", userRoutes);
//router.use("/question", questionRoutes);

module.exports = router;