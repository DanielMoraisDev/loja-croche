import jwt from "jsonwebtoken";
import configs from "../config.js";

const authToken = (tokenReceived) => {
  const token = tokenReceived;

  const secretKey = configs.auths.token.secret;

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error(
      "[HELPERS][AUTH TOKEN] Token inválido ou expirado:",
      error.message
    );

    return;
  }
};

export default authToken;
