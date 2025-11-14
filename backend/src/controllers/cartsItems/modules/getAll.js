import CardItem from "../../../models/cartItemSchema.js";

const getAll = async (id_user) => {
  const cardItems = await CardItem.findAll({ where: { id_user: id_user } });

  if (!cardItems)
    throw new Error(
      "Não foi possivel encontrar items relacionados a esse usuário"
    );

  return cardItems;
};

export default getAll;
