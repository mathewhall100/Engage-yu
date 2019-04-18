const router = require("express").Router();
const userController = require("../../controllers/userController");
const checkToken = require("../../jwt/jwt");
const checkJwt = checkToken.getCheckToken()

// Matches with "/api/user"
router
  .route("/:id")
  .get(checkJwt, userController.userLookup)

// Matches with "/api/create"
router
  .route("/")
  .post(checkJwt, userController.create)

module.exports = router;