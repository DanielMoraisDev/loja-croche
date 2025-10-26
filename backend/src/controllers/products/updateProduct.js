import { tryAwait } from "../../utils/tryAwait.js";
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

    const [errDelete] = await tryAwait(
      minioClient.removeObject(bucketName, product.image_object_name)
    );
    if (errDelete) {
      console.error(
        "[CONTROLLERS][PRODUCTS][UPDATE][DELETE OLD FILE]",
        errDelete
      );
      return res
        .status(500)
        .json({ error: "Erro ao tentar deletar o arquivo antigo" });
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
      console.error("[CONTROLLERS][PRODUCTS][UPDATE][UPLOAD FILE]", errUpload);
      return res
        .status(500)
        .json({ error: "Erro ao tentar subir o novo arquivo" });
    }

    const imageUrl = `http://localhost:9000/${bucketName}/${objectName}`;

    product.image_url = imageUrl;

    const [errUpdate] = await tryAwait(
      Product.update(product, { where: { id_product: id } })
    );
    if (errUpdate) {
      console.error("[CONTROLLERS][PRODUCTS][UPDATE][UPDATE DB]", errUpdate);
      return res.status(500).json({ error: "Erro ao atualizar o produto" });
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
