import { bucketName, minioClient } from "../../db/minio.js";
import Product from "../../models/productSchema.js";
import { v4 as uuidv4 } from "uuid";

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
      image_url: existingProduct.image_url,
      image_object_name: existingProduct.image_object_name,
    };

    try {
      await minioClient.removeObject(bucketName, product.image_object_name);
    } catch (error) {
      console.log(
        `[CONTROLLERS][PRODUCTS][UPDATE][DELETE OLD FILE]: An error occurred, error: ` +
          error
      );
      return res
        .status(500)
        .json({ error: "Houve um erro ao tentar deletar o arquivo antigo" });
    }

    const fileId = uuidv4();
    const objectName = `products/${fileId}-${name}`;

    await minioClient.putObject(
      bucketName,
      objectName,
      foto_produto.buffer,
      foto_produto.size,
      {
        "Content-Type": foto_produto.mimetype,
      }
    );

    const imageUrl = await minioClient.presignedGetObject(
      bucketName,
      objectName
    );

    product.image_url = imageUrl;

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
  }
};
