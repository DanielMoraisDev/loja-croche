import globalUtils from "../../utils/globalUtils.js";
import User from "../../models/userSchema.js";
import globalHelpers from "../../helpers/globalHelpers.js";

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization?.split(" ")[1];

    const [errUserToken] = globalUtils.trySync(globalHelpers.authToken(token));
    if (errUserToken) {
      console.error("[CONTROLLERS][USERS][DELETE][AUTH TOKEN]", errUserToken);
    }

    const existingUser = await User.findByPk(id);

    if (!existingUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const user = {
      name: existingUser.name,
    };

    const [errDelete, deleteUser] = await globalUtils.tryAwait(
      User.destroy({ where: { id_user: id } })
    );
    if (errDelete) {
      console.error("[CONTROLLERS][USERS][DESTROY][DELETE USER]", errDelete);
      return res
        .status(500)
        .json({ error: "Erro ao tentar deletar o usuário" });
    }

    if (deleteUser < 1) {
      return res.status(200).json({ error: "Não foi encotrado o usuário" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(
      "[CONTROLLERS][USERS][DESTROY] An error occurred, error: " + error
    );
  }
};
