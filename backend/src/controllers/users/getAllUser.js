import globalUtils from "../../utils/globalUtils.js";
import User from "../../models/userSchema.js";

export const getAllUser = async (req, res) => {
  try {
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
