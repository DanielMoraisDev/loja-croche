import Product from "../../models/productSchema.js";
import fs from "fs";

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const { name } = req.body;

    const foto_produto = req.file;

    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    const product = {
      name: name,
      image: foto_produto.path,
    };

    if (foto_produto) {
      const oldImagePath = existingProduct.image;

      product.image = foto_produto.path;

      if (oldImagePath && fs.existsSync(oldImagePath)) {
        try {
          fs.unlinkSync(oldImagePath);
        } catch (err) {
          res.status(500).json({
            error: "Erro ao deletar imagem antiga:",
          });
        }
      }
    }

    const updateProduct = await Product.update(product, {
      where: {
        id_product: id,
      },
    });

    if (!updateProduct) {
      return res.status(500).json({
        error: "Houve um error ao tentar atualizar o produto",
      });
    }

    return res.status(200).json({
      product,
    });
  } catch (error) {
    console.error(
      "[CONTROLLERS][PRODUCTS][UPDATE] An error occurred, error: " + error
    );
    return res.status(500).json({
      error: "Error interno",
    });
  }
};
