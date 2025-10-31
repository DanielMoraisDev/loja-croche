import Product from "../../models/productSchema.js";
import globalUtils from "../../utils/globalUtils.js";

export const getAllProduct = async (req, res) => {
  try {
    const [errFindAll, products] = await globalUtils.tryAwait(
      Product.findAll()
    );
    if (errFindAll) {
      console.error(
        "[CONTROLLERS][PRODUCTS][GET ALL][FINDING PRODUCTS]",
        errUrl
      );
      return res.status(500).json({ error: "Erro ao procurar produtos" });
    }

    if (products.length < 1) {
      return res.status(200).json({ error: "Não foram encontrados produtos" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error(
      "[CONTROLLERS][PRODUCTS][GET ALL] An error occurred, error: " + error
    );
  }
};
