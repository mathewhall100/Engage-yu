const router = require("express").Router();
const userController = require("../../controllers/userController");
const checkToken = require("../../utils/jwt");
const checkJwt = checkToken.getCheckToken()

// Matches with "/api/user"
router
  .route("/:id")
  .get(checkJwt, userController.userLookup)
  .delete(checkJwt, userController.delete)

// Matches with "/api/user/find"
router
  .route("/find")
  .post(checkJwt, userController.userFind)

// Matches with "/api/create"
router
  .route("/")
  .post(checkJwt, userController.create)

module.exports = router;