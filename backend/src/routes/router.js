import express from "express";

const router = express.Router();

import productsRouter from "./products.js";
router.use("/products", productsRouter);

import usersRouter from "./users.js";
router.use("/users", usersRouter);

import cartItemRouter from "./cartItems.js";
router.use("/cart_item", cartItemRouter);

export default router;
