module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const user = require("../controllers/user.controller.js");
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/user", user.create);

  // Retrieve all Tutorials
  router.get("/", user.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/user/:id", user.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api", router);
};
