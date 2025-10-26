import { tryAwait } from "../../utils/tryAwait.js";
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

    const [errDelete] = await tryAwait(
      minioClient.removeObject(bucketName, product.image_object_name)
    );
    if (errDelete) {
      console.error("[CONTROLLERS][PRODUCTS][DESTROY][DELETE FILE]", errDelete);
      return res
        .status(500)
        .json({ error: "Erro ao tentar deletar o arquivo" });
    }

    const [errDeleteProduct, deleteProduct] = await tryAwait(
      Product.destroy({ where: { id_product: id } })
    );
    if (errDeleteProduct) {
      console.error(
        "[CONTROLLERS][PRODUCTS][DESTROY][DELETE PRODUCT]",
        errDelete
      );
      return res
        .status(500)
        .json({ error: "Erro ao tentar deletar o produto" });
    }

    if (deleteProduct < 1) {
      return res.status(200).json({ error: "Não foi encotrado um produto" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(
      "[CONTROLLERS][PRODUCTS][DESTROY] An error occurred, error: " + error
    );
  }
};
