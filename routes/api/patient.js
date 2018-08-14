const router = require("express").Router();
const patientController = require("../../controllers/patientController");

// Matches with "/api/patient/all" 
router
    .route("/all")
    .get(patientController.findAll)

// Matches with "/api/patient/forProvider/:id"
router
    .route("/forProvider/:id")
    .get(patientController.findByIdForProvider)

// Matches with "/api/patient/forPatient/:id" 
router 
    .route('/forPatient/:id')
    .get(patientController.findByIdForPatient);

// Matches with "/api/patient/new"
router
  .route("/new")
  .post(patientController.create)

// Matches with "/api/patient/updateEmail/:id" 
router
    .route('/updateEmail/:id')
    .put(patientController.updateEmail)

// Matches with "/api/patient/updatePhone/:id" 
router
    .route('/updatePhone/:id')
    .put(patientController.updatePhone)

// Matches with "/api/patient/updateStatus/:id" 
router
    .route('/updateStatus/:id')
    .put(patientController.updateStatus)

// Matches with "/api/patient/updateName/:id" 
router
.route('/updateName/:id')
.put(patientController.updateName)


// Matches with "/api/patient/episode/:id" 
router 
    .route('/episode/:id')
    .put(patientController.newEpisode); 

// Matches with "/api/patient/newRecord/:id" 
router
    .route('/record/:id')
    .put(patientController.addRecord); 

module.exports = router;