import Product from "../../models/productSchema.js";

export const createProduct = async (req, res) => {
  try {
    const { name } = req.body;

    const foto_produto = req.file;

    if (!foto_produto) {
      return res
        .status(500)
        .json({ error: "A imagem do produto é obrigatória" });
    }

    if (!name) {
      return res.status(500).json({ error: "O nome do produto é obrigatório" });
    }

    const product = {
      name: name,
      image: foto_produto.path,
    };

    const create_product = await Product.create(product);

    if (!create_product) {
      return res.status(500).json({
        error: "Houve um error ao tentar criar o produto",
      });
    }

    return res.status(200).json({
      create_product,
    });
  } catch (error) {
    console.error(
      "[CONTROLLERS][PRODUCTS][CREATE] An error occurred, error: " + error
    );
    return res.status(500).json({
      error: "Error interno",
    });
  }
};
