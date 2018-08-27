const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router
  .route("/:id")
  .get(userController.userLookup)

module.exports = router;