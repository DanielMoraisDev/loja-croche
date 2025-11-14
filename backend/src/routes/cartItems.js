import express from "express";

const cartRouter = express.Router();

import cartControllers from "../controllers/cartsItems/cartItemControllers.js";
import globalMiddlewares from "../middleware/globalMiddlewares.js";

cartRouter.route("/").post(globalMiddlewares.authToken, cartControllers.create);

cartRouter.route("/").get(globalMiddlewares.authToken, cartControllers.getAll);

cartRouter
  .route("/:id_product")
  .get(globalMiddlewares.authToken, cartControllers.getOne);

cartRouter
  .route("/:id_product")
  .delete(globalMiddlewares.authToken, cartControllers.delete);

export default cartRouter;
