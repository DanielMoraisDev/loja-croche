import jwt from "jsonwebtoken";
import configs from "../config.js";

export const authenticateTokenWithoutMandatory = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const secretKey = configs.auths.token.secret;

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error("[MIDDLEWARES][INVALID TOKEN]");
      }

      req.user = {
        id: decoded?.id,
      };

      console.log(
        "[MIDDLEWARES][AUTHENTICATE TOKEN WITHOUT MANDATORY] Sucesso: logado"
      );
      next();
    });
  } catch (error) {
    console.error(
      "[MIDDLEWARES][AUTHENTICATE TOKEN WITHOUT MANDATORY] Error: " + error
    );
    return res.status(401).json({ error: "Token expirado ou inválido" });
  }
};

export default authenticateTokenWithoutMandatory;
