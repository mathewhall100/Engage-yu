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

// Matches with "/api/provider/customlist"
router
  .route("/customlist/:id")
  .post(checkJwt, providerController.addList)
  .put(checkJwt, providerController.updateList)
  
// Matches with "/api/priovider/customlist/delete"
router
  .route("/customlist/delete/:id")
  .post(checkJwt, providerController.deleteList)
  
// Matches with "/api/provider/questionlist"
router
  .route("/customquestion/:id")
  .post(checkJwt, providerController.saveQuestion)
  .put(checkJwt, providerController.updateQuestion)

  // Matches with "/api/priovider/customquestion/delete"
router
  .route("/customquestion/all/:id")
  .all(checkJwt, providerController.allQuestions)

// Matches with "/api/priovider/customquestion/delete"
router
  .route("/customquestion/delete/:id")
  .post(checkJwt, providerController.deleteQuestion)

module.exports = router;

