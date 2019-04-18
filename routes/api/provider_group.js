const router = require("express").Router();
const provider_groupController = require("../../controllers/provider_groupController");
const checkToken = require("../../jwt/jwt");
const checkJwt = checkToken.getCheckToken()

// Matches with "/api/providerGroup"
router
  .route("/")
  .get(checkJwt, provider_groupController.findAll)
  .post(checkJwt, provider_groupController.create);

// Matches with "/api/providerGroup/:id"
router
  .route("/:id")
  .put(checkJwt, provider_groupController.update)
  .get(checkJwt, provider_groupController.findById)
  .delete(checkJwt, provider_groupController.remove);

module.exports = router;

