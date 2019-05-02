const router = require("express").Router();
const patient_dataController = require("../../controllers/patient_dataController");
const checkToken = require("../../jwt/jwt");
const checkJwt = checkToken.getCheckToken()

// Matches with "/api/patient_data/:id"
router
    .route("/:id")
    .get(checkJwt, patient_dataController.findById)

// Matches with "/api/active/"id"
router
    .route("/active/:id")
    .get(checkJwt, patient_dataController.fetchActive)

// Matches with "/api/patient_data"
router
  .route("/new")
  .post(checkJwt, patient_dataController.create);

// Matches with "/api/patient_info/insertMsg/:id" 
router
    .route('/insertMsg/:id')
    .put(checkJwt, patient_dataController.insertMsg)

// Matches with "/api/patient_data/episode/:id" 
router 
    .route('/episode/:id')
    .put(checkJwt, patient_dataController.newEpisode); 

// Matches with '/api/patient_data/editLastEpisode/'
router
    .route('/updateStatus/:id/')
    .put(checkJwt, patient_dataController.updateStatus);

// Matches with '/api/patient_data/updateRecord/'
router
    .route('/updateRecords/:id')
    .put(patient_dataController.updateRecords);

router
    .route('/delete/:id')
    .delete(checkJwt, patient_dataController.delete)

module.exports = router;