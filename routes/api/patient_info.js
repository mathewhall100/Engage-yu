const router = require("express").Router();
const patient_infoController = require("../../controllers/patient_infoController");
const checkToken = require("../../jwt/jwt");
const checkJwt = checkToken.getCheckToken()

 // Matches with "/api/patient_info/allByProvider" 
router
    .route("/allByProvider/:id")
    .get(checkJwt, patient_infoController.findAllByProvider)

// Matches with "/api/patient_info/allByGroup" 
router
    .route("/allByGroup/:id")
    .get(checkJwt, patient_infoController.findAllByGroup)

// Matches with "/api/patient_info/:id"
router
    .route("/find/:id")
    .get(checkJwt, patient_infoController.findById)

// Matches with "/api/patient_info/:id"
router
    .route("/findFull/:id")
    .get(checkJwt, patient_infoController.findFullById)

// Matches with "/api/patient_info/search" 
router 
    .route("/search")
    .post(checkJwt, patient_infoController.findBySearchterm);

// Matches with "/api/patient_info/new"
router
  .route("/new")
  .post(checkJwt, patient_infoController.create)

// Matches with "/api/patient_info/update/:id" 
router
    .route('/update/:id')
    .put(checkJwt, patient_infoController.update)

// Matches with "/api/patient_info/updateName/:id" 
router
    .route('/delete/:id')
    .delete(checkJwt, patient_infoController.delete)

module.exports = router;