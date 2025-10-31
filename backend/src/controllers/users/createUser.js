import User from "../../models/userSchema.js";
import globalHelpers from "../../helpers/globalHelpers.js";
import globalUtils from "../../utils/globalUtils.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(500).json({ error: "O nome do usuário é obrigatório" });
    }

    if (!email) {
      return res
        .status(500)
        .json({ error: "O email do usuário é obrigatório" });
    }

    if (!password) {
      return res
        .status(500)
        .json({ error: "A senha do usuário é obrigatória" });
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    const [errUser, userCreate] = await globalUtils.tryAwait(User.create(user));
    if (errUser) {
      console.error("[CONTROLLERS][USERS][CREATE][CREATE PRODUCT]", errUser);
      return res
        .status(500)
        .json({ error: "Erro ao tentar criar um novo usuário" });
    }

    const userToCreateToken = {
      email: userCreate.email,
      password: userCreate.password,
      id: userCreate.id_user,
    };

    const [errUserToken, createToken] = globalUtils.trySync(() =>
      globalHelpers.createToken(userToCreateToken)
    );
    if (errUserToken) {
      console.error("[CONTROLLERS][USERS][CREATE][CREATE TOKEN]", errUserToken);
      return res
        .status(500)
        .json({ error: "Erro ao tentar criar um token para o novo usuário" });
    }

    return res.status(200).json({
      user: userCreate,
      token: createToken,
    });
  } catch (error) {
    console.error(
      "[CONTROLLERS][USERS][CREATE] An error occurred, error: " + error
    );
  }
};
