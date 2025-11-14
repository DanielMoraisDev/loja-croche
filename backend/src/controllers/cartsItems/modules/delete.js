import CardItem from "../../../models/cartItemSchema.js";
import Product from "../../../models/productSchema.js";

const deleteItem = async (id_user, id_product) => {
  const verifyIfExistCardItem = await CardItem.findOne({
    where: { id_user: id_user, id_product: id_product },
  });

  if (!verifyIfExistCardItem)
    throw new Error("O item não foi adicionado ao carrinho");

  const deleteItem = await CardItem.destroy({
    where: { id_user: id_user, id_product: id_product },
  });

  if (!deleteItem) throw new Error("O produto não existe");
};

export default deleteItem;
