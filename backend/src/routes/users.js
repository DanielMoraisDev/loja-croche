import express from "express";

const usersRouter = express.Router();

import userController from "../controllers/users/userController.js";

usersRouter.route("/").post((req, res) => {
  return userController.create(req, res);
});

// usersRouter.route("/:id").get((req, res) => {
//   return userController.getOne(req, res);
// });

// usersRouter.route("/:id").put((req, res) => {
//   return userController.update(req, res);
// });

// usersRouter.route("/").get((req, res) => {
//   return userController.getAll(req, res);
// });

// usersRouter.route("/:id").delete((req, res) => {
//   return userController.delete(req, res);
// });

export default usersRouter;
