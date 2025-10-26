import Product from "../../models/productSchema.js";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll();

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
