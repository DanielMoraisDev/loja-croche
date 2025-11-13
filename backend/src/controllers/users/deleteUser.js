import globalUtils from "../../utils/globalUtils.js";
import User from "../../models/userSchema.js";

export const deleteUser = async (req, res) => {
  try {
    const id = req.user.id;

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
