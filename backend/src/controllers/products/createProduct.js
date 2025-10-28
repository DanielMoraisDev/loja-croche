import { v4 as uuidv4 } from "uuid";
import Product from "../../models/productSchema.js";
import { minioClient, bucketName } from "../../db/minio.js";
import { tryAwait } from "../../utils/tryAwait.js";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const global_host = process.env.GLOBAL_HOST;
const minio_port = process.env.MINIO_PORT;

const defined_host =
  global_host == "127.0.0.1" || global_host == "host.docker.internal"
    ? "localhost"
    : global_host;

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

    const [errUpload] = await tryAwait(
      minioClient.putObject(
        bucketName,
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

    const proto = (
      req.headers["x-forwarded-proto"] ||
      req.protocol ||
      "http"
    ).toString();

    const hostHeader = req.get("host") || defined_host;

    let imageUrl;

    if (global_host === "127.0.0.1" || global_host === "host.docker.internal") {
      imageUrl = `${proto}://${defined_host}:${minio_port}/${bucketName}/${objectName}`;
    } else {
      imageUrl = `${proto}://${hostHeader}/minio/${bucketName}/${objectName}`;
    }

    const product = {
      name: name,
      type: type,
      size: size,
      price: price,
      image_url: imageUrl,
      image_object_name: objectName,
    };

    const [errCreate, create_product] = await tryAwait(Product.create(product));
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
