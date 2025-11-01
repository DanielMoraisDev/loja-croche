import express from "express";

const usersRouter = express.Router();

import userController from "../controllers/users/userController.js";
import globalMiddlewares from "../middleware/globalMiddlewares.js";

usersRouter.route("/").post((req, res) => {
  return userController.create(req, res);
});

usersRouter.route("/login").post((req, res) => {
  return userController.login(req, res);
});

usersRouter
  .route("/:id")
  .get(globalMiddlewares.authToken, userController.getOne);

usersRouter
  .route("/:id")
  .put(globalMiddlewares.authToken, userController.update);

usersRouter.route("/").get(globalMiddlewares.authToken, userController.getAll);

usersRouter
  .route("/:id")
  .delete(globalMiddlewares.authToken, userController.delete);

export default usersRouter;
