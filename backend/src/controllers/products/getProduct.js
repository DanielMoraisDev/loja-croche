import Product from "../../models/productSchema.js";

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({ where: { id_product: id } });

    if (product.length < 1) {
      return res.status(200).json({ error: "Não foi encotrado um produto" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(
      "[CONTROLLERS][PRODUCTS][GET ONE] An error occurred, error: " + error
    );
    return res.status(500).json({
      error: "Error interno",
    });
  }
};
