import { v4 as uuidv4 } from "uuid";
import Product from "../../models/productSchema.js";
import { minioClient } from "../../db/minio.js";
import globalUtils from "../../utils/globalUtils.js";
import configs from "../../config.js";

const host = configs.hosts.minio.host;
const port = configs.hosts.minio.port;
const bucketName = configs.hosts.minio.bucket;

export const createProduct = async (req, res) => {
  try {
    const { name, type, size, price } = req.body;

    const foto_produto = req.file;

    if (!foto_produto) {
      return res
        .status(500)
        .json({ error: "A imagem do produto é obrigatória" });
    }

    if (!name) {
      return res.status(500).json({ error: "O nome do produto é obrigatório" });
    }

    if (!price) {
      return res
        .status(500)
        .json({ error: "O preço do produto é obrigatório" });
    }

    if (!size) {
      return res
        .status(500)
        .json({ error: "O tamanho do produto é obrigatório" });
    }

    if (!type) {
      return res.status(500).json({ error: "O tipo do produto é obrigatório" });
    }

    const fileId = uuidv4();
    const objectName = `products/${fileId}-${name}`;

    const [errUpload] = await globalUtils.tryAwait(
      minioClient.putObject(
        bucket_name,
        objectName,
        foto_produto.buffer,
        foto_produto.size,
        {
          "Content-Type": foto_produto.mimetype,
        }
      )
    );
    if (errUpload) {
      console.error("[CONTROLLERS][PRODUCTS][CREATE][UPLOAD FILE]", errUpload);
      return res.status(500).json({ error: "Erro ao tentar subir arquivo" });
    }

    const imageUrl = `http://${host}:${port}/${bucketName}/${objectName}`;

    const product = {
      name: name,
      type: type,
      size: size,
      price: price,
      image_url: imageUrl,
      image_object_name: objectName,
    };

    const [errCreate, create_product] = await globalUtils.tryAwait(
      Product.create(product)
    );
    if (errCreate) {
      console.error(
        "[CONTROLLERS][PRODUCTS][CREATE][CREATE PRODUCT]",
        errCreate
      );
      return res
        .status(500)
        .json({ error: "Erro ao tentar criar um novo produto" });
    }

    return res.status(200).json({
      create_product,
    });
  } catch (error) {
    console.error(
      "[CONTROLLERS][PRODUCTS][CREATE] An error occurred, error: " + error
    );
  }
};
