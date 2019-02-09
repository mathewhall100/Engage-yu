const router = require("express").Router();
const patient_dataController = require("../../controllers/patient_dataController");

// Matches with "/api/patient_data/:id"
router
    .route("/:id")
    .get(patient_dataController.findById)

// Matches with "/api/patient_data"
router
  .route("/new")
  .post(patient_dataController.create);

// Matches with "/api/patient_info/insertRef/:id" 
router
    .route('/insertRef/:id')
    .put(patient_dataController.insertRef)

// Matches with "/api/patient_data/episode/:id" 
router 
    .route('/episode/:id')
    .put(patient_dataController.newEpisode); 

// Matches with "/api/patient-data/newRecord/:id" 
router
    .route('/record/:id')
    .put(patient_dataController.addRecord); 

// Matches with '/api/patient_data/editRecord/'
router
    .route('/editRecord/:id/:episode/:record_id/:status')
    .put(patient_dataController.editRecord);

// Matches with '/api/patient_data/editLastEpisode/'
router
    .route('/editLastEpisode/:id/:status')
    .put(patient_dataController.editActiveStatus);

router
    .route('/delete/:id')
    .delete(patient_dataController.delete)

module.exports = router;