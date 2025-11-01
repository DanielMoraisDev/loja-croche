import jwt from "jsonwebtoken";
import configs from "../config.js";

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    const secretKey = configs.auths.token.secret;

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) return res.send(err);
      req.user = decoded;
      next();
    });

    console.log("[MIDDLEWARES][AUTHENTICATE TOKEN] Sucesso: logado");
  } catch (error) {
    console.error("[MIDDLEWARES][AUTHENTICATE TOKEN] Error: " + error);
    return res.status(401).json({ error: "Token expirado ou inválido" });
  }
};

export default authenticateToken;
