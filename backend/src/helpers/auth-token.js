import jwt from "jsonwebtoken";
import configs from "../config.js";

const authToken = (tokenReceived) => {
  if (!tokenReceived) throw new Error("Token ausente");
  const token = tokenReceived;

  const secretKey = configs.auths.token.secret;

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido ou expirado");
  }
};

export default authToken;
