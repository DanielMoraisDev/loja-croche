import { createUser } from "./createUser.js";
import { getAllUser } from "./getAllUser.js";
import { deleteUser } from "./deleteUser.js";
import { getUser } from "./getUser.js";
import { updateUser } from "./updateUser.js";
import { loginUser } from "./loginUser.js";

const userController = {
  create: createUser,
  getOne: getUser,
  getAll: getAllUser,
  delete: deleteUser,
  update: updateUser,
  login: loginUser,
};

export default userController;
