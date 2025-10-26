import { v4 as uuidv4 } from "uuid";
import Product from "../../models/productSchema.js";
import { minioClient, bucketName } from "../../db/minio.js";

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

    const product = {
      name: name,
      image_url: imageUrl,
      image_object_name: objectName,
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
