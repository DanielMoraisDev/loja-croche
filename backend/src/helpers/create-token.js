import jwt from "jsonwebtoken";
import configs from "../config.js";

const createToken = (users, req, res) => {
  const payload = {
    id: users.id_user,
    password: users.password,
    email: users.email,
  };

  const secretKey = configs.auths.token.secret;

  const token = jwt.sign(payload, secretKey);

  return token;
};

export default createToken;
