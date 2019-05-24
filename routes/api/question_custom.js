const router = require("express").Router();
const question_customController = require("../../controllers/question_customController");

// Matches with "/api/question_custom"
router
  .route("/")
  .get(question_customController.findAll)
  .post(question_customController.create);

// Matches with "/api/question_custom/:id"
router
  .route("/:id")
  .put(question_customController.update)
  .delete(question_customController.delete);

module.exports = router;