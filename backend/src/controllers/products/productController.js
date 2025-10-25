import { createProduct } from "./createProduct.js";
import { getAllProduct } from "./getAllProduct.js";
import { deleteProduct } from "./deleteProduct.js";
import { getProduct } from "./getProduct.js";
import { updateProduct } from "./updateProduct.js";

const productController = {
  create: createProduct,
  getOne: getProduct,
  getAll: getAllProduct,
  delete: deleteProduct,
  update: updateProduct,
};

export default productController;
