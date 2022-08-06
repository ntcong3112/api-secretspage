module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const user = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.post("/user/create", user.create);
  
  router.post("/user/update", user.update);

  router.get("/user", user.findOne);


  // router.delete("/:id", tutorials.delete);

  app.use("/api", router);
};
