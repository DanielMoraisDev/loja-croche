import globalUtils from "../../utils/globalUtils.js";
import userModules from "./modules/userModules.js";

export const updateUser = async (req, res) => {
  try {
    const id = req.user.id;
    const { name, email, password } = req.body;

    const user = {
      name: name,
      email: email,
      password: password,
    };

    const [errUpdateUser, userUpdated] = await globalUtils.tryAwait(
      userModules.update(id, user)
    );
    if (errUpdateUser) {
      console.error("[CONTROLLERS][USERS][UPDATE][UPDATE USER]", errUpdateUser);
      return res.status(500).json({
        error: "Erro ao tentar atualizar o usuário, " + errUpdateUser,
      });
    }

    return res.status(200).json({
      user: userUpdated,
    });
  } catch (error) {
    console.error(
      "[CONTROLLERS][USERS][UPDATE] An error occurred, error: " + error
    );
  }
};
