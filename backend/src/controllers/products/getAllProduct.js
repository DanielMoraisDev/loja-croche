import Product from "../../models/productSchema.js";
import globalUtils from "../../utils/globalUtils.js";
import CartItem from "../../models/cartItemSchema.js";

export const getAllProduct = async (req, res) => {
  try {
    const id_user = req.user.id;

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

    if (id_user) {
      const productsWithAddedFlag = await Promise.all(
        products.map(async (product) => {
          const verifyIfIsAddedInCart = await CartItem.findOne({
            where: { id_user: id_user, id_product: product.id_product },
          });

          const newProduct = {
            ...product.toJSON(),
            addedInCart: verifyIfIsAddedInCart ? true : false,
          };

          return newProduct;
        })
      );

      return res.status(200).json(productsWithAddedFlag);
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error(
      "[CONTROLLERS][PRODUCTS][GET ALL] An error occurred, error: " + error
    );
  }
};
