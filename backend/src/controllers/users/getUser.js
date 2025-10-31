import globalUtils from "../../utils/globalUtils.js";
import User from "../../models/userSchema.js";
import globalHelpers from "../../helpers/globalHelpers.js";

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization?.split(" ")[1];

    const [errUserToken] = globalUtils.trySync(globalHelpers.authToken(token));
    if (errUserToken) {
      console.error("[CONTROLLERS][USERS][GET ONE][AUTH TOKEN]", errUserToken);
    }

    const [errFindOne, user] = await globalUtils.tryAwait(
      User.findOne({ where: { id_user: id } })
    );
    if (errFindOne) {
      console.error("[CONTROLLERS][USERS][GET ONE][FINDING USUÁRIO]", errUrl);
      return res.status(500).json({ error: "Erro ao procurar usuário" });
    }

    if (user == null || user.length < 1) {
      return res.status(200).json({ error: "Não foi encontrado um usuário" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(
      "[CONTROLLERS][USERS][GET ONE] An error occurred, error: " + error
    );
  }
};
