import userModules from "./modules/userModules.js";
import globalUtils from "../../utils/globalUtils.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = { email, password };

    const [errLogin, token] = await globalUtils.tryAwait(
      userModules.login(user)
    );
    if (errLogin) {
      console.error("[CONTROLLERS][USERS][LOGIN]", errLogin);
      return res.status(401).json({ error: errLogin.message });
    }

    return res.status(200).json({ token: token });
  } catch (error) {
    console.error("[CONTROLLERS][USERS][LOGIN] error:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
