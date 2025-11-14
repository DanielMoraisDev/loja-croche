import express from "express";

const router = express.Router();

import productsRouter from "./products.js";
router.use("/products", productsRouter);

import usersRouter from "./users.js";
router.use("/users", usersRouter);

import cardItemRouter from "./cardItems.js";
router.use("/cart_item", cardItemRouter);

export default router;
