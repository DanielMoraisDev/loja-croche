import { bucketName, minioClient } from "../../db/minio.js";
import Product from "../../models/productSchema.js";

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    const product = {
      name: existingProduct.name,
      image_url: existingProduct.image_url,
      image_object_name: existingProduct.image_object_name,
    };

    await minioClient.removeObject(bucketName, product.image_object_name);

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
