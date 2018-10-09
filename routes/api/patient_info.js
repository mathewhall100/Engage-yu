const router = require("express").Router();
const patient_infoController = require("../../controllers/patient_infoController");

// Matches with "/api/patient_info/all" 
router
    .route("/all")
    .get(patient_infoController.findAll)

 // Matches with "/api/patient_info/allByProvider" 
router
    .route("/allByProvider/:id")
    .get(patient_infoController.findAllByProvider)

// Matches with "/api/patient_info/allByGroup" 
router
    .route("/allByGroup/:id")
    .get(patient_infoController.findAllByGroup)

// Matches with "/api/patient_info/:id"
router
    .route("/find/:id")
    .get(patient_infoController.findById)

// Matches with "/api/patient_info/:id"
router
    .route("/findFull/:id")
    .get(patient_infoController.findFullById)

// Matches with "/api/patient_info/search" 
router 
    .route("/search")
    .post(patient_infoController.findBySearchterm);

// Matches with "/api/patient_info/new"
router
  .route("/new")
  .post(patient_infoController.create)

// Matches with "/api/patient_info/insertRef/:id" 
router
.route('/insertRef/:id')
.put(patient_infoController.insertRef)

// Matches with "/api/patient_info/updateEmail/:id" 
router
    .route('/updateEmail/:id')
    .put(patient_infoController.updateEmail)

// Matches with "/api/patient_info/updatePhone/:id" 
router
    .route('/updatePhone/:id')
    .put(patient_infoController.updatePhone)

// Matches with "/api/patient_info/updateStatus/:id" 
router
    .route('/updateStatus/:id')
    .put(patient_infoController.updateStatus)

// Matches with "/api/patient_info/updateName/:id" 
router
.route('/updateName/:id')
.put(patient_infoController.updateName)

// Matches with "/api/patient_info/updateProvider/:id" 
router
.route('/updateProvider/:id')
.put(patient_infoController.updateProvider)

// Matches with "/api/patient_info/updateProviderGroup/:id" 
router
.route('/updateProviderGroup/:id')
.put(patient_infoController.updateProviderGroup)


module.exports = router;