import User from "../../models/userSchema.js";
import globalUtils from "../../utils/globalUtils.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const [errUser, checkUser] = await globalUtils.tryAwait(
    User.findOne({
      where: { email: email, password: password },
    })
  );
  if (errUser) {
    console.error("[CONTROLLERS][USERS][CREATE][CREATE PRODUCT]", errUser);
    return res
      .status(500)
      .json({ error: "Erro ao tentar criar um novo usuário" });
  }

  const userToCreateToken = {
    email: checkUser.email,
    password: checkUser.password,
    id: checkUser.id_user,
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

  return res.json({ token: createToken });
};
