const router = require("express").Router();
const providerController = require("../../controllers/providerController");

// Matches with "/api/provider"
router
  .route("/")
  .get(providerController.findAll)
  .post(providerController.create);

  // Matches with "/api/provider/allByGroup" 
router
  .route("/allByGroup/:id")
  .get(providerController.findAllByGroup)

// Matches with "/api/provider/:id"
router
  .route("/:id")
  .get(providerController.findById)
  .put(providerController.update)
  .delete(providerController.remove);

// Matches with "/api/provider/questionlist"
router
  .route("/saveQuestionList/:id")
  .put(providerController.saveQuestionList)

module.exports = router;

