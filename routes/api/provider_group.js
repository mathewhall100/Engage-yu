const router = require("express").Router();
const provider_groupController = require("../../controllers/provider_groupController");

// Matches with "/api/providerGroup"
router
  .route("/")
  .get(provider_groupController.findAll)
  .post(provider_groupController.create);

// Matches with "/api/providerGroup/:id"
router
  .route("/:id")
  .put(provider_groupController.update)
  .get(provider_groupController.findById)
  .delete(provider_groupController.remove);

module.exports = router;

