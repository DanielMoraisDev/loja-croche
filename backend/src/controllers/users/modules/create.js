import User from "../../../models/userSchema.js";
import bcrypt from "bcrypt";

const create = async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  const verifyEmail = await User.findOne({ where: { email: user.email } });
  if (verifyEmail) throw new Error("Esse email já está cadastrado");

  const newUser = await User.create({
    name: user.name,
    email: user.email,
    password: hash,
  });

  if (!newUser) throw new Error("Erro ao criar usuário");

  return newUser;
};

export default create;
