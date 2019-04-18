const router = require("express").Router();
const providerController = require("../../controllers/providerController");
const checkToken = require("../../jwt/jwt");
const checkJwt = checkToken.getCheckToken()

// Matches with "/api/provider"
router
  .route("/")
  .get(checkJwt, providerController.findAll)
  .post(checkJwt, providerController.create);

  // Matches with "/api/provider/allByGroup" 
router
  .route("/allByGroup/:id")
  .get(checkJwt, providerController.findAllByGroup)

// Matches with "/api/provider/:id"
router
  .route("/:id")
  .get(checkJwt, providerController.findById)
  .put(checkJwt, providerController.update)
  .delete(checkJwt, providerController.remove);

// Matches with "/api/provider/questionlist"
router
  .route("/saveQuestionList/:id")
  .put(checkJwt, providerController.saveQuestionList)

module.exports = router;

