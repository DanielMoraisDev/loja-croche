const router = require("express").Router();

const productController = require("../controllers/products/productController.js");

router.route("/products").post((req, res) => {
  return productController.create(req, res);
});

router.route("/product/:id").get((req, res) => {
  return productController.getOne(req, res);
});

router.route("/products").get((req, res) => {
  return productController.getAll(req, res);
});

router.route("/products/:key").delete((req, res) => {
  return productController.deleteAll(req, res);
});

router.route("/product/:id").delete((req, res) => {
  return productController.delete(req, res);
});

module.exports = router;
