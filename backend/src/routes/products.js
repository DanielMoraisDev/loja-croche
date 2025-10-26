import express from "express";

const productsRouter = express.Router();

import productController from "../controllers/products/productController.js";
import { imageUpload } from "../middleware/image-upload.js";

productsRouter
  .route("/")
  .post(imageUpload.single("foto_produto"), (req, res) => {
    return productController.create(req, res);
  });

productsRouter.route("/:id").get((req, res) => {
  return productController.getOne(req, res);
});

productsRouter
  .route("/:id")
  .put(imageUpload.single("foto_produto"), (req, res) => {
    return productController.update(req, res);
  });

productsRouter.route("/").get((req, res) => {
  return productController.getAll(req, res);
});

productsRouter.route("/:id").delete((req, res) => {
  return productController.delete(req, res);
});

export default productsRouter;
