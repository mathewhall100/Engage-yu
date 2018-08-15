const router = require("express").Router();
const activeController = require("../../controllers/activeController");

// Matches with "/api/active/all"
router
  .route("/")
  .get(activeController.findAll)
  .post(activeController.create);

// Matches with "/api/active/:id"
router
  .route("/:id")
  .get(activeController.findById)
  .put(activeController.update)

module.exports = router;