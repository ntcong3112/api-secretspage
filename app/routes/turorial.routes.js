module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const user = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.post("/user/create-page", user.createNewpage);
  
  router.post("/admin/create-user", user.createUser);

  router.post("/user/update-password", user.updatePassword);

  router.post("/user/update-page", user.updatePageByNumberAndIndex);

  router.get("/user", user.findUserByNumber);

  router.post("/user/login", user.login);


  router.get("/user/page", user.findPageByNumberAndIndex);

  // router.delete("/:id", tutorials.delete);

  app.use("/api", router);
};
