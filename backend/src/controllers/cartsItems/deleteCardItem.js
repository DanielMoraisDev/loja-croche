import globalUtils from "../../utils/globalUtils.js";
import cartItemModules from "./modules/cartItemModules.js";

const deleteCartItem = async (req, res) => {
  try {
    const id_user = req.user.id;
    const { id_product } = req.params;

    const cardItem = {
      id_user: id_user,
      id_product: id_product,
    };

    const [errdeeleteCardItem] = await globalUtils.tryAwait(
      cartItemModules.delete(cardItem.id_user, cardItem.id_product)
    );
    if (errdeeleteCardItem) {
      console.error(
        "[CONTROLLERS][CARD ITEM][DELETE][DELETE CARD ITEM]",
        errdeeleteCardItem
      );
      return res.status(500).json({
        error: "Erro ao deletar um item no carrinho, " + errdeeleteCardItem,
      });
    }

    res.status(200).json({
      cardItem: cardItem,
    });
  } catch (error) {
    console.error(
      "[CONTROLLERS][CARD ITEM][DELETE][DELETE CARD ITEM] An error occurred, error: " +
        error
    );
  }
};

export default deleteCartItem;
