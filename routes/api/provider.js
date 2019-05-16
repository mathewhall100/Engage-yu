const router = require("express").Router();
const providerController = require("../../controllers/providerController");
const checkToken = require("../../utils/jwt");
const checkJwt = checkToken.getCheckToken()

// Matches with "/api/provider"
router
  .route("/")
  .post(checkJwt, providerController.create);

  // Matches with "/api/provider/allByGroup" 
router
  .route("/allByGroup/:id")
  .get(checkJwt, providerController.findAllByCareGroup)

// Matches with "/api/provider/:id"
router
  .route("/:id")
  .get(checkJwt, providerController.findById)
  .put(checkJwt, providerController.update)
  .delete(checkJwt, providerController.delete);

// matches with "/api/provider/updateemail"
router
  .route("/updateEmail/:id")
  .put(checkJwt, providerController.updateEmail)

// Matches with "/api/provider/questionlist"
router
  .route("/saveQuestionList/:id")
  .put(checkJwt, providerController.saveQuestionList)

module.exports = router;

