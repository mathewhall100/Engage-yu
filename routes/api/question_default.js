const router = require("express").Router();
const question_defaultController = require("../../controllers/question_defaultController");

// Matches with "/api/question_default"
router
  .route("/")
  .get(question_defaultController.findAll)

module.exports = router;