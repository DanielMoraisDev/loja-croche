import globalUtils from "../../utils/globalUtils.js";
import cartItemModules from "./modules/cartItemModules.js";

const createCartItem = async (req, res) => {
  try {
    const id_user = req.user.id;

    if (!id_user)
      return res.status(500).json({ error: "O id do usuário é obrigatório." });

    const { id_product } = req.body;

    if (!id_product)
      return res.status(500).json({ error: "O id do produto é obrigatório." });

    const cardItem = {
      id_user: id_user,
      id_product: id_product,
    };

    const [errCreateCardItem, createdCardItem] = await globalUtils.tryAwait(
      cartItemModules.create(cardItem.id_user, cardItem.id_product)
    );
    if (errCreateCardItem) {
      console.error(
        "[CONTROLLERS][CARD ITEM][CREATE][CREATE CARD ITEM]",
        errCreateCardItem
      );
      return res.status(500).json({
        error:
          "Erro ao tentar adicionar um item ao carrinho, " + errCreateCardItem,
      });
    }

    return res.status(200).json({
      cardItem: createdCardItem,
    });
  } catch (error) {
    console.error(
      "[CONTROLLERS][CARD ITEM][CREATE][CREATE CARD ITEM] An error occurred, error: " +
        error
    );
  }
};

export default createCartItem;
