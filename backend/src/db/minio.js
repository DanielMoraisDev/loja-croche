import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);
import * as Minio from "minio";

const host = process.env.MINIO_HOST;
const port = process.env.MINIO_PORT;
const accessKey = process.env.MINIO_ACCESS_KEY;
const secretKey = process.env.MINIO_SECRET_KEY;
const useSSL = ["1"].includes(process.env.MINIO_USE_SSL?.toLowerCase());

const minioClient = new Minio.Client({
  endPoint: host,
  port: port,
  useSSL: useSSL,
  accessKey: accessKey,
  secretKey: secretKey,
});

const bucketName = process.env.MINIO_BUCKET;

const testMinio = async () => {
  try {
    const buckets = await minioClient.listBuckets();
    console.log("[MINIO] Buckets disponíveis:", buckets);
  } catch (error) {
    console.error("[MINIO] Erro ao conectar ao MinIO:", error);
  }
};

export { minioClient, bucketName, testMinio };
