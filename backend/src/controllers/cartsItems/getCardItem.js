import globalUtils from "../../utils/globalUtils.js";
import cartItemModules from "./modules/cartItemModules.js";

const getCartItem = async (req, res) => {
  try {
    const id_user = req.user.id;
    const { id_product } = req.params;

    const cardItem = {
      id_user: id_user,
      id_product: id_product,
    };

    const [errGetCardItem, getCardItem] = await globalUtils.tryAwait(
      cartItemModules.getOne(cardItem.id_user, cardItem.id_product)
    );
    if (errGetCardItem) {
      console.error(
        "[CONTROLLERS][CARD ITEM][GET ONE][GET ONE CARD ITEM]",
        errGetCardItem
      );
      return res.status(500).json({
        error: "Erro ao procurar um item no carrinho, " + errGetCardItem,
      });
    }

    res.status(200).json({
      cardItem: getCardItem,
    });
  } catch (error) {
    console.error(
      "[CONTROLLERS][CARD ITEM][GET ONE][GET ONE CARD ITEM] An error occurred, error: " +
        error
    );
  }
};

export default getCartItem;
