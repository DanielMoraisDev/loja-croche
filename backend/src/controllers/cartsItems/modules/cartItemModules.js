import create from "./create.js";
import deleteItem from "./delete.js";
import getAll from "./getAll.js";
import getOne from "./getOne.js";

const cartItemModules = {
  create: create,
  getOne: getOne,
  delete: deleteItem,
  getAll: getAll,
};

export default cartItemModules;
