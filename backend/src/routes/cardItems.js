import express from "express";

const cardItemRouter = express.Router();

import cardItemControllers from "../controllers/cartsItems/cartItemControllers.js";
import globalMiddlewares from "../middleware/globalMiddlewares.js";

cardItemRouter
  .route("/")
  .post(globalMiddlewares.authToken, cardItemControllers.create);

cardItemRouter
  .route("/:id_product")
  .get(globalMiddlewares.authToken, cardItemControllers.getOne);

export default cardItemRouter;
