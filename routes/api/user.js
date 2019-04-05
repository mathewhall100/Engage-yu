const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router
  .route("/:id")
  .get(userController.userLookup)

// Matches with "/api/create"
router
  .route("/")
  .post(userController.create)

module.exports = router;