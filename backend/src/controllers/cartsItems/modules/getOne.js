import CardItem from "../../../models/cartItemSchema.js";
import Product from "../../../models/productSchema.js";

const getOne = async (id_user, id_product) => {
  const verifyIfExistCardItem = await CardItem.findOne({
    where: { id_user: id_user, id_product: id_product },
  });

  if (!verifyIfExistCardItem)
    throw new Error("O item não foi adicionado ao carrinho");

  const dataProduct = await Product.findByPk(id_product);

  if (!dataProduct) throw new Error("O produto não existe");

  const foundCardItem = {
    name: dataProduct.name,
    type: dataProduct.price,
    size: dataProduct.size,
    image_url: dataProduct.image_url,
  };

  return foundCardItem;
};

export default getOne;
