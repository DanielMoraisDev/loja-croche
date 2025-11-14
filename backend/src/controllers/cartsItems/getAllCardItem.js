import globalUtils from "../../utils/globalUtils.js";
import cartItemModules from "./modules/cartItemModules.js";

const getAllCardItem = async (req, res) => {
  try {
    const id_user = req.user.id;

    const cardItem = {
      id_user: id_user,
    };

    const [errGetCardItem, getCardItem] = await globalUtils.tryAwait(
      cartItemModules.getAll(cardItem.id_user)
    );
    if (errGetCardItem) {
      console.error(
        "[CONTROLLERS][CARD ITEM][GET ALL][GET ALL CARD ITEM]",
        errGetCardItem
      );
      return res.status(500).json({
        error: "Erro ao procurar os item no carrinho, " + errGetCardItem,
      });
    }

    res.status(200).json({
      cardItem: getCardItem,
    });
  } catch (error) {
    console.error(
      "[CONTROLLERS][CARD ITEM][GET ALL][GET ALL CARD ITEM] An error occurred, error: " +
        error
    );
  }
};

export default getAllCardItem;
