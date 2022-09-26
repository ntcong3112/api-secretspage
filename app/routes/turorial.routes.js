module.exports = app => {
  const user = require("../controllers/user.controller.js");
  const credit = require("../controllers/credit.controller.js");
  var router = require("express").Router();

  router.post("/user/create-page", user.createNewpage);
  
  router.post("/admin/create-user", user.createUser);

  router.post("/user/update-password", user.updatePassword);

  router.post("/user/update-page", user.updatePageByNumberAndIndex);

  router.get("/user", user.findUserByNumber);

  router.post("/user/login", user.login);

  router.post("/list-courses", credit.getListCourses);

  router.get("/user/page", user.findPageByNumberAndIndex);

  router.post("/confirm-list-courses", credit.confirmListCourses);
  // router.delete("/:id", tutorials.delete);

  app.use("/api", router);
};
