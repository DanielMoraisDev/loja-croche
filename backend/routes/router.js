const router = require("express").Router();

const productsRouter = require("./products.js");
router.use("/", productsRouter);

module.exports = router;
