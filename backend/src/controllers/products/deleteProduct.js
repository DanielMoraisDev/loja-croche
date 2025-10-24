import Product from "../../models/productSchema.js";

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.destroy({ where: { id_product: id } });

    if (product.length < 1) {
      return res.status(200).json({ error: "Não foi encotrado um produto" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log("[PRODUCTS][DESTROY] An error occurred, error: " + error);
  }
};
