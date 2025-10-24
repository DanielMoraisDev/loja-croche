import Product from "../../models/productSchema.js";

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({ where: { id_product: id } });

    if (product.length < 1) {
      return res.status(200).json({ error: "Não foi encotrado um produto" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log("[PRODUCTS][GET ONE] An error occurred, error: " + error);
  }
};
