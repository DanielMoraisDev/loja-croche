import createCardItem from "./createCartItem.js";
import deleteCartItem from "./deleteCardItem.js";
import getAllCardItem from "./getAllCardItem.js";
import getCartItem from "./getCardItem.js";

const cardItemControllers = {
  create: createCardItem,
  getOne: getCartItem,
  delete: deleteCartItem,
  getAll: getAllCardItem,
};

export default cardItemControllers;
