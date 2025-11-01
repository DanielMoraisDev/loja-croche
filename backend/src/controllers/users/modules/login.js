import User from "../../../models/userSchema.js";
import bcrypt from "bcrypt";
import globalHelpers from "../../../helpers/globalHelpers.js";
import globalUtils from "../../../utils/globalUtils.js";

const login = async (userData) => {
  const { email, password } = userData;

  const userFound = await User.findOne({ where: { email: email } });
  if (!userFound) throw new Error("Usuário não encontrado");

  const isPasswordValid = await bcrypt.compare(password, userFound.password);
  if (!isPasswordValid) throw new Error("Senha incorreta");

  const userToCreateToken = {
    email: userFound.email,
    password: userFound.password,
    id: userFound.id_user,
  };

  const [errUserToken, createToken] = globalUtils.trySync(() =>
    globalHelpers.createToken(userToCreateToken)
  );
  if (errUserToken) throw new Error("Erro ao criar token de acesso");

  return createToken;
};

export default login;
