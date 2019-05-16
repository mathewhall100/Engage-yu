const router = require("express").Router();
const patient_infoController = require("../../controllers/patient_infoController");
const checkToken = require("../../utils/jwt");
const checkJwt = checkToken.getCheckToken()

 // Matches with "/api/patient_info/allByProvider" 
router
    .route("/allByProvider/:id")
    .get(checkJwt, patient_infoController.findAllByProvider)

// Matches with "/api/patient_info/allByCareGroup" 
router
    .route("/allByCareGroup/:id")
    .get(checkJwt, patient_infoController.findAllByCareGroup)

// Matches with "/api/patient_info/:id"
router
    .route("/find/:id")
    .get(checkJwt, patient_infoController.findById)

//Matches with "/api/patient_info/search" 
router 
    .route("/findOne")
    .post(checkJwt, patient_infoController.findOne);

// Matches with "/api/patient_info/new"
router
  .route("/create")
  .post(checkJwt, patient_infoController.create)

// Matches with "/api/patient_info/update/:id" 
router
    .route('/update/:id')
    .put(checkJwt, patient_infoController.update)

// Matches with "/api/patient_info/update/email/:id" 
router
    .route('/update/email/:id')
    .put(checkJwt, patient_infoController.updateEmail)

// Matches with "/api/patient_info/cleanup" 
router
    .route('/cleanup')
    .put(checkJwt, patient_infoController.cleanUp)

// Matches with "/api/patient_info/updateName/:id" 
router
    .route('/delete/:id')
    .delete(checkJwt, patient_infoController.delete)

module.exports = router