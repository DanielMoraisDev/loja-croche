import Product from "../../models/productSchema.js";
import fs from "fs";

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    const product = {
      name: existingProduct.name,
      image: existingProduct.path,
    };

    const oldImagePath = existingProduct.image;

    if (oldImagePath && fs.existsSync(oldImagePath)) {
      try {
        fs.unlinkSync(oldImagePath);
      } catch (err) {
        res.status(500).json({
          error: "Erro ao deletar imagem antiga",
        });
      }
    }

    const deleteProduct = await Product.destroy({ where: { id_product: id } });

    if (deleteProduct.length < 1) {
      return res.status(200).json({ error: "Não foi encotrado um produto" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(
      "[CONTROLLERS][PRODUCTS][DESTROY] An error occurred, error: " + error
    );
    return res.status(500).json({
      error: "Error interno",
    });
  }
};
