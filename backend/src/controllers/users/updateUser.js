import globalUtils from "../../utils/globalUtils.js";
import User from "../../models/userSchema.js";
import globalHelpers from "../../helpers/globalHelpers.js";

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization?.split(" ")[1];

    const [errUserToken] = await globalUtils.tryAwait(
      globalHelpers.authToken(token)
    );
    if (errUserToken) {
      console.error("[CONTROLLERS][USERS][UPDATE][AUTH TOKEN]", errUserToken);
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findByPk(id);

    if (!existingUser) {
      return res.status(404).json({ error: "Usuários não encontrado" });
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    const [errUpdate] = await globalUtils.tryAwait(
      User.update(user, { where: { id_user: id } })
    );
    if (errUpdate) {
      console.error("[CONTROLLERS][USERS][UPDATE][UPDATE DB]", errUpdate);
      return res.status(500).json({ error: "Erro ao atualizar o usuário" });
    }

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.error(
      "[CONTROLLERS][USERS][UPDATE] An error occurred, error: " + error
    );
  }
};
