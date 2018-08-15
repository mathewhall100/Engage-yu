const router = require("express").Router();
const question_defaultController = require("../../controllers/question_defaultController");

// Matches with "/api/question_default"
router
  .route("/")
  .get(question_defaultController.findAll)
  .post(question_defaultController.create);

// Matches with "/api/question_default/:id"
router
  .route("/:id")
  .delete(question_defaultController.remove);

module.exports = router;