import globalUtils from "../../utils/globalUtils.js";
import User from "../../models/userSchema.js";
import globalHelpers from "../../helpers/globalHelpers.js";

export const getAllUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const [errUserToken] = globalUtils.trySync(globalHelpers.authToken(token));
    if (errUserToken) {
      console.error("[CONTROLLERS][USERS][GET ALL][AUTH TOKEN]", errUserToken);
    }

    const [errFindAll, users] = await globalUtils.tryAwait(User.findAll());
    if (errFindAll) {
      console.error("[CONTROLLERS][USERS][GET ALL][FINDING PRODUCTS]", errUrl);
      return res.status(500).json({ error: "Erro ao procurar usuários" });
    }

    if (users.length < 1) {
      return res.status(200).json({ error: "Não foram encontrados usuários" });
    }

    return res.status(200).json({ users: users });
  } catch (error) {
    console.error(
      "[CONTROLLERS][USERS][GET ALL] An error occurred, error: " + error
    );
  }
};
