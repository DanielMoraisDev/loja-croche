// const {  } = require('./createProduct.js')
import { getAllProduct } from "./getAllProduct.js";
import { deleteProduct } from "./deleteProduct.js";
import { getProduct } from "./getProduct.js";

const productController = {
  // create: ,
  getOne: getProduct,
  getAll: getAllProduct,
  delete: deleteProduct,
};

export default productController;
