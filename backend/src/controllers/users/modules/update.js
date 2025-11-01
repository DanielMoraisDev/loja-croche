import User from "../../../models/userSchema.js";
import bcrypt from "bcrypt";

const update = async (id, user) => {
  const existingUser = await User.findByPk(id);
  if (!existingUser) throw new Error("Usuário não encontrado");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  const updatedUser = await User.update(
    {
      name: user.name,
      email: user.email,
      password: hash,
    },
    { where: { id_user: id } }
  );

  if (!updatedUser) throw new Error("Erro ao atualizar usuário");

  const userUpdated = await User.findByPk(id);
  return userUpdated;
};

export default update;
