import { minioClient, bucketName } from "../../db/minio.js";
import { tryAwait } from "../../utils/tryAwait.js";

export const serveFile = async (req, res) => {
  try {
    // captura tudo após /files/ como nome do objeto (permite nomes com '/').
    const objectName = req.params[0];

    if (!objectName) {
      return res.status(400).json({ error: "Object name is required" });
    }

    const [errStat, stat] = await tryAwait(
      minioClient.statObject(bucketName, objectName)
    );
    if (errStat) {
      console.error("[FILES][SERVE] statObject error", errStat);
      return res.status(404).json({ error: "Arquivo não encontrado" });
    }

    // Tenta pegar content-type dos metadados
    const contentType =
      (stat && stat.metaData && (stat.metaData["content-type"] || stat.metaData["Content-Type"])) ||
      "application/octet-stream";

    const [errGet, stream] = await tryAwait(
      minioClient.getObject(bucketName, objectName)
    );
    if (errGet) {
      console.error("[FILES][SERVE] getObject error", errGet);
      return res.status(404).json({ error: "Arquivo não encontrado" });
    }

    res.setHeader("Content-Type", contentType);

    // Encaminha o stream do MinIO direto para o cliente
    stream.on("error", (e) => {
      console.error("[FILES][SERVE] stream error", e);
      if (!res.headersSent) {
        res.status(500).end();
      } else {
        res.end();
      }
    });

    stream.pipe(res);
  } catch (error) {
    console.error("[FILES][SERVE] unexpected error", error);
    if (!res.headersSent) return res.status(500).json({ error: "Erro interno" });
    res.end();
  }
};
