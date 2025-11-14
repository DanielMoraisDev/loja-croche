import User from "../../../models/userSchema.js";
import Product from "../../../models/productSchema.js";
import CardItem from "../../../models/cartItemSchema.js";

const create = async (id_user, id_product) => {
  const existingUser = await User.findByPk(id_user);
  if (!existingUser) throw new Error("Usuário não encontrado");

  const existingProduct = await Product.findByPk(id_product);
  if (!existingProduct) throw new Error("Produto não encontrado");

  const cardItem = {
    id_user: id_user,
    id_product: id_product,
  };

  const existingCardItem = await CardItem.findOne({
    where: { id_user: cardItem.id_user, id_product: cardItem.id_product },
  });

  if (existingCardItem) throw new Error("O item já foi adicionada ao carrinho");

  const createCardItem = await CardItem.create({
    id_user: cardItem.id_user,
    id_product: cardItem.id_product,
  });

  if (!createCardItem) throw new Error("Erro ao adicionar item ao carrinho");

  return createCardItem;
};

export default create;
